"use client";

import React from 'react';
import LogoLoader from './LogoLoader';

type LogoLoaderProps = React.ComponentProps<typeof LogoLoader>;

export default function LogoLoaderDark(props: LogoLoaderProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#282c38' }}
    >
      <LogoLoader {...props} />
    </div>
  );
}
