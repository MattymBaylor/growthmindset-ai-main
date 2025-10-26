import React from "react";

/**
 * Primary hero component designed around conversion best practices.
 * It follows research showing that benefit‑led headlines and a single
 * primary call‑to‑action outperform feature lists and multiple equal
 * buttons【55264054501226†L97-L104】【55264054501226†L122-L129】. Shorter
 * paragraphs and a clear value proposition help visitors grasp what the
 * product does for them in just a few seconds. The trust metrics below
 * reinforce credibility without overwhelming the page.
 */
export default function HeroCRO() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F1A] py-16 md:py-24 text-center text-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="text-sky-400">Effortless SMB Automation</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Automate your receptionist, recruiting, payroll and marketing in
          minutes — so you can focus on growth instead of busywork.
        </p>
        {/* Primary CTA */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#start"
            className="px-6 py-3 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
            aria-label="Start your free trial"
          >
            Start Free Trial
          </a>
          {/* Secondary CTA styled as ghost button */}
          <a
            href="#demo"
            className="px-6 py-3 rounded border border-white/20 text-gray-200 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Schedule a live demo"
          >
            Schedule Demo
          </a>
        </div>
        {/* Trust metrics */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center justify-center gap-3">
            <span
              className="sr-only"
            >24/7 operations</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            <span>24/7 AI operations</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="sr-only">No training required</span>
            <span className="h-2 w-2 rounded-full bg-blue-400" aria-hidden="true" />
            <span>No training required</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="sr-only">Quick return on investment</span>
            <span className="h-2 w-2 rounded-full bg-fuchsia-400" aria-hidden="true" />
            <span>ROI in 30 days</span>
          </div>
        </div>
      </div>
    </section>
  );
}
