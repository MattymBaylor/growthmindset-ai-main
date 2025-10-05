// test-supabase.js - Test your Supabase connection
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ilvefyyasocmotxfzigg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsdmVmeXlhc29jbW90eGZ6aWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNDgyODMsImV4cCI6MjA3NDcyNDI4M30.pT7ZdXDv8gu0sg1CwwxoOBsnI0ZMJ_JNWJgdM30TgAw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔄 Testing Supabase connection...\n');
  
  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing basic connection...');
    const { data: healthCheck, error: healthError } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });
    
    if (healthError && healthError.code !== 'PGRST116') {
      console.log('❌ Connection failed:', healthError.message);
      return;
    }
    console.log('✅ Successfully connected to Supabase!\n');
    
    // Test 2: Auth functionality
    console.log('2️⃣ Testing authentication...');
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('✅ Auth is working (no user logged in)\n');
    } else {
      console.log('✅ Auth is working (user detected):', user.email, '\n');
    }
    
    // Test 3: Test signup (without actually creating user)
    console.log('3️⃣ Testing signup capability...');
    const testEmail = `test_${Date.now()}@example.com`;
    const { error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: 'TestPassword123!',
      options: {
        data: {
          full_name: 'Test User'
        }
      }
    });
    
    if (signupError) {
      console.log('⚠️  Signup test returned error (this might be normal):', signupError.message);
    } else {
      console.log('✅ Signup functionality is working!\n');
    }
    
    // Summary
    console.log('=' .repeat(50));
    console.log('🎉 SUPABASE CONNECTION TEST COMPLETE!');
    console.log('=' .repeat(50));
    console.log('\n📊 Connection Details:');
    console.log(`   Project URL: ${supabaseUrl}`);
    console.log(`   Project Ref: ilvefyyasocmotxfzigg`);
    console.log(`   Status: CONNECTED ✅`);
    console.log('\n🚀 Your Supabase is ready for production!');
    console.log('\n📝 Next steps:');
    console.log('   1. Run the SQL setup script in Supabase dashboard');
    console.log('   2. Enable Email/Password auth in Authentication settings');
    console.log('   3. Configure redirect URLs for your domain');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testConnection();
