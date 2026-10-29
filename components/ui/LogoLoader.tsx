"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const logoSrc = '/assets/whiskr-monogram.png';

export interface LogoLoaderProps {
  size?: number;
  duration?: number;
  className?: string;
}

const LogoLoader: React.FC<LogoLoaderProps> = ({
  size = 120,
  duration = 2,
  className = '',
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, (duration * 1000) / 100);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage: `url(${logoSrc})`,
            maskSize: 'contain',
            maskPosition: 'center',
            maskRepeat: 'no-repeat',
            WebkitMaskImage: `url(${logoSrc})`,
            WebkitMaskSize: 'contain',
            WebkitMaskPosition: 'center',
            WebkitMaskRepeat: 'no-repeat',
          }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              clipPath: `circle(${(progress / 100) * 80}% at 50% 50%)`,
            }}
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{
              clipPath: `circle(${(progress / 100) * 80}% at 50% 50%)`,
            }}
            transition={{ duration: 0.05, ease: 'linear' }}
          >
            <img
              src={logoSrc}
              alt=""
              role="presentation"
              width={size}
              height={size}
              className="h-full w-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogoLoader;
