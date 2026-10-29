import { Globe, Mail, PenLine, Rss, type LucideProps } from 'lucide-react';
import type { SocialPlatform } from '@/types/content';
import { brandPaths } from './brand-paths';

interface SocialIconProps {
  platform: SocialPlatform;
  className?: string;
  size?: number;
}

const lucideFor: Partial<Record<SocialPlatform, React.ComponentType<LucideProps>>> = {
  website: Globe,
  email: Mail,
  blog: PenLine,
  rss: Rss,
};

/** Decorative icon for a social platform. Always pair it with a visible or accessible label. */
export function SocialIcon({ platform, className, size = 18 }: SocialIconProps) {
  const LucideIcon = lucideFor[platform];
  if (LucideIcon) return <LucideIcon aria-hidden="true" className={className} size={size} strokeWidth={1.75} />;

  const path = brandPaths[platform as keyof typeof brandPaths];
  if (!path) return <Globe aria-hidden="true" className={className} size={size} strokeWidth={1.75} />;

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d={path} />
    </svg>
  );
}
