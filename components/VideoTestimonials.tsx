'use client';

import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  videoUrl: string;
  thumbnail: string;
  stats: {
    metric: string;
    value: string;
  }[];
  quote: string;
}

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'CEO',
      company: 'Premier Insurance Group',
      videoUrl: 'https://example.com/video1.mp4',
      thumbnail: '/testimonial1.jpg',
      stats: [
        { metric: 'Time Saved', value: '72%' },
        { metric: 'Revenue Increase', value: '+$45K/mo' },
        { metric: 'Quote Speed', value: '3x Faster' }
      ],
      quote: "Quotely transformed our agency. We're now closing 3x more policies with half the effort."
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Operations Director',
      company: 'SafeGuard Agency',
      videoUrl: 'https://example.com/video2.mp4',
      thumbnail: '/testimonial2.jpg',
      stats: [
        { metric: 'Cost Reduction', value: '58%' },
        { metric: 'Agent Productivity', value: '+120%' },
        { metric: 'Customer Satisfaction', value: '98%' }
      ],
      quote: 'Switching from competitor platforms to Quotely was the best decision we made this year.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'VP of Sales',
      company: 'United Coverage Partners',
      videoUrl: 'https://example.com/video3.mp4',
      thumbnail: '/testimonial3.jpg',
      stats: [
        { metric: 'Monthly Savings', value: '$3,200' },
        { metric: 'Quotes Generated', value: '+450/mo' },
        { metric: 'Close Rate', value: '+35%' }
      ],
      quote: "The AI insights alone have increased our close rate by 35%. It's a game-changer."
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Real Results from Real Agencies
          </h2>
          <p className="text-lg text-gray-600">
            See how insurance agencies are transforming their business with Quotely
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setActiveVideo(testimonial.id)}
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors group"
                  >
                    <svg
                      className="w-8 h-8 text-blue-600 ml-1 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                </div>
                {/* Placeholder for video thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Quote */}
                <p className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </p>

                {/* Person Info */}
                <div className="mb-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>

                {/* Stats */}
                <div className="border-t pt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Measurable Results
                  </p>
                  <div className="space-y-2">
                    {testimonial.stats.map((stat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{stat.metric}</span>
                        <span className="text-sm font-bold text-green-600">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal (simplified - in production would use a proper modal) */}
        {activeVideo && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <div className="bg-white rounded-lg max-w-4xl w-full p-2">
              <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                <p className="text-gray-500">Video Player Placeholder</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 mb-6">
            Join 2,847+ agencies already saving time and money with Quotely
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all">
            See Your Potential Results
          </button>
        </div>
      </div>
    </div>
  );
}