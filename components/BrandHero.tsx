"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function BrandHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#29274C]"
      role="banner"
      aria-label="Quotely Platform Hero Section"
    >
      {/* Enhanced Gradient Background with Custom Colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#29274C] via-[#555E88] to-[#595695]">
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Subtle animated elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-bounce motion-reduce:animate-none bg-white"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse motion-reduce:animate-none bg-[#ffffff]"></div>
        </div>
      </div>

      {/* Content with Progressive Enhancement */}
      <div
        className={`relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center transition-all duration-1000 motion-reduce:transition-none ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Clear Value Proposition Badge */}
        <div className="inline-flex items-center px-6 py-3 backdrop-blur-sm border border-[#F26D0060] bg-[#F26D0040] rounded-full mb-8 hover:bg-opacity-40 transition-colors motion-reduce:transition-none">
          <span className="text-sm font-medium tracking-wide text-[#E4E4E4]">
            ⚡ AI-Powered Insurance Platform
          </span>
        </div>

        {/* Scannable Headline with Clear Hierarchy */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-[#E4E4E4]">
          <span className="flex flex-row text-white">Transform Your</span>
          <span className="flex fles-row font-bold bg-gradient-to-br from-[#F26D00] to-[#555E88] bg-clip-text text-transparent">
            Insurance Workflow
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mt-2 text-white">
            in Minutes, Not Hours
          </span>
        </h1>

        {/* Clear, Benefit-Focused Subheadline */}
        <div className="text-md mb-4  text-[#BEBEBE]">
          Get instant quotes from 50+ carriers with our AI assistant.
          <span className="font-medium text-[#E4E4E4]">
            {" "}
            Reduce processing time by 90%
          </span>{" "}
          while delivering exceptional client experiences.
        </div>

        {/* Social Proof Metrics - Easier to Scan */}
        <div className="flex items-center justify-center mb-16 mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto p-6 backdrop-blur-sm rounded-2xl border border-[#E4E4E420] bg-[#E4E4E410] my-8">
            <div className="text-center p-4 rounded-xl transition-colors motion-reduce:transition-none hover:bg-[#E4E4E410] mx-2">
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-[#F26D00]">
                10x
              </div>
              <div className="text-sm font-medium text-[#BEBEBE]">
                Faster Quotes
              </div>
            </div>
            <div className="text-center p-4 rounded-xl transition-colors motion-reduce:transition-none hover:bg-[#E4E4E410] mx-2">
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-[#F26D00]">
                99.9%
              </div>
              <div className="text-sm font-medium text-[#BEBEBE]">
                Uptime SLA
              </div>
            </div>
            <div className="text-center p-4 rounded-xl transition-colors motion-reduce:transition-none hover:bg-[#E4E4E410] mx-2">
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-[#F26D00]">
                50+
              </div>
              <div className="text-sm font-medium text-[#BEBEBE]">
                Carrier APIs
              </div>
            </div>
          </div>
        </div>
        {/* Call-to-Actions Section */}
        {/* gap-6 is for spacing in trust indicators */}
        <div className="flex flex-col items-center justify-center gap-6 mt-2">
          {/* Clear Call-to-Actions with Accessibility */}
          <div className="flex flex-wrap justify-center mb-12 mt-8 px-4 gap-4">
            <Link
              href="/get-started"
              className="group inline-flex items-center justify-center p-2 mx-3 my-2 rounded-full text-lg font-semibold transform hover:-translate-y-0.5 transition-all duration-200 motion-reduce:transition-none motion-reduce:transform-none shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#F26D0050] focus:ring-offset-2 focus:ring-offset-[#29274C] bg-gradient-to-br bg-[#F26D00] text-white"
              aria-label="Start your free 14-day trial of Quotely"
            >
              Start Free 14-Day Trial
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform motion-reduce:transition-none motion-reduce:transform-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

            <Link
              href="/demo"
              className="group inline-flex items-center justify-center p-2 mx-3 my-2 rounded-full text-lg font-semibold transform hover:-translate-y-0.5 transition-all duration-200 motion-reduce:transition-none motion-reduce:transform-none shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#F26D0050] focus:ring-offset-2 focus:ring-offset-[#29274C] bg-gradient-to-br bg-[#F26D00] text-white"
              aria-label="Watch a live demo of Quotely platform"
            >
              <svg
                className="mr-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Watch Demo
            </Link>
          </div>

          {/* Trust Indicators with Better Visual Hierarchy */}
          <div className=" flex flex-wrap justify-center gap-6 text-sm text-[#9F9F9F]">
            <span className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors motion-reduce:transition-none bg-[#E4E4E405]">
              <svg
                className="w-4 h-4 flex-shrink-0 text-[#F26D00]"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">SOC 2 Certified</span>
            </span>
            <span className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors motion-reduce:transition-none bg-[#E4E4E405]">
              <svg
                className="w-4 h-4 flex-shrink-0 text-[#F26D00]"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Bank-Level Security</span>
            </span>
            <span className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors motion-reduce:transition-none bg-[#E4E4E405]">
              <svg
                className="w-4 h-4 flex-shrink-0 text-[#F26D00]"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="font-medium">10,000+ Users</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
