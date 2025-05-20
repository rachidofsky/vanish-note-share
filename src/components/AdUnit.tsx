
import React from 'react';

interface AdUnitProps {
  adSlot: string;
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export const AdUnit = ({ adSlot, adFormat = 'auto', className = '' }: AdUnitProps) => {
  // Determine dimensions based on ad format
  const getDimensions = () => {
    switch (adFormat) {
      case 'horizontal':
        return 'h-24 sm:h-28';
      case 'vertical':
        return 'h-64';
      case 'rectangle':
        return 'h-60';
      default: // auto
        return 'h-32 sm:h-40';
    }
  };
  
  return (
    <div className={`ad-container ${className} w-full`}>
      <div 
        className={`w-full ${getDimensions()} bg-muted/30 border border-dashed border-muted-foreground/50 rounded-lg flex flex-col items-center justify-center p-4`}
      >
        <div className="text-muted-foreground font-medium">Advertisement Placeholder</div>
        <div className="text-xs text-muted-foreground mt-2">Ad Format: {adFormat}</div>
        <div className="text-xs text-muted-foreground">Ad Slot: {adSlot}</div>
      </div>
    </div>
  );
};
