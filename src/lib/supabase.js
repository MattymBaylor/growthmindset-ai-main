// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helper functions
export const signUp = async (email, password, metadata = {}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  return { data, error };
};

// Database helper functions
export const fetchData = async (table, filters = {}) => {
  let query = supabase.from(table).select('*');
  
  Object.keys(filters).forEach(key => {
    query = query.eq(key, filters[key]);
  });
  
  const { data, error } = await query;
  return { data, error };
};

export const insertData = async (table, data) => {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();
  return { data: result, error };
};

export const updateData = async (table, id, updates) => {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

export const deleteData = async (table, id) => {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);
  return { error };
};

// Realtime subscription helper
export const subscribeToTable = (table, callback) => {
  const subscription = supabase
    .channel(`public:${table}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: table },
      callback
    )
    .subscribe();
  
  return subscription;
};
