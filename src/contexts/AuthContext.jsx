// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check active sessions and sets the user
    const initializeAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error getting current user:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event);
      
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (event === 'USER_UPDATED') {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }
      
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    error,
    signIn: async (email, password) => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setUser(data.user);
        return { data, error: null };
      } catch (error) {
        setError(error.message);
        return { data: null, error };
      } finally {
        setLoading(false);
      }
    },
    signUp: async (email, password, metadata = {}) => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
          },
        });
        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        setError(error.message);
        return { data: null, error };
      } finally {
        setLoading(false);
      }
    },
    signOut: async () => {
      setLoading(true);
      setError(null);
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        return { error: null };
      } catch (error) {
        setError(error.message);
        return { error };
      } finally {
        setLoading(false);
      }
    },
    resetPassword: async (email) => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        setError(error.message);
        return { data: null, error };
      } finally {
        setLoading(false);
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
