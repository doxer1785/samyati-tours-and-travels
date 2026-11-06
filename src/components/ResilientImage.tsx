import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackGradient?: string;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackGradient = 'from-stone-800 via-amber-950 to-stone-900',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gradient-to-br ${fallbackGradient} flex flex-col items-center justify-center p-6 text-center text-stone-200 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Compass className="w-8 h-8 text-amber-400/80 mb-2 shrink-0" aria-hidden="true" />
        <span className="text-sm font-medium tracking-tight max-w-xs">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
