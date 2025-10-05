import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('Success! Check your email to confirm.');
      setTimeout(() => navigate('/login'), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-white">Sign Up</h2>
        <form onSubmit={handleSignup}>
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
            minLength="6"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center text-white`}>
            {message}
          </p>
        )}
        <p className="mt-4 text-center text-gray-400">
          Already have an account? <a href="/login" className="text-blue-400">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
