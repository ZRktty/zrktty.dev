"use client"
import React, { useEffect, useState } from 'react';

const LocalTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = new Intl.DateTimeFormat(
    typeof navigator !== 'undefined' ? navigator.language : 'en-US',
    {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Atlantic/Canary',
      timeZoneName: 'short',
    }
  ).format(currentTime);

  return (
    <div>
      <h5>Local time</h5>
      <div>{formattedTime}</div>
    </div>
  );
};

export default LocalTime;