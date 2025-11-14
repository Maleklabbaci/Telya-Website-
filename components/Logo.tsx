import React from 'react';

interface LogoProps {
  className?: string;
}

export const TelyaLogo: React.FC<LogoProps> = ({ className }) => (
  <span className={className}>
    Telya.
  </span>
);