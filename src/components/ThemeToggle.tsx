import React from 'react';
import { ThemeSelector } from './ThemeSelector';

export const ThemeToggle: React.FC<{ className?: string; showLabel?: boolean }> = ({ className = '', showLabel = false }) => {
  return <ThemeSelector className={className} showLabel={showLabel} />;
};
