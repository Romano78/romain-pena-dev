'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { splitText } from '@/hooks/split-text';
import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

const Character = React.memo(function Character({
  char,
  progress,
  range,
}) {
  const opacity = useTransform(progress, range, [0.3, 1]);

  if (char.type === 'space') {
    return <span className='inline'>{char.content}</span>;
  }

  return (
    <motion.span
      style={{
        opacity,
      }}
      className='inline-block'
    >
      {char.content}
    </motion.span>
  );
});

const TextReveal = ({
  body = 'Transform your user interface with our powerful text reveal animations, creating engaging and dynamic experiences that captivate your audience and enhance visual storytelling through smooth, scroll-based transitions.',
  className = '',
  blockClassName = '',
  textClassName = 'h3',
  sticky = false,
  textCenter = false,
  scrollTarget = null,
}) => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollTarget || targetRef,
    offset: (scrollTarget || sticky) ? ['start end', 'end start'] : ['center end', 'end start'],
  });

  const { linesData, lineCount } = useMemo(() => {
    const rawLines = body.split('\n');
    const processed = rawLines.map((line, lineIndex) => {
      const { words, characters } = splitText(line);
      return { words, characters, lineIndex };
    });
    const totalCharacters = processed.reduce(
      (acc, line) => acc + line.characters.length,
      0,
    );
    let globalIndex = 0;
    const linesData = processed.map(({ words, lineIndex }) => ({
      lineIndex,
      words: words.map((wordObj) => {
        if (wordObj.type !== 'word') return wordObj;
        return {
          ...wordObj,
          chars: wordObj.chars.map((char) => {
            const index = globalIndex++;
            const start = index / (totalCharacters * 1.8);
            const end = start + 10 / (totalCharacters * 2);
            return { char, range: [start, end] };
          }),
        };
      }),
    }));
    return { linesData, lineCount: rawLines.length };
  }, [body]);

  if (!body.trim()) {
    return null;
  }

  // When scrollTarget is provided, About owns the sticky container — render text only
  if (scrollTarget) {
    return (
      <div className={cn(blockClassName)}>
        <div className={textClassName}>
          {linesData.map(({ words, lineIndex }) => (
            <React.Fragment key={lineIndex}>
              <div className={`inline-flex flex-wrap gap-x-[0.18em] ${textCenter ? 'justify-center' : ''}`}>
                {words.map(({ chars, type }, i) =>
                  type === 'word' && (
                    <span key={`${lineIndex}-${i}`} className='split-word inline-block'>
                      {chars.map(({ char, range }, j) => (
                        <Character key={`${lineIndex}-${i}-${j}`} char={char} progress={scrollYProgress} range={range} />
                      ))}
                    </span>
                  )
                )}
              </div>
              {lineIndex < lineCount - 1 && <br className='whitespace-pre' />}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={targetRef}
      className={cn('relative z-0', sticky ? 'h-[200vh]' : '', className)}
    >
      <div
        className={`${sticky ? 'sticky top-0 flex h-screen items-center justify-center' : ''} ${blockClassName}`}
      >
        <div className={textClassName}>
          {linesData.map(({ words, lineIndex }) => (
            <React.Fragment key={lineIndex}>
              <div
                className={`inline-flex flex-wrap gap-x-[0.18em] ${textCenter ? 'justify-center' : ''}`}
              >
                {words.map(
                  ({ chars, type }, i) =>
                    type === 'word' && (
                      <span
                        key={`${lineIndex}-${i}`}
                        className='split-word inline-block'
                      >
                        {chars.map(({ char, range }, j) => (
                          <Character
                            key={`${lineIndex}-${i}-${j}`}
                            char={char}
                            progress={scrollYProgress}
                            range={range}
                          />
                        ))}
                      </span>
                    ),
                )}
              </div>
              {lineIndex < lineCount - 1 && (
                <br className='whitespace-pre' />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

Character.propTypes = {
  char: PropTypes.object,
  progress: PropTypes.object,
  range: PropTypes.array,
  sectionTheme: PropTypes.string,
};

TextReveal.propTypes = {
  body: PropTypes.string,
  className: PropTypes.string,
  blockClassName: PropTypes.string,
  textClassName: PropTypes.string,
  sticky: PropTypes.bool,
  textCenter: PropTypes.bool,
  scrollTarget: PropTypes.object,
};

export default TextReveal;
