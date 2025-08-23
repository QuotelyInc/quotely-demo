"use client";

import React, { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";

export default function AutoInsurancePage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [animatedMetrics, setAnimatedMetrics] = useState({
    speed: 0,
    faster: 0,
  });
  const competitiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scrolling for hash links
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
        const elementId = target.getAttribute("href")?.slice(1);
        if (elementId) {
          document
            .getElementById(elementId)
            ?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  useEffect(() => {
    // Animate competitive metrics on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let speed = 0;
            let faster = 0;
            const speedInterval = setInterval(() => {
              speed += 2;
              if (speed >= 60) {
                speed = 60;
                clearInterval(speedInterval);
              }
              setAnimatedMetrics((prev) => ({ ...prev, speed }));
            }, 30);

            const fasterInterval = setInterval(() => {
              faster += 1.5;
              if (faster >= 45) {
                faster = 45;
                clearInterval(fasterInterval);
              }
              setAnimatedMetrics((prev) => ({ ...prev, faster }));
            }, 30);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (competitiveRef.current) {
      observer.observe(competitiveRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getPricing = (plan: string) => {
    const prices = {
      "QUAD 0.0": { monthly: 549, annual: 439, original: 699, tokens: 45 },
      "QUAD 3.0": { monthly: 1149, annual: 919, original: 1399, tokens: 225 },
      "QUAD 7.0": { monthly: 1949, annual: 1559, original: 2199, tokens: 650 },
    };
    return prices[plan as keyof typeof prices];
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative mt-20 min-h-[90vh] bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Quote Auto Insurance in 60 Seconds
              </h1>
              <p className="text-2xl mb-8 opacity-95 font-light">
                AI-powered platform that's 60% faster than EZLynx. Zero training
                required.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
                >
                  Start Free Trial
                  <span>→</span>
                </a>
                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition"
                >
                  Watch Demo
                </a>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">⚡</span>
                  <span className="text-lg">60s Quotes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🚀</span>
                  <span className="text-lg">3x Productivity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🎯</span>
                  <span className="text-lg">Zero Training</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform animate-float">
                <div className="bg-gray-50 rounded-xl p-6 mb-4">
                  <div className="flex justify-between mb-3">
                    <span className="font-bold text-gray-900">
                      Quote Progress
                    </span>
                    <span className="text-green-600 font-bold">75%</span>
                  </div>
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-gray-600 text-sm mb-1">Time Saved</div>
                    <div className="text-2xl font-bold text-green-600">
                      4.2 min
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-gray-600 text-sm mb-1">Accuracy</div>
                    <div className="text-2xl font-bold text-purple-600">
                      99.8%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage Bar */}
      <section ref={competitiveRef} className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <span className="text-4xl">⚡</span>
              <div>
                <div className="text-3xl font-bold text-green-400">
                  {animatedMetrics.speed}%
                </div>
                <div className="text-sm opacity-80">Faster than EZLynx</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl">🚀</span>
              <div>
                <div className="text-3xl font-bold text-green-400">
                  {animatedMetrics.faster}%
                </div>
                <div className="text-sm opacity-80">Faster than Applied</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl">🎯</span>
              <div>
                <div className="text-3xl font-bold text-green-400">0</div>
                <div className="text-sm opacity-80">Training Required</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl">💰</span>
              <div>
                <div className="text-3xl font-bold text-green-400">3x</div>
                <div className="text-sm opacity-80">ROI Increase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Lightning-Fast Auto Insurance Platform
            </h2>
            <p className="text-xl text-gray-600">
              Currently live with Auto Insurance. Additional lines launching
              Q2/Q3 2025.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative border-2 border-green-500">
              <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                LIVE NOW
              </span>
              <div className="text-5xl mb-4">🚗</div>
              <h3 className="text-xl font-bold mb-4">Auto Insurance</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700 font-semibold">
                  <span className="text-green-500">✓</span> 60-second quotes
                </li>
                <li className="flex items-center gap-2 text-gray-700 font-semibold">
                  <span className="text-green-500">✓</span> Multi-carrier
                  comparison
                </li>
                <li className="flex items-center gap-2 text-gray-700 font-semibold">
                  <span className="text-green-500">✓</span> AI risk assessment
                </li>
                <li className="flex items-center gap-2 text-gray-700 font-semibold">
                  <span className="text-green-500">✓</span> Instant binding
                </li>
                <li className="flex items-center gap-2 text-gray-700 font-semibold">
                  <span className="text-green-500">✓</span> Mobile-first design
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow opacity-70">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-4">Homeowners*</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Property valuation AI</li>
                <li>Flood zone detection</li>
                <li>Replacement cost calculator</li>
                <li>Bundle optimization</li>
                <li>Claims prediction</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow opacity-70">
              <div className="text-5xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-4">Commercial*</h3>
              <ul className="space-y-2 text-gray-600">
                <li>General liability</li>
                <li>Commercial auto</li>
                <li>Workers' comp</li>
                <li>Professional liability</li>
                <li>Cyber coverage</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow opacity-70">
              <div className="text-5xl mb-4">🏍️</div>
              <h3 className="text-xl font-bold mb-4">Recreational*</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Motorcycles & ATVs</li>
                <li>Boats & watercraft</li>
                <li>RVs & trailers</li>
                <li>Classic cars</li>
                <li>Golf carts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              All plans include the same features. Choose based on your token
              needs.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  !isAnnual
                    ? "bg-white shadow-md text-purple-600"
                    : "text-gray-600"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  isAnnual
                    ? "bg-white shadow-md text-purple-600"
                    : "text-gray-600"
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* QUAD 0.0 */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-4">QUAD 0.0</h3>
              <div className="text-gray-500 line-through text-lg">
                ${getPricing("QUAD 0.0").original}/month
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black text-gray-900">
                  $
                  {isAnnual
                    ? getPricing("QUAD 0.0").annual
                    : getPricing("QUAD 0.0").monthly}
                </span>
                <span className="text-gray-600">/month</span>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-xl mb-6">
                <div className="text-2xl font-bold">
                  {getPricing("QUAD 0.0").tokens} Monthly Tokens
                </div>
                <div className="text-sm opacity-90">
                  Perfect for small agencies
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Auto
                  Insurance Quoting (Live)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span>{" "}
                  Multi-Carrier Comparison
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Real-time
                  Rate Engine
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Instant Bind
                  Capability
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> AI Risk
                  Assessment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Mobile Quote
                  Generation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Email
                  Support
                </li>
              </ul>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="font-semibold mb-2">Available Add-ons:</p>
                <p className="text-sm text-gray-600">
                  • CRM Integration (+$99/mo)
                </p>
                <p className="text-sm text-gray-600">• SEO Package (+$99/mo)</p>
                <p className="text-sm text-gray-600">• QuickBooks (+$149/mo)</p>
                <p className="text-sm text-gray-600">
                  • RingCentral VOIP (Custom pricing)
                </p>
              </div>

              <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition">
                Start Free Trial
              </button>
            </div>

            {/* QUAD 3.0 - Most Popular */}
            <div className="relative bg-white border-2 border-purple-600 rounded-3xl p-8 shadow-xl transform scale-105">
              <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </span>
              <h3 className="text-2xl font-bold mb-4">QUAD 3.0</h3>
              <div className="text-gray-500 line-through text-lg">
                ${getPricing("QUAD 3.0").original}/month
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black text-gray-900">
                  $
                  {isAnnual
                    ? getPricing("QUAD 3.0").annual
                    : getPricing("QUAD 3.0").monthly}
                </span>
                <span className="text-gray-600">/month</span>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-xl mb-6">
                <div className="text-2xl font-bold">
                  {getPricing("QUAD 3.0").tokens} Monthly Tokens
                </div>
                <div className="text-sm opacity-90">
                  Ideal for busy agencies
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Auto
                  Insurance Quoting (Live)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span>{" "}
                  Multi-Carrier Comparison
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Real-time
                  Rate Engine
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Instant Bind
                  Capability
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> AI Risk
                  Assessment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Mobile Quote
                  Generation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Priority
                  Support
                </li>
              </ul>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="font-semibold mb-2">Available Add-ons:</p>
                <p className="text-sm text-gray-600">
                  • CRM Integration (+$149/mo)
                </p>
                <p className="text-sm text-gray-600">
                  • SEO Package (+$349/mo)
                </p>
                <p className="text-sm text-gray-600">• QuickBooks (+$149/mo)</p>
                <p className="text-sm text-gray-600">
                  • RingCentral VOIP (Custom pricing)
                </p>
              </div>

              <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition">
                Start Free Trial
              </button>
            </div>

            {/* QUAD 7.0 */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-4">QUAD 7.0</h3>
              <div className="text-gray-500 line-through text-lg">
                ${getPricing("QUAD 7.0").original}/month
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black text-gray-900">
                  $
                  {isAnnual
                    ? getPricing("QUAD 7.0").annual
                    : getPricing("QUAD 7.0").monthly}
                </span>
                <span className="text-gray-600">/month</span>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-xl mb-6">
                <div className="text-2xl font-bold">
                  {getPricing("QUAD 7.0").tokens} Monthly Tokens
                </div>
                <div className="text-sm opacity-90">
                  For high-volume operations
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Auto
                  Insurance Quoting (Live)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span>{" "}
                  Multi-Carrier Comparison
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Real-time
                  Rate Engine
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Instant Bind
                  Capability
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> AI Risk
                  Assessment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Mobile Quote
                  Generation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 text-xl">✓</span> Dedicated
                  Support
                </li>
              </ul>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="font-semibold mb-2">Available Add-ons:</p>
                <p className="text-sm text-gray-600">
                  • CRM Integration (+$149/mo)
                </p>
                <p className="text-sm text-gray-600">
                  • SEO Package (+$749/mo)
                </p>
                <p className="text-sm text-gray-600">• QuickBooks (+$149/mo)</p>
                <p className="text-sm text-gray-600">
                  • RingCentral VOIP (Custom pricing)
                </p>
              </div>

              <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Why Agencies Choose Quotely
            </h2>
            <p className="text-xl text-gray-600">
              Join the insurance revolution with AI-powered efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Generate comprehensive quotes in 60 seconds. That's 75% faster
                than traditional methods.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered</h3>
              <p className="text-gray-600">
                Smart automation handles risk assessment, pricing optimization,
                and carrier matching instantly.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Mobile First</h3>
              <p className="text-gray-600">
                Quote from anywhere. Our mobile-optimized platform works
                seamlessly on any device.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Training</h3>
              <p className="text-gray-600">
                Intuitive interface means your team can start quoting
                immediately. No lengthy onboarding required.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Analytics</h3>
              <p className="text-gray-600">
                Track performance, identify opportunities, and optimize your
                sales process with live dashboards.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🔐</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
              <p className="text-gray-600">
                Bank-level encryption, SOC 2 compliance, and automated backups
                keep your data safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              See the Difference
            </h2>
            <p className="text-xl text-gray-600">
              How Quotely outperforms the competition
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gray-900 text-white grid grid-cols-4 p-4 font-bold">
              <div>Feature</div>
              <div className="text-center">Quotely</div>
              <div className="text-center">EZLynx</div>
              <div className="text-center">Applied</div>
            </div>

            <div className="divide-y">
              <div className="grid grid-cols-4 p-4 items-center hover:bg-gray-50">
                <div className="font-semibold">Quote Generation Time</div>
                <div className="text-center text-green-600 font-bold">
                  60 seconds
                </div>
                <div className="text-center text-gray-500">4-5 minutes</div>
                <div className="text-center text-gray-500">3-4 minutes</div>
              </div>

              <div className="grid grid-cols-4 p-4 items-center hover:bg-gray-50 bg-gray-50">
                <div className="font-semibold">AI Transparency</div>
                <div className="text-center text-green-600 font-bold">
                  Full visibility
                </div>
                <div className="text-center text-gray-500">Black box</div>
                <div className="text-center text-gray-500">Limited</div>
              </div>

              <div className="grid grid-cols-4 p-4 items-center hover:bg-gray-50">
                <div className="font-semibold">Mobile Experience</div>
                <div className="text-center text-green-600 font-bold">
                  Native mobile
                </div>
                <div className="text-center text-gray-500">
                  Basic responsive
                </div>
                <div className="text-center text-gray-500">Desktop only</div>
              </div>

              <div className="grid grid-cols-4 p-4 items-center hover:bg-gray-50 bg-gray-50">
                <div className="font-semibold">Training Required</div>
                <div className="text-center text-green-600 font-bold">
                  0 hours
                </div>
                <div className="text-center text-gray-500">40+ hours</div>
                <div className="text-center text-gray-500">60+ hours</div>
              </div>

              <div className="grid grid-cols-4 p-4 items-center hover:bg-gray-50">
                <div className="font-semibold">Setup Time</div>
                <div className="text-center text-green-600 font-bold">
                  Same day
                </div>
                <div className="text-center text-gray-500">2-4 weeks</div>
                <div className="text-center text-gray-500">4-6 weeks</div>
              </div>

              <div className="grid grid-cols-4 p-4 items-center hover:bg-gray-50 bg-gray-50">
                <div className="font-semibold">Carrier Integrations</div>
                <div className="text-center text-green-600 font-bold">
                  20+ carriers
                </div>
                <div className="text-center text-gray-500">15+ carriers</div>
                <div className="text-center text-gray-500">12+ carriers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
