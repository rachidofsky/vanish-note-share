
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkIsMobile = () => {
      // Check if it's a mobile device using window width
      const isMobileByWidth = window.innerWidth < MOBILE_BREAKPOINT;
      
      // Also check if it's likely a mobile device by checking for mobile-specific features
      const isMobileByFeatures = 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
      
      setIsMobile(isMobileByWidth || isMobileByFeatures);
    };

    // Initial check
    checkIsMobile();

    // Set up event listener for window resize
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => checkIsMobile();
    mql.addEventListener("change", onChange);
    
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
