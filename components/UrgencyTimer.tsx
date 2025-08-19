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
    // Set deadline to 7 days from now for urgency
    const now = new Date();
    const deadline = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

    const calculateTimeLeft = () => {
      const currentTime = new Date();
      const difference = deadline.getTime() - currentTime.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Reset to 7 days when timer expires
        const newDeadline = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
        const newDifference = newDeadline.getTime() - new Date().getTime();
        const days = Math.floor(newDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((newDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((newDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((newDifference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
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
          Limited Time Offer
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