import { AnimatePresence, motion } from 'framer-motion';
import { CardType } from './carousel-cards';
import { useEffect, useRef, useState, useContext, useCallback } from 'react';
import { IconX } from '@tabler/icons-react';
import { useOutsideClick } from '../hooks/use-outside-click';
import { CarouselContext } from './carousel-cards';
import { BlurImage } from './styling/blur-image';

//Card component is used to display individual cards in the carousel.
// It manages its own open/close state and handles user interactions such as opening the card to view more details and closing it.
// The component also listens for the Escape key to close the card and uses a custom hook to detect clicks outside of the card to close it as well.
export const CarouselCard = ({
  card,
  index,
  layout = false,
}: {
  card: CardType;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  const handleOpen = () => {
    setOpen(true);
  };
  //Needs callback to prevent stale closure issues when using the handleClose function inside the useEffect hook.
  const handleClose = useCallback(() => {
    setOpen(false);
    onCardClose(index);
  }, [onCardClose, index]);
  // Handle Escape key to close the card and manage body overflow when the card is open
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, handleClose]);

  useOutsideClick(containerRef, () => handleClose());

  // The Card component renders a button that displays the card's category and title.
  // When clicked, it opens a modal-like view of the card with its content.
  // The modal can be closed by clicking outside of it or pressing the Escape key.
  // The component uses motion for animations and manages the body's overflow to prevent scrolling when the modal is open.
  return (
    <>
      <AnimatePresence>
        {open && (
          <div className='fixed inset-0 z-50 h-screen overflow-auto scrollbar-none'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg'
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className='relative z-60 mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900'
            >
              <button
                className='sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white'
                onClick={handleClose}
              >
                <IconX className='h-6 w-6 text-neutral-100 dark:text-neutral-900' />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className='text-base font-medium text-black dark:text-white'
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className='mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white'
              >
                {card.title}
              </motion.p>
              <div className='py-10'>{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className='relative z-10 flex h-full w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-160 md:w-96 dark:bg-neutral-900'
      >
        <div className='pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-linear-to-b from-black/50 via-transparent to-transparent' />
        <div className='relative z-40 p-8'>
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className='text-left font-sans text-sm font-medium text-white md:text-base'
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className='mt-2 max-w-xs text-left font-sans text-xl font-semibold text-balance text-white md:text-3xl'
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className='absolute inset-0 z-10 object-cover'
        />
      </motion.button>
    </>
  );
};
