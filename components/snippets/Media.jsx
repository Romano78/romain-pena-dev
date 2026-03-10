'use client';

import { useRef, useState } from 'react';
import YouTube from 'react-youtube';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ParallaxImage from './ParallaxImage';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * List of supported video file extensions
 */
const videoExtensions = [
  '.mp4',
  '.webm',
  '.ogg',
  '.mov',
  '.avi',
  '.wmv',
  '.flv',
  '.mkv',
];

/**
 * Checks if a given URL points to a video file
 * @param {string} url - The URL to check
 * @returns {boolean} True if the URL ends with a supported video extension
 */
const isVideo = (url) => {
  return videoExtensions.some((ext) => url?.toLowerCase().endsWith(ext));
};

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * @param {string} url - YouTube URL (can be full URL, shortened URL, or embed URL)
 * @returns {string|boolean} YouTube video ID if valid, false otherwise
 */
const getYoutubeId = (url) => {
  if (!url) return false;
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};

const ControlButton = ({ onClick, icon: Icon }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className='hover:text-primary text-white transition-colors'
  >
    <Icon size={20} />
  </motion.button>
);

const ControlsWrapper = ({ children, animate = false }) => {
  const commonClasses =
    'absolute bottom-0 left-0 right-0 z-[1] p-4 flex items-center gap-2 bg-gradient-to-t from-black/50 to-transparent';

  if (animate) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={commonClasses}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={commonClasses}>{children}</div>;
};

const StaticControls = ({ onPlayClick, onMuteClick, isPlaying, isMuted }) => (
  <ControlsWrapper>
    <ControlButton onClick={onPlayClick} icon={isPlaying ? Pause : Play} />
    <ControlButton onClick={onMuteClick} icon={isMuted ? VolumeX : Volume2} />
  </ControlsWrapper>
);

const AnimatedControls = ({
  onPlayClick,
  onMuteClick,
  isPlaying,
  isMuted,
  isHovering,
}) => (
  <AnimatePresence>
    {isHovering && (
      <ControlsWrapper animate>
        <ControlButton onClick={onPlayClick} icon={isPlaying ? Pause : Play} />
        <ControlButton
          onClick={onMuteClick}
          icon={isMuted ? VolumeX : Volume2}
        />
      </ControlsWrapper>
    )}
  </AnimatePresence>
);

const Controls = ({
  showControls,
  youtubeVideoId,
  autoplay,
  onPlayClick,
  onMuteClick,
  isPlaying,
  isMuted,
  isHovering,
}) => {
  if (!showControls) return null;
  const controlProps = { onPlayClick, onMuteClick, isPlaying, isMuted };
  return youtubeVideoId || !autoplay ? (
    <StaticControls {...controlProps} />
  ) : (
    <AnimatedControls {...controlProps} isHovering={isHovering} />
  );
};

/**
 * A versatile media component that handles images, videos, and YouTube content
 * with support for autoplay, parallax effects, and custom controls.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.file=''] - Path to media file (image or video)
 * @param {boolean} [props.autoplay=false] - Enable autoplay for videos
 * @param {string} [props.youtubeLink=''] - YouTube video URL
 * @param {boolean} [props.parallax=false] - Enable parallax effect for images
 * @param {boolean} [props.controls=true] - Show video controls
 * @param {boolean} [props.overlay=false] - Show dark overlay on top of media
 * @param {string} [props.className=''] - Additional CSS classes for the media element
 * @param {string} [props.containerClassName=''] - Additional CSS classes for the container
 */
const Media = ({
  file = '',
  autoplay = false,
  youtubeLink = '',
  parallax = false,
  controls = true,
  overlay = false,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const isVideoBackground = youtubeLink || isVideo(file);
  const youtubeVideoId = getYoutubeId(youtubeLink);
  const showControls = controls && isVideoBackground;

  const autoplayProps = autoplay
    ? { autoPlay: true, loop: true, muted: true }
    : {};
  const classes = cn(
    'absolute top-0 left-0 z-[0] h-full w-full object-cover',
    className,
  );

  if (!file && !youtubeLink) {
    return null;
  }

  const onYoutubeReady = (event) => {
    videoRef.current = event.target;
    setIsPlaying(event.target.playerInfo.playerState === 1);
    setIsMuted(event.target.isMuted());
  };

  const onPlayClick = (e) => {
    e.stopPropagation();
    if (youtubeVideoId) {
      if (videoRef.current?.playerInfo?.playerState === 1) {
        videoRef.current.pauseVideo();
      } else {
        videoRef.current.playVideo();
      }
    } else {
      if (videoRef.current?.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current?.pause();
        setIsPlaying(false);
      }
    }
  };

  const onMuteClick = (e) => {
    e.stopPropagation();
    if (youtubeVideoId) {
      if (videoRef.current?.isMuted()) {
        videoRef.current.unMute();
        setIsMuted(false);
      } else {
        videoRef.current?.mute();
        setIsMuted(true);
      }
    } else {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
      }
    }
  };

  const onYoutubeStateChange = (event) => {
    setIsPlaying(event.data === 1);
  };

  const controlProps = {
    showControls,
    youtubeVideoId,
    autoplay,
    onPlayClick,
    onMuteClick,
    isPlaying,
    isMuted,
    isHovering,
  };

  // Render video content (YouTube or native)
  if (isVideoBackground) {
    return (
      <div
        className={cn(
          'relative h-full min-h-[300px] w-full',
          containerClassName,
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {youtubeLink ? (
          <YouTube
            videoId={youtubeVideoId}
            opts={{
              height: '100%',
              width: '100%',
              playerVars: {
                autoplay: autoplay ? 1 : 0,
                loop: autoplay ? 1 : 0,
                playlist: youtubeVideoId,
                controls: 0,
                mute: autoplay ? 1 : 0,
                rel: 0,
                iv_load_policy: 3,
                disablekb: 1,
              },
            }}
            className={classes}
            onReady={onYoutubeReady}
            onStateChange={onYoutubeStateChange}
          />
        ) : (
          <video
            ref={videoRef}
            {...autoplayProps}
            playsInline
            className={classes}
            src={file}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadedMetadata={() => {
              setIsPlaying(!videoRef.current.paused);
              setIsMuted(videoRef.current.muted);
            }}
          />
        )}
        <Controls {...controlProps} />
        {overlay && <div className='absolute inset-0 bg-overlay'></div>}
      </div>
    );
  }

  // Render image with parallax effect
  if (parallax) {
    return (
      <div className={cn('relative min-h-75', containerClassName)}>
        <ParallaxImage
          fill={true}
          className={classes}
          img={file}
          alt='background'
          priority
        />
        {overlay && <div className='absolute inset-0 bg-overlay'></div>}
      </div>
    );
  }

  // Render static image using Next.js Image component
  return (
    <div className={cn('relative min-h-75', containerClassName)}>
      <Image
        src={file}
        alt='background'
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 4000px'
        className={cn(classes, 'transform-gpu')}
        quality={100}
        priority
        {...props}
      />
      {overlay && <div className='absolute inset-0 bg-overlay'></div>}
    </div>
  );
};

Media.propTypes = {
  file: PropTypes.string,
  autoplay: PropTypes.bool,
  youtubeLink: PropTypes.string,
  parallax: PropTypes.bool,
  controls: PropTypes.bool,
  overlay: PropTypes.bool,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default Media;
