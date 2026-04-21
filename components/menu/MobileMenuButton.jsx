'use client';

import PropTypes from 'prop-types';
import { AlignRight } from 'lucide-react';

export default function MobileMenuButton({ onClick }) {
  return (
    <button
      type='button'
      aria-label='Open menu'
      onClick={onClick}
      className='flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase text-foreground/70 hover:text-foreground transition-colors border border-border bg-background/50 backdrop-blur-sm'
    >
      Menu <AlignRight size={14} />
    </button>
  );
}

MobileMenuButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
