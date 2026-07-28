import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost-invert';
type Size = 'sm' | 'md';

const base =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 ' +
  'hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-deep hover:shadow-lg hover:shadow-brand/20',
  accent:
    'bg-accent-strong text-white hover:brightness-110 hover:shadow-lg hover:shadow-accent/30',
  outline:
    'border border-line bg-transparent text-ink hover:border-accent hover:text-accent dark:hover:text-accent',
  'ghost-invert': 'border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-accent hover:text-accent',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.8rem]',
  md: 'h-12 px-7 text-sm',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </Link>
  );
}
