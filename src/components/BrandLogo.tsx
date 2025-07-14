import { useEffect, useState } from "react";
import vsoftLogoLight from "@/assets/vsoft-logo-light.png";
import vsoftLogoDark from "@/assets/vsoft-logo-dark.png";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16"
  };

  return (
    <img
      src={isDark ? vsoftLogoDark : vsoftLogoLight}
      alt="V-SOFT Consulting"
      className={`${sizeClasses[size]} w-auto object-contain transition-opacity duration-300 ${className}`}
    />
  );
}