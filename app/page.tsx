"use client";

import { useEffect, useState } from "react";
import { useOTTOTracking } from "@/components/OTTOProvider";
import HulyNavigation from "@/components/layout/HulyNavigation";
import Footer from "@/components/Footer";
import RotatingNewsCommentary from "@/components/RotatingNewsCommentary";
import HomepageDemoVideo from "@/components/HomepageDemoVideo";
import HulyHero from "@/components/HulyHero";
import ModernSaasHero from "@/components/home/ModernSaasHero";
import LiveQuoteDemo from "@/components/LiveQuoteDemo";
import AsymmetricFeatureGrid from "@/components/home/AsymmetricFeatureGrid";
import StatisticsSection from "@/components/StatisticsSection";
import ComparisonSection from "@/components/ComparisonSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustSection from "@/components/TrustSection";
import AITransparencyDashboard from "@/components/AITransparencyDashboard";

function HomePage() {
  const { trackPageView, trackUserAction } = useOTTOTracking();
  const [engagementScore, setEngagementScore] = useState(0);

  useEffect(() => {
    trackPageView("home", {
      section: "landing",
      product: "quotely-platform",
    });
  }, [trackPageView]);

  useEffect(() => {
    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href")!);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });

    // Progressive elevation system
    const elevationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            const sections = Array.from(
              document.querySelectorAll(".elevation-section")
            );
            const sectionIndex = sections.indexOf(section);

            // Apply progressive elevation based on scroll position
            const elevationLevel = Math.min(5, sectionIndex + 1);
            section.classList.add(`elevation-${elevationLevel}`);

            // Trigger completion animations
            const completionTrigger = section.nextElementSibling?.querySelector(
              ".completion-trigger"
            );
            if (completionTrigger) {
              setTimeout(() => {
                completionTrigger.classList.add("visible");
                trackUserAction("section_completed", {
                  section: section.className,
                  elevation: elevationLevel,
                });
              }, 500);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll(".elevation-section").forEach((el) => {
      elevationObserver.observe(el);
    });

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      if (scrollPercent > 25 && engagementScore < 1) setEngagementScore(1);
      if (scrollPercent > 50 && engagementScore < 2) setEngagementScore(2);
      if (scrollPercent > 75 && engagementScore < 3) setEngagementScore(3);
    };

    window.addEventListener("scroll", handleScroll);

    // Track button clicks
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setEngagementScore((prev) => prev + 2);
        console.log("User engagement score:", engagementScore);
      });
    });

    // Performance monitoring
    const handleLoad = () => {
      if ("performance" in window) {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);

        // Track Core Web Vitals
        if ("PerformanceObserver" in window) {
          // LCP
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log("LCP:", lastEntry.startTime);
          }).observe({ entryTypes: ["largest-contentful-paint"] });

          // FID
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach((entry) => {
              console.log(
                "FID:",
                (entry as any).processingStart - entry.startTime
              );
            });
          }).observe({ entryTypes: ["first-input"] });
        }
      }
    };

    if (document.readyState === "loading") {
      window.addEventListener("load", handleLoad);
    } else {
      handleLoad();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleLoad);
      elevationObserver.disconnect();
    };
  }, [engagementScore]);

  const handleWatchDemo = () => {
    trackUserAction("cta_clicked", {
      button: "watch_demo",
      location: "hero",
    });
  };

  const handleCompare = () => {
    trackUserAction("cta_clicked", {
      button: "compare_platforms",
      location: "hero",
    });
    const element = document.getElementById("comparison");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartTrial = () => {
    trackUserAction("cta_clicked", {
      button: "start_trial",
      location: "cta_section",
    });
  };

  const handleScheduleDemo = () => {
    trackUserAction("cta_clicked", {
      button: "schedule_demo",
      location: "cta_section",
    });
  };

  const playDemo = () => {
    const demoContainer = document.querySelector(".demo-video");
    const playButton = document.querySelector(".play-button") as HTMLElement;

    if (demoContainer && playButton) {
      // Simulate video playing
      (playButton as HTMLElement).style.display = "none";
      demoContainer.innerHTML = `
        <div style="width: 100%; height: 100%; background: #000; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem; flex-direction: column;">
          🎬 Demo Video Playing...
          <br><small style="opacity: 0.7;">See how quotes go from 5min → 30sec</small>
        </div>
      `;

      // Reset after 10 seconds (in real implementation, this would be the actual video)
      setTimeout(() => {
        if (demoContainer) {
          demoContainer.innerHTML = `
            <div class="play-button" onclick="playDemo()" style="position: relative; z-index: 2;">▶</div>
            <div style="position: absolute; top: 10px; left: 10px; right: 10px; bottom: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; opacity: 0.1;"></div>
            <div style="position: absolute; top: 30px; left: 30px; right: 30px; height: 20px; background: white; border-radius: 4px; opacity: 0.3;"></div>
            <div style="position: absolute; top: 60px; left: 30px; right: 30px; height: 100px; background: white; border-radius: 8px; opacity: 0.4;"></div>
          `;
        }
      }, 10000);
    }
  };

  // Make playDemo available globally for onclick
  useEffect(() => {
    (window as any).playDemo = playDemo;
  }, []);

  return (
    <>
      {/* Critical CSS inline for sub-2s load */}
      <style jsx>{`
        :root {
          --primary: #0057ff;
          --primary-dark: #0041cc;
          --secondary: #1b2951;
          --accent: #00b8a3;
          --warning: #ff6b35;
          --surface: #ffffff;
          --background: #f8fafc;
          --text-primary: #1f2937;
          --text-secondary: #6b7280;
          --border: #e5e7eb;
          --gradient: linear-gradient(135deg, #0057ff 0%, #0041cc 100%);
          --gradient-bg: linear-gradient(135deg, #1b2951 0%, #0f1729 100%);

          /* RESPONSIVE SPACING SYSTEM */
          --space-xs: 0.5rem;
          --space-sm: 0.75rem;
          --space-md: 1.25rem;
          --space-lg: 2rem;
          --space-xl: 3rem;
          --space-2xl: 4rem;
          --space-3xl: 5rem;

          /* OPTIMIZED LINE HEIGHTS */
          --lh-tight: 1.25;
          --lh-normal: 1.6;
          --lh-relaxed: 1.8;

          /* RESPONSIVE CONTENT WIDTHS */
          --content-width: min(1400px, 95vw);
          --scan-width: min(65ch, 100%);
          --mobile-comfort: 100%;

          /* PSYCHOLOGICAL PRESSURE ZONES */
          --urgency-spacing: var(--space-sm); /* Creates subtle pressure */
          --comfort-spacing: var(--space-xl); /* Reduces decision anxiety */
          --premium-spacing: var(--space-2xl); /* Signals high value */
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
          line-height: var(
            --lh-normal
          ); /* Golden ratio for optimal readability */
          color: var(--text-primary);
          background: var(--background);
          overflow-x: hidden;
        }

        /* F-PATTERN SCANNING OPTIMIZATION FOR INSURANCE AGENTS */
        .f-pattern-container {
          max-width: var(--content-width);
          margin: 0 auto;
          padding: 0 var(--space-md);
        }

        .f-pattern-primary {
          /* Top horizontal bar - most important content */
          margin-bottom: var(--space-lg);
          padding-right: var(
            --space-2xl
          ); /* Create right-side white space for scanning */
        }

        .f-pattern-secondary {
          /* Second horizontal bar - supporting content */
          margin-bottom: var(--space-xl);
          padding-right: var(--space-3xl); /* Progressive indentation */
        }

        .f-pattern-vertical {
          /* Left vertical stem - scannable content */
          padding-left: 0;
          margin-right: var(--space-2xl);
        }

        /* SECTION BREAK PSYCHOLOGY SYSTEM */
        .section-break {
          position: relative;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin: var(--space-2xl) 0;
        }

        .section-break::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(0, 87, 255, 0.1) 25%,
            rgba(0, 87, 255, 0.2) 50%,
            rgba(0, 87, 255, 0.1) 75%,
            transparent 100%
          );
          animation: flowBreak 3s ease-in-out infinite;
        }

        @keyframes flowBreak {
          0%,
          100% {
            opacity: 0.3;
            transform: scaleX(0.8);
          }
          50% {
            opacity: 0.7;
            transform: scaleX(1.2);
          }
        }

        .completion-trigger {
          position: absolute;
          right: 50px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--accent);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          opacity: 0;
          transform: translateY(-50%) scale(0.5);
          transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .completion-trigger.visible {
          opacity: 1;
          transform: translateY(-50%) scale(1);
          animation: completionPulse 2s infinite;
        }

        @keyframes completionPulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(0, 184, 163, 0.7);
          }
          50% {
            box-shadow: 0 0 0 20px rgba(0, 184, 163, 0);
          }
        }

        /* PASA FRAMEWORK SECTION STATES */
        .pasa-problem {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
          color: white;
        }

        .pasa-agitation {
          background: linear-gradient(135deg, #ff8e53 0%, #ff6b6b 100%);
          color: white;
        }

        .pasa-solution {
          background: linear-gradient(135deg, #4ecdc4 0%, #45b7af 100%);
          color: white;
        }

        .pasa-action {
          background: linear-gradient(135deg, #0057ff 0%, #0041cc 100%);
          color: white;
        }

        /* PROGRESSIVE ELEVATION SYSTEM */
        .elevation-1 {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transform: translateY(0);
        }
        .elevation-2 {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }
        .elevation-3 {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
          transform: translateY(-4px);
        }
        .elevation-4 {
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
          transform: translateY(-8px);
        }
        .elevation-5 {
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.24);
          transform: translateY(-12px);
        }

        /* HERO SECTION - Critical above fold */
        .hero {
          min-height: 100vh;
          background: var(--gradient-bg);
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
              circle at 20% 80%,
              rgba(27, 41, 81, 0.3) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(0, 184, 163, 0.2) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 40% 40%,
              rgba(0, 87, 255, 0.1) 0%,
              transparent 50%
            );
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: var(--content-width);
          margin: 0 auto;
          padding: var(--premium-spacing) var(--space-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-text h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: white;
          line-height: var(--lh-tight); /* Fibonacci ratio for headlines */
          margin-bottom: var(
            --space-lg
          ); /* F-pattern primary content spacing */
          animation: slideInLeft 1s ease-out;
          max-width: var(--scan-width); /* Optimal scanning width */
        }

        .hero-text .subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: var(--lh-normal); /* Golden ratio readability */
          margin-bottom: var(--comfort-spacing); /* Reduce decision anxiety */
          animation: slideInLeft 1s ease-out 0.2s both;
          max-width: var(--scan-width);
        }

        .hero-stats {
          display: flex;
          gap: var(--space-lg); /* Fibonacci spacing for visual hierarchy */
          margin-bottom: var(--space-xl); /* F-pattern secondary spacing */
          animation: slideInLeft 1s ease-out 0.4s both;
        }

        .stat {
          text-align: center;
          color: white;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          display: block;
        }

        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .hero-ctas {
          display: flex;
          gap: var(
            --urgency-spacing
          ); /* Tight spacing creates action urgency */
          flex-wrap: wrap;
          animation: slideInLeft 1s ease-out 0.6s both;
          margin-top: var(--space-md); /* Breathing room before action */
        }

        .btn {
          padding: var(--space-md) var(--space-lg); /* Fibonacci button sizing */
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1rem;
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs); /* Micro-spacing for icon-text harmony */
        }

        .btn-primary {
          background: white;
          color: var(--primary);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .hero-visual {
          position: relative;
          animation: slideInRight 1s ease-out 0.8s both;
        }

        .demo-preview {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 1rem;
          padding: 1rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          transform: rotateY(-5deg) rotateX(5deg);
          transition: transform 0.3s ease;
        }

        .demo-preview:hover {
          transform: rotateY(0deg) rotateX(0deg);
        }

        .demo-video {
          width: 100%;
          height: 300px;
          background: linear-gradient(45deg, #f0f2f5, #e4e7ea);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .play-button {
          width: 60px;
          height: 60px;
          background: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 2;
        }

        .play-button:hover {
          transform: scale(1.1);
          background: var(--primary-dark);
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* STATS SECTION - COGNITIVE COMFORT ZONES */
        .stats-section {
          padding: var(--premium-spacing) var(--space-md); /* Premium spacing for trust */
          background: linear-gradient(
            135deg,
            #f8fafc 0%,
            #ffffff 50%,
            #f1f5f9 100%
          );
          position: relative;
          z-index: 3;
          margin-top: -100px; /* Overlapping transition maintains flow */
          border-radius: 2rem 2rem 0 0;
          /* White space above/below creates cognitive breathing room */
          margin-bottom: var(--space-3xl);
        }

        .stats-section::before {
          content: "";
          position: absolute;
          top: -2px;
          left: 10%;
          right: 10%;
          height: 3px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--accent),
            transparent
          );
          border-radius: 2px;
        }

        .stats-container {
          max-width: var(--content-width);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-xl); /* Fibonacci spacing for card separation */
        }

        .stat-card {
          text-align: center;
          padding: var(--space-lg); /* Internal comfort spacing */
          border-radius: 1rem;
          background: var(--surface);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
          /* Card internal spacing creates scanning hierarchy */
          margin-bottom: var(--space-md);
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, #0057ff 0%, #0041cc 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .stat-description {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        /* COMPARISON TABLE - F-PATTERN OPTIMIZATION */
        .comparison-section {
          padding: var(--space-2xl) var(--space-md);
          background: linear-gradient(
            135deg,
            #fafbfc 0%,
            #f1f5f9 50%,
            #e2e8f0 100%
          );
          margin-bottom: var(--space-3xl); /* Major section separation */
          position: relative;
        }

        .comparison-section::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 87, 255, 0.3),
            transparent
          );
        }

        .section-header {
          text-align: center;
          max-width: var(--scan-width); /* F-pattern focal width */
          margin: 0 auto var(--comfort-spacing); /* Reduce decision anxiety before comparison */
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: var(--lh-tight); /* Golden ratio headline spacing */
          margin-bottom: var(--space-md); /* F-pattern primary spacing */
          color: var(--text-primary);
        }

        .section-subtitle {
          font-size: 1.125rem;
          line-height: var(--lh-normal); /* Optimal readability */
          color: var(--text-secondary);
          margin-bottom: var(--space-lg); /* Secondary content spacing */
        }

        .comparison-table {
          max-width: 1000px;
          margin: 0 auto;
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          background: var(--gradient);
          color: white;
          font-weight: 600;
          padding: var(--space-md); /* Consistent internal spacing */
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          padding: var(--space-md) var(--space-md); /* Scannable row spacing */
          border-bottom: 1px solid var(--border);
          align-items: center;
          /* Left-align for F-pattern scanning */
          text-align: left;
        }

        .table-row:nth-child(even) {
          background: #f8fafc;
        }

        .feature-name {
          font-weight: 500;
          color: var(--text-primary);
        }

        .check-mark {
          color: #00b8a3;
          font-weight: 700;
        }

        .x-mark {
          color: var(--warning);
          font-weight: 700;
        }

        .quotely-highlight {
          background: rgba(0, 87, 255, 0.05);
          border-left: 3px solid var(--primary);
          padding-left: calc(1rem - 3px);
        }

        /* TESTIMONIALS - PROGRESSIVE HIERARCHY */
        .testimonials-section {
          padding: var(--space-2xl) var(--space-md);
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f8fafc 50%,
            #f1f5f9 100%
          );
          margin-bottom: var(--space-3xl); /* Progressive section separation */
          position: relative;
        }

        .testimonials-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 15%;
          right: 15%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--primary) 20%,
            var(--accent) 80%,
            transparent
          );
          border-radius: 1px;
        }

        .testimonials-grid {
          max-width: var(--content-width);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--space-xl); /* Fibonacci card separation */
        }

        .testimonial-card {
          background: var(--surface);
          padding: var(--space-lg); /* Internal comfort spacing */
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          position: relative;
          /* Progressive spacing hierarchy within cards */
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .testimonial-quote {
          font-size: 1.125rem;
          line-height: var(
            --lh-relaxed
          ); /* More spacious for trust/credibility */
          margin-bottom: var(--space-lg);
          color: var(--text-primary);
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: var(--space-md); /* Author info spacing */
        }

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }

        .author-info h4 {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .author-info p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        /* CTA SECTION - CONVERSION OPTIMIZATION */
        .industry-insights-section {
          padding: var(--space-2xl) var(--space-md);
          background: linear-gradient(
            135deg,
            #edf2f7 0%,
            #e2e8f0 50%,
            #cbd5e0 100%
          );
          margin-bottom: var(--space-2xl);
          position: relative;
        }

        .industry-insights-section::before {
          content: "";
          position: absolute;
          top: -1px;
          left: 20%;
          right: 20%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--secondary) 30%,
            var(--primary) 70%,
            transparent
          );
          border-radius: 1px;
        }

        /* MENTAL COMPARTMENTALIZATION SYSTEM */
        .chapter-divider {
          position: relative;
          height: 80px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(27, 41, 81, 0.05) 20%,
            rgba(27, 41, 81, 0.1) 50%,
            rgba(27, 41, 81, 0.05) 80%,
            transparent 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          margin: var(--space-xl) 0;
        }

        .chapter-divider::after {
          content: attr(data-chapter);
          position: absolute;
          background: white;
          padding: var(--space-sm) var(--space-md);
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          border: 1px solid var(--border);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* PSYCHOLOGICAL STATE TRANSITIONS */
        .state-curiosity {
          background: linear-gradient(
            135deg,
            #667eea 0%,
            #764ba2 20%,
            #667eea 100%
          );
        }

        .state-concern {
          background: linear-gradient(
            135deg,
            #f093fb 0%,
            #f5576c 20%,
            #f093fb 100%
          );
        }

        .state-confidence {
          background: linear-gradient(
            135deg,
            #4facfe 0%,
            #00f2fe 20%,
            #4facfe 100%
          );
        }

        .state-urgency {
          background: linear-gradient(
            135deg,
            #fa709a 0%,
            #fee140 20%,
            #fa709a 100%
          );
        }

        .insights-container {
          max-width: var(--content-width);
          margin: 0 auto;
        }

        .cta-section {
          padding: var(--premium-spacing) var(--space-md); /* Premium spacing for final CTA */
          background: linear-gradient(
            135deg,
            #1b2951 0%,
            #0f1729 50%,
            #1b2951 100%
          );
          color: white;
          text-align: center;
          /* Maximum visual impact through spacing */
          margin-top: var(--space-3xl);
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: "";
          position: absolute;
          top: -50px;
          left: -50%;
          right: -50%;
          height: 100px;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 184, 163, 0.3) 0%,
            transparent 70%
          );
          animation: actionGlow 4s ease-in-out infinite;
        }

        @keyframes actionGlow {
          0%,
          100% {
            opacity: 0.3;
            transform: scaleX(0.8);
          }
          50% {
            opacity: 0.7;
            transform: scaleX(1.2);
          }
        }

        .cta-content {
          max-width: var(
            --scan-width
          ); /* F-pattern focal width for final CTA */
          margin: 0 auto;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: var(--lh-tight); /* Tight headlines for urgency */
          margin-bottom: var(--space-md); /* F-pattern primary spacing */
        }

        .cta-subtitle {
          font-size: 1.25rem;
          line-height: var(--lh-normal);
          margin-bottom: var(
            --comfort-spacing
          ); /* Reduce final decision anxiety */
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: var(--urgency-spacing); /* Tight spacing for action urgency */
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: var(--space-md); /* Space before trust signals */
        }

        /* MOBILE RESPONSIVE - THUMB-REACH PSYCHOLOGY */
        @media (max-width: 768px) {
          :root {
            /* Thumb-optimized spacing zones */
            --mobile-tap-zone: 44px; /* Minimum touch target */
            --mobile-scroll-zone: 60px; /* Comfortable scroll spacing */
            --thumb-comfort: var(--space-lg); /* 34px - ideal thumb reach */
          }

          .hero-content {
            grid-template-columns: 1fr;
            gap: var(--space-xl); /* Maintain hierarchy on mobile */
            text-align: center;
            padding: var(--space-xl) var(--space-md); /* Reduced premium spacing for mobile */
            max-width: var(--mobile-comfort); /* Thumb-reach optimization */
            margin: 0 auto;
          }

          .hero-stats {
            justify-content: center;
            gap: var(--space-md); /* Tighter mobile spacing */
          }

          .hero-ctas {
            flex-direction: column; /* Vertical stacking for thumb navigation */
            gap: var(--space-md); /* Comfortable tap spacing */
            align-items: center;
          }

          .btn {
            min-height: var(--mobile-tap-zone); /* Thumb-friendly tap targets */
            width: 100%;
            max-width: 280px; /* Thumb span optimization */
            justify-content: center;
          }

          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            gap: var(--space-sm);
          }

          .table-header {
            display: none;
          }

          .table-row {
            border: 1px solid var(--border);
            border-radius: 0.5rem;
            margin-bottom: var(--space-md); /* Mobile card spacing */
            padding: var(--space-lg); /* Internal card comfort */
          }

          .feature-name {
            font-size: 1.125rem;
            margin-bottom: var(--space-md);
            padding-bottom: var(--space-md);
            border-bottom: 1px solid var(--border);
          }

          /* Mobile section spacing */
          .stats-section,
          .comparison-section,
          .testimonials-section,
          .cta-section {
            padding: var(--space-xl) var(--space-md);
            margin-bottom: var(--space-xl);
          }

          /* MOBILE SECTION BREAK PSYCHOLOGY */
          .section-break {
            height: 60px;
            margin: var(--space-lg) 0;
          }

          .completion-trigger {
            right: 20px;
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }

          .chapter-divider {
            height: 50px;
            margin: var(--space-md) 0;
          }

          .chapter-divider::after {
            font-size: 0.75rem;
            padding: var(--space-xs) var(--space-sm);
          }

          /* MOBILE ELEVATION SYSTEM */
          .elevation-section {
            margin-bottom: var(--space-lg);
          }

          .elevation-1,
          .elevation-2,
          .elevation-3,
          .elevation-4,
          .elevation-5 {
            transform: translateY(0); /* Disable elevation movement on mobile */
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* Consistent subtle shadow */
          }

          /* MOBILE PSYCHOLOGICAL STATES */
          .state-curiosity,
          .state-concern,
          .state-confidence,
          .state-urgency {
            background: linear-gradient(
              135deg,
              var(--primary) 0%,
              var(--accent) 100%
            );
            opacity: 0.8; /* Subtle on mobile */
          }

          /* MOBILE MENTAL BREAKS */
          .chapter-divider {
            background: linear-gradient(
              90deg,
              transparent 10%,
              rgba(27, 41, 81, 0.08) 50%,
              transparent 90%
            );
          }
        }

        /* SCROLL ANIMATIONS */
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* FLOATING CTA */
        .floating-cta {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          background: #00b8a3;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 50px;
          box-shadow: 0 8px 30px rgba(0, 184, 163, 0.3);
          animation: pulse 2s infinite;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .floating-cta:hover {
          background: #009589;
          transform: scale(1.05);
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 8px 30px rgba(0, 184, 163, 0.3);
          }
          50% {
            box-shadow: 0 8px 30px rgba(0, 184, 163, 0.6);
          }
          100% {
            box-shadow: 0 8px 30px rgba(0, 184, 163, 0.3);
          }
        }
      `}</style>

      <div className="bg-gray-900 min-h-screen">
        <HulyNavigation />

        {/* HERO SECTION - Modern SaaS Design */}
        <ModernSaasHero />

        {/* LIVE QUOTE DEMO - Interactive Speed Demonstration */}
        <section className="bg-gray-800 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-5xl font-bold text-white ">
                Experience the{" "}
                <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Speed Difference
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Watch how Quotely generates accurate quotes in under 2 minutes
              </p>
            </div>
            <LiveQuoteDemo />
          </div>
        </section>

        {/* ASYMMETRIC FEATURE GRID - Modern Feature Display */}
        <AsymmetricFeatureGrid />

        {/* STATISTICS SECTION - Trust & Social Proof */}
        <StatisticsSection />

        {/* Demo Video Section for smooth scroll */}
        <div id="demo-video" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              See Quotely in Action
            </h2>
            <HomepageDemoVideo />
          </div>
        </div>

        {/* MENTAL CHAPTER: PROBLEM → PROOF */}
        <div
          className="chapter-divider"
          data-chapter="Chapter I: The Problem"
        ></div>

        <div className="section-break state-curiosity">
          <div className="completion-trigger visible">✓</div>
        </div>

        {/* STATS SECTION */}
        <section className="stats-section fade-in elevation-section">
          <div className="f-pattern-container">
            <h2>
              Why <span className="number-emphasis">1000+</span> agencies made
              the switch
            </h2>
            <div className="f-pattern-primary">
              <p>
                Insurance agents are seeing{" "}
                <span className="power-word">dramatic improvements</span> in
                productivity and revenue within their first month using Quotely.
              </p>
            </div>
          </div>
          <div className="stats-container">
            <div className="stat-card scan-block">
              <div className="stat-icon">⚡</div>
              <div className="stat-value number-emphasis">1.8 min</div>
              <div className="stat-description">
                Average quote time vs{" "}
                <span className="number-emphasis">5 min</span> industry standard
              </div>
            </div>
            <div className="stat-card scan-block">
              <div className="stat-icon">🎯</div>
              <div className="stat-value number-emphasis">94%</div>
              <div className="stat-description">
                Quote accuracy with{" "}
                <span className="benefit-word">AI recommendations</span>
              </div>
            </div>
            <div className="stat-card scan-block">
              <div className="stat-icon">📈</div>
              <div className="stat-value number-emphasis">31%</div>
              <div className="stat-description">
                Average increase in{" "}
                <span className="benefit-word">closed deals</span>
              </div>
            </div>
            <div className="stat-card scan-block">
              <div className="stat-icon">⭐</div>
              <div className="stat-value number-emphasis">9.2/10</div>
              <div className="stat-description">User satisfaction score</div>
            </div>
          </div>
        </section>

        {/* COMPARISON SECTION - Modern Platform Comparison */}
        <ComparisonSection />

        {/* AI TRANSPARENCY DASHBOARD - Real-time AI Metrics */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Real-Time AI Intelligence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Full transparency into our neural networks processing 10,000+
                decisions per second
              </p>
            </div>
            <AITransparencyDashboard />
          </div>
        </section>

        {/* TESTIMONIALS SECTION - Social Proof from Agents */}
        <TestimonialsSection />

        {/* TRUST SECTION - Security & Compliance */}
        <TrustSection />

        {/* OLD COMPARISON SECTION - Keeping for reference, can be removed later */}
        <section
          className="comparison-section fade-in solution-section elevation-3 hidden"
          id="old-comparison"
        >
          <div className="section-header f-pattern-container">
            <h2>Why agencies choose Quotely</h2>
            <h3 className="question">
              How does Quotely compare to legacy platforms?
            </h3>
            <div className="f-pattern-primary">
              <p className="lead-text">
                Independent agents demand{" "}
                <span className="power-word">modern tools</span> that deliver{" "}
                <span className="benefit-word">faster quotes</span> and{" "}
                <span className="benefit-word">higher close rates</span>. Here's
                the reality:
              </p>
            </div>
          </div>

          <div className="comparison-table">
            <div className="table-header">
              <div>Feature</div>
              <div>Quotely</div>
              <div>EZLynx</div>
              <div>Applied Rater</div>
            </div>

            <div className="table-row quotely-highlight">
              <div className="feature-name">⚡ Quote Generation Speed</div>
              <div className="check-mark">1.8 min</div>
              <div className="x-mark">4.2 min</div>
              <div className="x-mark">3.8 min</div>
            </div>

            <div className="table-row">
              <div className="feature-name">🤖 AI-Powered Recommendations</div>
              <div className="check-mark">✓</div>
              <div className="x-mark">✗</div>
              <div className="x-mark">✗</div>
            </div>

            <div className="table-row quotely-highlight">
              <div className="feature-name">📱 Mobile-First Design</div>
              <div className="check-mark">✓</div>
              <div className="x-mark">✗</div>
              <div className="x-mark">✗</div>
            </div>

            <div className="table-row">
              <div className="feature-name">🔍 Transparent Pricing</div>
              <div className="check-mark">✓</div>
              <div className="x-mark">✗</div>
              <div className="x-mark">✗</div>
            </div>

            <div className="table-row quotely-highlight">
              <div className="feature-name">🔧 API-First Integration</div>
              <div className="check-mark">✓</div>
              <div className="x-mark">Limited</div>
              <div className="x-mark">Limited</div>
            </div>

            <div className="table-row">
              <div className="feature-name">📊 Real-time Analytics</div>
              <div className="check-mark">✓</div>
              <div className="x-mark">Basic</div>
              <div className="x-mark">Basic</div>
            </div>

            <div className="table-row quotely-highlight">
              <div className="feature-name">💰 Pricing Model</div>
              <div className="check-mark">Per Office Only</div>
              <div className="x-mark">Per Agent</div>
              <div className="x-mark">Per Agent</div>
            </div>

            <div className="table-row quotely-highlight">
              <div className="feature-name">💵 Monthly Cost</div>
              <div className="check-mark">$679/office</div>
              <div className="x-mark">$1,140+/mo</div>
              <div className="x-mark">$1,295+/mo</div>
            </div>

            <div className="table-row quotely-highlight">
              <div className="feature-name">👥 10-Agent Office Cost</div>
              <div className="check-mark">$679 total</div>
              <div className="x-mark">$11,400/mo</div>
              <div className="x-mark">$12,950/mo</div>
            </div>
          </div>
        </section>

        {/* MENTAL CHAPTER: LOGIC → EMOTION */}
        <div
          className="chapter-divider"
          data-chapter="Chapter III: The Proof"
        ></div>

        <div className="section-break state-confidence">
          <div className="completion-trigger visible">💪</div>
        </div>

        {/* TESTIMONIALS SECTION */}
        <section className="testimonials-section fade-in elevation-section">
          <div className="section-header f-pattern-container">
            <h2>
              Trusted by <span className="number-emphasis">1000+</span> agencies
            </h2>
            <h3 className="question">
              What are agents saying about their switch to Quotely?
            </h3>
            <div className="f-pattern-primary">
              <p className="lead-text">
                Real agents sharing{" "}
                <span className="power-word">real results</span> from switching
                to our platform:
              </p>
            </div>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card scan-block">
              <blockquote>
                "We cut our quote time from{" "}
                <span className="number-emphasis">6 minutes</span> to under{" "}
                <span className="number-emphasis">2 minutes</span>. Our close
                rate increased by <span className="benefit-word">40%</span> in
                the first quarter alone."
              </blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">MJ</div>
                <div className="author-info">
                  <h4>Mike Johnson</h4>
                  <p className="authority-word">
                    Owner, Johnson Insurance Group
                  </p>
                </div>
              </div>
            </div>

            <div className="testimonial-card scan-block">
              <blockquote>
                "The <span className="power-word">AI recommendations</span> are
                spot-on. We're writing{" "}
                <span className="benefit-word">better policies</span> and
                clients love how <span className="power-word">fast</span> we can
                get them quotes."
              </blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">SC</div>
                <div className="author-info">
                  <h4>Sarah Chen</h4>
                  <p className="authority-word">
                    Agent, Metro Insurance Partners
                  </p>
                </div>
              </div>
            </div>

            <div className="testimonial-card scan-block">
              <blockquote>
                "Finally, a platform that works on{" "}
                <span className="benefit-word">mobile</span>. I can quote
                clients while I'm out in the field.{" "}
                <span className="power-word">Game changer</span>."
              </blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">DR</div>
                <div className="author-info">
                  <h4>David Rodriguez</h4>
                  <p className="authority-word">
                    Senior Agent, Southwest Insurance Co
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MENTAL CHAPTER: SOCIAL PROOF → AUTHORITY */}
        <div
          className="chapter-divider"
          data-chapter="Chapter IV: The Social Proof"
        ></div>

        <div className="section-break state-confidence">
          <div className="completion-trigger visible">🎯</div>
        </div>

        {/* INSURANCE JOURNAL INSIGHTS */}
        <section className="industry-insights-section fade-in elevation-section">
          <div className="section-header f-pattern-container">
            <h2>Industry Intelligence Hub</h2>
            <h3 className="question">
              What's happening in the insurance industry right now?
            </h3>
            <div className="f-pattern-primary">
              <p className="lead-text">
                Stay ahead of industry trends with{" "}
                <span className="power-word">real-time insights</span> from
                Insurance Journal, enhanced with{" "}
                <span className="authority-word">
                  Quotely's expert analysis
                </span>
                :
              </p>
            </div>
          </div>
          <div className="insights-container">
            <RotatingNewsCommentary />
          </div>
        </section>

        {/* MENTAL CHAPTER: INSIGHT → ACTION */}
        <div
          className="chapter-divider"
          data-chapter="Chapter V: The Decision"
        ></div>

        <div className="section-break state-urgency pasa-action">
          <div className="completion-trigger visible">🚀</div>
        </div>

        {/* CTA SECTION */}
        <section className="cta-section elevation-section elevation-5">
          <div className="cta-content f-pattern-container">
            <h2>
              Ready to quote <span className="power-word">10x faster</span>?
            </h2>
            <h3
              className="question"
              style={{ color: "rgba(255, 255, 255, 0.9)" }}
            >
              Why wait when you could be closing more deals tomorrow?
            </h3>
            <div className="f-pattern-primary">
              <p
                className="lead-text"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                Join{" "}
                <span
                  className="number-emphasis"
                  style={{
                    color: "white",
                    background: "rgba(0, 184, 163, 0.3)",
                  }}
                >
                  1000+
                </span>{" "}
                agencies who've already made the switch.{" "}
                <span
                  className="benefit-word"
                  style={{
                    color: "#00B8A3",
                    background: "rgba(0, 184, 163, 0.2)",
                  }}
                >
                  No credit card required
                </span>
                .
              </p>
            </div>
            <div className="cta-buttons">
              <button
                onClick={handleStartTrial}
                className="btn btn-primary"
                style={{ background: "white", color: "var(--primary)" }}
              >
                🚀 Start My{" "}
                <span
                  className="urgency-word"
                  style={{ color: "var(--primary)" }}
                >
                  Free
                </span>{" "}
                14-Day Trial
              </button>
              <button
                onClick={handleScheduleDemo}
                className="btn btn-secondary"
              >
                📞 Book My{" "}
                <span
                  className="benefit-word"
                  style={{
                    color: "white",
                    background: "rgba(0, 184, 163, 0.3)",
                  }}
                >
                  Revenue Strategy
                </span>{" "}
                Call
              </button>
            </div>
            <div
              className="small-text"
              style={{ marginTop: "1rem", color: "rgba(255, 255, 255, 0.8)" }}
            >
              <span className="benefit-word" style={{ color: "#00B8A3" }}>
                ✓ No credit card required
              </span>{" "}
              &nbsp;&nbsp;&nbsp;{" "}
              <span className="benefit-word" style={{ color: "#00B8A3" }}>
                ✓ Cancel anytime
              </span>{" "}
              &nbsp;&nbsp;&nbsp;{" "}
              <span className="benefit-word" style={{ color: "#00B8A3" }}>
                ✓ Full feature access
              </span>
            </div>
          </div>
        </section>

        {/* FLOATING CTA */}
        <button className="floating-cta" onClick={handleStartTrial}>
          Get My Quote Tool 🚀
        </button>

        <Footer />
      </div>
    </>
  );
}

export default function Home() {
  return <HomePage />;
}
