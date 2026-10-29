"use client";

import React from 'react';
import LogoLoader from './LogoLoader';

type LogoLoaderProps = React.ComponentProps<typeof LogoLoader>;

export default function LogoLoaderLight(props: LogoLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <LogoLoader {...props} />
    </div>
  );
}
