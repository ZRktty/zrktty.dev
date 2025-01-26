"use client"
import React, { useEffect, useState } from 'react';

const LocalTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const formatTime = () => {
      if (typeof navigator !== 'undefined') {
        return new Intl.DateTimeFormat(navigator.language, {
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'Atlantic/Canary',
          timeZoneName: 'short',
        }).format(currentTime);
      } else {
        return new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'Atlantic/Canary',
          timeZoneName: 'short',
        }).format(currentTime);
      }
    };

    setFormattedTime(formatTime());
  }, [currentTime]);

  return (
    <div>
      <h5>Local time</h5>
      <div>{formattedTime}</div>
    </div>
  );
};

export default LocalTime;