import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

export default function ImagePlaceholder({ className = '' }) {
  return (
    <div className={cn('w-full h-full bg-accent', className)} />
  );
}

ImagePlaceholder.propTypes = {
  className: PropTypes.string,
};
