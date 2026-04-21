'use client';

import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

export default function LinkCta({ href, onClick, icon, children, className = '', uppercase = true }) {
  const base = cn(
    'relative inline-flex items-center gap-1.5 cursor-pointer',
    'text-xs font-medium tracking-widest text-foreground/50',
    uppercase ? 'uppercase' : 'normal-case',
    'hover:text-foreground transition-colors duration-300 group',
    className
  );

  const content = (
    <>
      {children}
      {icon && <span className='shrink-0'>{icon}</span>}
      <span className='absolute -bottom-1 left-0 h-px bg-muted w-0 group-hover:w-full transition-all duration-300 ease-out' />
    </>
  );

  if (href) return <a href={href} className={base}>{content}</a>;
  return <button type='button' onClick={onClick} className={base}>{content}</button>;
}

LinkCta.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  uppercase: PropTypes.bool,
};
