import { motion } from 'framer-motion';
//custom hooks
import { useOverflowMask } from '../hooks/use-overflow-mask';
//custom components
import { FadeOverlay } from './styling/fade-overlay';
//custom data
import { cards } from '../data/portfolio-cards';

export function ExpandedCardContent({
  active,
  id,
  animatedGridRef,
}: {
  active: (typeof cards)[number];
  id: string;
  animatedGridRef: React.RefObject<HTMLDivElement>;
}) {
  const { scrollRef, showMask, handleScroll } = useOverflowMask(active);

  return (
    <motion.div
      layoutId={`card-${active.title}-${id}`}
      ref={animatedGridRef}
      className='w-full max-w-125 h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden'
    >
      <motion.div layoutId={`image-${active.title}-${id}`}>
        <img
          width={200}
          height={200}
          src={active.src}
          alt={active.title}
          className='w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top'
        />
      </motion.div>
      <div>
        <div className='flex justify-between items-start p-4'>
          <div>
            <motion.h3
              layoutId={`title-${active.title}-${id}`}
              className='font-medium text-neutral-700 dark:text-neutral-200 text-base'
            >
              {active.title}
            </motion.h3>
            <motion.p
              layoutId={`description-${active.description}-${id}`}
              className='text-neutral-600 dark:text-neutral-400 text-base'
            >
              {active.description}
            </motion.p>
          </div>
          <motion.a
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            href={active.ctaLink}
            target='_blank'
            className='px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white'
          >
            {active.ctaText}
          </motion.a>
        </div>
        <div className='pt-4 relative px-4'>
          <motion.div
            layout
            layoutDependency={active.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={scrollRef}
            onScroll={handleScroll}
            className='text-neutral-600 text-xs md:text-sm lg:text-base max-h-100 pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 scrollbar-none [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]'
          >
            <FadeOverlay show={showMask} size='lg' />
            {typeof active.content === 'function'
              ? active.content()
              : active.content}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
