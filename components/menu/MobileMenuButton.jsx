'use client';

import PropTypes from 'prop-types';

export default function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      type='button'
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      onClick={onClick}
      className='z-[100] flex flex-col items-center justify-center w-8 h-8 space-y-1.5 focus:outline-none'
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
};
