'use client';

import { useEffect, useState } from 'react';
import { Chip } from '@mui/material';

interface TimerProps {
  seconds: number;
  onTimeout: () => void;
}

const Timer: React.FC<TimerProps> = ({ seconds, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds); // reset on prop change
  }, [seconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeout]);

  return (
    <Chip
      label={`⏱️ ${timeLeft}s`}
      color={timeLeft <= 5 ? 'error' : 'primary'}
      variant="outlined"
    />
  );
};

export default Timer;
