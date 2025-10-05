// src/App.jsx (minimal, safe, no external layout)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Minimal HomePage (no images, no modals, no external components)
function HomePage() {
  return (
    <main className="bg-[#0A0F1A] text-gray-200">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="text-sky-400">AI-Powered</span> Business Automation Platform
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            Transform your SMB with fully automated AI agents that handle reception,
            recruitment, payroll, lead management, and content marketing — all without
            human intervention.
          </p>
          <a href="#start" className="mt-8 inline-block px-6 py-3 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-300">
            Start Free Trial
          </a>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 justify-center"><span className="h-2 w-2 rounded-full bg-emerald-400"/>24/7 Automated Operations</div>
            <div className="flex items-center gap-2 justify-center"><span className="h-2 w-2 rounded-full bg-blue-400"/>Zero Training Required</div>
            <div className="flex items-center gap-2 justify-center"><span className="h-2 w-2 rounded-full bg-fuchsia-400"/>ROI Within 30 Days</div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="border-y border-white/5 bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><div className="text-3xl font-bold text-white">500+</div><div className="text-sm text-gray-300 mt-1">Businesses Automated</div></div>
          <div><div className="text-3xl font-bold text-white">85%</div><div className="text-sm text-gray-300 mt-1">Average Cost Reduction</div></div>
          <div><div className="text-3xl font-bold text-white">24/7</div><div className="text-sm text-gray-300 mt-1">Uptime Guaranteed</div></div>
          <div><div className="text-3xl font-bold text-white">30 Days</div><div className="text-sm text-gray-300 mt-1">Days to Full ROI</div></div>
        </div>
      </section>

      {/* SUITE */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center">Complete AI Business <span className="text-sky-400">Automation Suite</span></h2>
        <p className="text-center text-gray-300 mt-2 max-w-2xl mx-auto">Five powerful AI platforms that work together to automate every aspect of your business operations.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="bg-[#0E1522] rounded-xl border border-white/10 p-6">
            <h3 className="text-white font-semibold text-lg">Voice AI Agents</h3>
            <ul className="mt-3 text-sm text-gray-300 list-disc list-inside space-y-1">
              <li>24/7 Call Handling</li>
              <li>Appointment Scheduling</li>
              <li>Lead Qualification</li>
            </ul>
            <a href="#start" className="inline-block mt-5 px-4 py-2 rounded border border-white/20 text-gray-200 hover:bg-white/5">Learn More</a>
          </div>
          <div className="bg-[#0E1522] rounded-xl border border-white/10 p-6">
            <h3 className="text-white font-semibold text-lg">AI Recruitment System</h3>
            <ul className="mt-3 text-sm text-gray-300 list-disc list-inside space-y-1">
              <li>Resume Analysis</li>
              <li>Interview Automation</li>
              <li>Candidate Scoring</li>
            </ul>
            <a href="#start" className="inline-block mt-5 px-4 py-2 rounded border border-white/20 text-gray-200 hover:bg-white/5">Learn More</a>
          </div>
        </div>
      </section>

      {/* ABOUT / CTA */}
      <section className="bg-gradient-to-b from-[#0B1220] to-[#0A0F1A] py-16 border-t border-white/5" id="start">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-extrabold text-white">About <span className="text-sky-400">Growth Mindset</span></h3>
          <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
            We help SMBs run at enterprise speed with practical AI automation.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#" className="px-5 py-3 rounded bg-sky-600 text-white hover:bg-sky-500">Start Free Trial</a>
            <a href="#" className="px-5 py-3 rounded border border-white/20 text-gray-200 hover:bg-white/5">Schedule Demo</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function AppHeader() {
  return (
    <header className="w-full bg-[#0B0F17] border-b border-white/5 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="font-semibold text-white">growthmindset.ai</div>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#" className="text-gray-300 hover:text-white">Services</a>
          <a href="#" className="text-gray-300 hover:text-white">Pricing</a>
          <a href="#" className="text-gray-300 hover:text-white">About</a>
          <a href="#" className="text-gray-300 hover:text-white">Contact</a>
        </nav>
      </div>
    </header>
  );
}

function AppFooter() {
  return (
    <footer className="w-full bg-[#0B0F17] border-t border-white/5 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-8 grid gap-8 md:grid-cols-3">
        <div>
          <h4 className="text-white font-semibold mb-3">Transform your SMB</h4>
          <p className="text-sm leading-6">with AI-powered automation platforms that handle every aspect of your operations.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Voice AI Agents</li>
            <li>AI Recruitment</li>
            <li>Financial Automation</li>
            <li>Call Centers</li>
            <li>Content Marketing</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Pricing</li>
            <li>Contact</li>
            <li>Support</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 text-center text-xs text-gray-400 py-6">
        © 2025 Growth Mindset LLC. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <AppFooter />
    </Router>
  );
}
