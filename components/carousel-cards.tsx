'use client';
//node_modules
import React, { useEffect, useState, createContext, JSX } from 'react';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import { motion } from 'motion/react';
//Utils
import { cn } from '../lib/utils';
//Custom Hooks
import { UseResizeObserver } from '@/hooks/use-resize-observer';

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

export type CardType = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

//Carousel component is used to display a horizontal scrolling list of cards.
// It manages the scroll position and provides buttons to scroll left and right.
// The component also provides a context to manage the state of individual cards, allowing them to communicate with the carousel when they are opened or closed.
export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { elementRef: resizeRef } = UseResizeObserver<HTMLDivElement>(
    (entry) => {
      const element = entry.target as HTMLDivElement;
      if (element) {
        const { scrollLeft, scrollWidth, clientWidth } = element;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
      }
    },
  );

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -scrollAmount(),
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: scrollAmount(),
        behavior: 'smooth',
      });
    }
  };

  const scrollAmount = () => {
    if (!cardRef.current) return 0;
    const card = cardRef.current.firstElementChild as HTMLElement;
    return card ? card.offsetWidth + 16 : 0; // 16 = gap-4
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile ? 230 : 384; // (md:w-96)
      const gap = isMobile ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * index;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      checkScrollability();
    };

    check(); // run once on mount
    window.addEventListener('resize', check);

    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className='py-10 md:py-20'>
        <div className='relative'>
          <div className='absolute inset-y-0 z-40 flex'>
            {/* Left button */}
            <button
              className='h-full w-10 
              bg-gray-100
              enabled:opacity-50
              disabled:opacity-20
              enabled:rounded-r-3xl
              disabled:rounded-3xl
              disabled:transition-all
              disabled:duration-300
              disabled:ease-in-out'
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <IconArrowNarrowLeft className='h-full w-full text-gray-500' />
            </button>
          </div>
          {/* Carousel Card container */}
          <div
            className='flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth scrollbar-none'
            ref={carouselRef}
            onScroll={checkScrollability}
          >
            <div
              className={cn(
                'absolute right-0 z-1000 h-auto w-[5%] overflow-hidden bg-linear-to-l',
              )}
            />

            <div
              ref={cardRef}
              className={cn('flex flex-row justify-start gap-4', 'mx-auto')}
            >
              {items.map((item, index) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.2 * index,
                      ease: 'easeOut',
                    },
                  }}
                  key={'card' + index}
                  className='rounded-3xl'
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
          {/* Right button */}
          <div className='absolute right-0 top-0 bottom-0 z-40 flex items-center'>
            <button
              className='h-full w-10 
              bg-gray-100
              enabled:opacity-50
              disabled:opacity-20
              enabled:rounded-l-3xl
              disabled:rounded-3xl
              disabled:transition-all
              disabled:duration-300
              disabled:ease-in-out'
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <IconArrowNarrowRight className='h-full w-full text-gray-500' />
            </button>
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};
