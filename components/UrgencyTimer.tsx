'use client';

import { useState, useEffect } from 'react';

export default function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set deadline to March 31st, 2025 at 11:59 PM
    const deadline = new Date('2025-03-31T23:59:59');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = deadline.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4">
        <span className="text-sm font-semibold uppercase tracking-wide">
          Early Access Pricing Ends
        </span>
        <div className="flex items-center space-x-3">
          <div className="text-center">
            <div className="text-2xl font-bold">{timeLeft.days}</div>
            <div className="text-xs uppercase">Days</div>
          </div>
          <span className="text-2xl">:</span>
          <div className="text-center">
            <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs uppercase">Hours</div>
          </div>
          <span className="text-2xl">:</span>
          <div className="text-center">
            <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-xs uppercase">Min</div>
          </div>
          <span className="text-2xl">:</span>
          <div className="text-center">
            <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-xs uppercase">Sec</div>
          </div>
        </div>
        <span className="text-sm font-medium">
          Save up to 40% before prices increase
        </span>
      </div>
    </div>
  );
}