// netlify/functions/stripe-webhook.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Admin Client
const supabaseUrl = 'https://ilvefyyasocmotxfzigg.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // You'll need to add this
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Webhook endpoint secret from Stripe Dashboard
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];

  let stripeEvent;

  try {
    // Verify webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Handle different event types
  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(stripeEvent.data.object);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(stripeEvent.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(stripeEvent.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(stripeEvent.data.object);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(stripeEvent.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error(`Error processing webhook: ${error.message}`);
    return {
      statusCode: 500,
      body: `Webhook handler failed: ${error.message}`,
    };
  }
};

// Handle successful checkout
async function handleCheckoutSessionCompleted(session) {
  console.log('Processing checkout.session.completed:', session.id);

  // Get the user ID from metadata
  const userId = session.metadata?.userId;
  if (!userId) {
    console.error('No userId in session metadata');
    return;
  }

  // Retrieve the full session details with line items
  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['line_items', 'customer', 'subscription'],
  });

  // Extract subscription details
  const subscription = fullSession.subscription;
  const customer = fullSession.customer;

  // Update user's subscription in Supabase
  const { error: upsertError } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      stripe_customer_id: customer.id || customer,
      stripe_subscription_id: subscription.id || subscription,
      plan_id: session.metadata?.planId || 'starter',
      plan_name: session.metadata?.planName || 'Starter',
      status: 'active',
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    });

  if (upsertError) {
    console.error('Error updating subscription:', upsertError);
    throw upsertError;
  }

  // Update user profile
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      subscription_tier: session.metadata?.planId || 'starter',
      subscription_status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (profileError) {
    console.error('Error updating profile:', profileError);
  }

  // Log the activity
  await supabase
    .from('activity_logs')
    .insert({
      user_id: userId,
      action: 'subscription.created',
      details: {
        plan: session.metadata?.planId,
        amount: session.amount_total,
        currency: session.currency,
      },
    });

  console.log(`Subscription activated for user ${userId}`);
}

// Handle subscription updates
async function handleSubscriptionUpdate(subscription) {
  console.log('Processing subscription update:', subscription.id);

  // Find user by stripe customer ID
  const { data: existingSub, error: findError } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', subscription.customer)
    .single();

  if (findError || !existingSub) {
    console.error('Could not find user for customer:', subscription.customer);
    return;
  }

  const userId = existingSub.user_id;

  // Update subscription
  const { error: updateError } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
      cancelled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (updateError) {
    console.error('Error updating subscription:', updateError);
    throw updateError;
  }

  // Update profile
  await supabase
    .from('profiles')
    .update({
      subscription_status: subscription.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  console.log(`Subscription updated for user ${userId}`);
}

// Handle subscription cancellation
async function handleSubscriptionCanceled(subscription) {
  console.log('Processing subscription cancellation:', subscription.id);

  // Find user by stripe customer ID
  const { data: existingSub, error: findError } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', subscription.customer)
    .single();

  if (findError || !existingSub) {
    console.error('Could not find user for customer:', subscription.customer);
    return;
  }

  const userId = existingSub.user_id;

  // Update subscription status
  const { error: updateError } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      cancelled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (updateError) {
    console.error('Error canceling subscription:', updateError);
    throw updateError;
  }

  // Update profile
  await supabase
    .from('profiles')
    .update({
      subscription_status: 'canceled',
      subscription_tier: 'free',
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  // Log the activity
  await supabase
    .from('activity_logs')
    .insert({
      user_id: userId,
      action: 'subscription.canceled',
      details: {
        reason: subscription.cancellation_details?.reason || 'user_initiated',
      },
    });

  console.log(`Subscription canceled for user ${userId}`);
}

// Handle successful invoice payment
async function handleInvoicePaymentSucceeded(invoice) {
  console.log('Processing successful payment for invoice:', invoice.id);

  // Log payment in metrics
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', invoice.customer)
    .single();

  if (subscription) {
    await supabase
      .from('metrics')
      .insert({
        user_id: subscription.user_id,
        metric_type: 'revenue',
        metric_value: invoice.amount_paid / 100, // Convert from cents
        period_start: new Date().toISOString(),
        period_end: new Date().toISOString(),
      });
  }
}

// Handle failed invoice payment
async function handleInvoicePaymentFailed(invoice) {
  console.log('Processing failed payment for invoice:', invoice.id);

  // Find user and update subscription status
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', invoice.customer)
    .single();

  if (subscription) {
    // Update subscription status to past_due
    await supabase
      .from('subscriptions')
      .update({
        status: 'past_due',
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', subscription.user_id);

    // Log the activity
    await supabase
      .from('activity_logs')
      .insert({
        user_id: subscription.user_id,
        action: 'payment.failed',
        details: {
          invoice_id: invoice.id,
          amount: invoice.amount_due,
          attempt: invoice.attempt_count,
        },
      });
  }
}
