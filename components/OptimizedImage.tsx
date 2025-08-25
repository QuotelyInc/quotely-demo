import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className, 
  priority = false 
}) => (
  <Image
    src={src}
    alt={alt}
    className={className}
    fill
    sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    priority={priority}
    loading={priority ? 'eager' : 'lazy'}
  />
);