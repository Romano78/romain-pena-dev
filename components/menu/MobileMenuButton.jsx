'use client';

import PropTypes from 'prop-types';

export default function MobileMenuButton({ isOpen, onClick, ...props }) {
  return (
    <button
      type='button'
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      onClick={onClick}
      className='z-[100] flex flex-col items-center justify-center w-11 h-11 space-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted'
      {...props}
    >
      <span
        className={`block h-0.5 w-6 bg-foreground transform transition duration-300 ease-in-out ${
          isOpen ? 'rotate-45 translate-y-2' : ''
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-foreground transition duration-300 ease-in-out ${
          isOpen ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-foreground transform transition duration-300 ease-in-out ${
          isOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
      />
    </button>
  );
}

MobileMenuButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  'aria-controls': PropTypes.string,
};
