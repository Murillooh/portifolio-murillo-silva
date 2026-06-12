import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { ImageIcon } from 'lucide-react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  src?: string;
  alt?: string;
  className?: string;
}

export function LazyImage({ src, alt, className, containerClassName, ...props }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Helper to generate optimized source set for Unsplash
  const getOptimizedUrl = (url: string, width?: number, format = 'webp') => {
    if (!url || !url.includes('unsplash.com')) return url;
    
    const baseUrl = url.split('?')[0];
    const params = new URLSearchParams(url.split('?')[1] || '');
    
    // Add optimization params
    params.set('auto', 'format');
    params.set('fm', format);
    params.set('q', '75'); // Slightly higher quality for the main srcSet
    if (width) params.set('w', width.toString());
    
    return `${baseUrl}?${params.toString()}`;
  };

  const getSrcSet = (url: string, format = 'webp') => {
    if (!url || !url.includes('unsplash.com')) return undefined;
    
    const widths = [400, 800, 1200, 1600];
    return widths
      .map(w => `${getOptimizedUrl(url, w, format)} ${w}w`)
      .join(', ');
  };

  return (
    <div className={cn("relative overflow-hidden bg-black/40", containerClassName)}>
      {/* Skeleton / Placeholder state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-white/5"
          />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-2 bg-black/60">
          <ImageIcon size={24} className="opacity-50" />
          <span className="text-[10px] font-mono">Erro ao carregar</span>
        </div>
      )}

      {/* Actual Image with Picture for Modern Formats */}
      {src && (
        <picture>
          {src.includes('unsplash.com') && (
            <>
              <source 
                srcSet={getSrcSet(src, 'avif')} 
                type="image/avif" 
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <source 
                srcSet={getSrcSet(src, 'webp')} 
                type="image/webp" 
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </>
          )}
          <img
            src={getOptimizedUrl(src, 800, 'auto')}
            srcSet={src.includes('unsplash.com') ? getSrcSet(src, 'auto') : undefined}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={alt || "Image"}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setHasError(true);
              setIsLoaded(true);
            }}
            className={cn(
              className,
              "transition-opacity duration-700 ease-out",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            {...props}
          />
        </picture>
      )}
    </div>
  );
}
