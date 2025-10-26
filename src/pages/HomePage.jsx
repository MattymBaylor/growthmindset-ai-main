import React from 'react';

const HomePage = () => {
  return (
    <main style={{ minHeight: '100vh', padding: '40px 20px', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '60px', fontWeight: 'bold', color: 'white', marginBottom: '20px' }}>
          Automate Your Business With Intelligent AI
        </h1>
        <p style={{ fontSize: '20px', color: '#888', marginBottom: '40px' }}>
          Transform your operations with our comprehensive suite of AI-powered tools.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '60px', flexWrap: 'wrap' }}>
          <button style={{ padding: '15px 30px', fontSize: '18px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px' }}>
            Start Free Trial
          </button>
          <button style={{ padding: '15px 30px', fontSize: '18px', background: 'transparent', color: 'white', border: '2px solid white', borderRadius: '8px' }}>
            Explore Services
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
            <h3 style={{ color: 'white' }}>AI Voice Assistant</h3>
            <p style={{ color: '#888' }}>24/7 intelligent call handling</p>
          </div>
          <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
            <h3 style={{ color: 'white' }}>Smart Recruitment</h3>
            <p style={{ color: '#888' }}>AI-powered candidate screening</p>
          </div>
          <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
            <h3 style={{ color: 'white' }}>Financial Automation</h3>
            <p style={{ color: '#888' }}>Automated payroll and expenses</p>
          </div>
          <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
            <h3 style={{ color: 'white' }}>Call Center AI</h3>
            <p style={{ color: '#888' }}>Scale customer service instantly</p>
          </div>
          <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
            <h3 style={{ color: 'white' }}>Content Marketing</h3>
            <p style={{ color: '#888' }}>AI-generated content that converts</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
