'use client';

import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

export default function PillCta({ href, onClick, icon, children, className = '' }) {
  const base = cn(
    'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase',
    'text-foreground/60 border border-border cursor-pointer',
    'transition-all duration-300',
    'hover:text-foreground hover:border-foreground/40 hover:bg-foreground/5',
    className
  );

  const content = (
    <>
      {children}
      {icon && <span className='shrink-0'>{icon}</span>}
    </>
  );

  if (href) return <a href={href} className={base}>{content}</a>;
  return <button type='button' onClick={onClick} className={base}>{content}</button>;
}

PillCta.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
