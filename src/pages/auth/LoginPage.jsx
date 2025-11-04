import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-400">{message}</p>}
        <p className="mt-4 text-center text-gray-400">
          Don&apos;t have an account? <a href="/signup" className="text-blue-400">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
