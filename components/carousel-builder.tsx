'use client';
//Custom UI Components
import { Carousel } from './carousel-cards';
import { CarouselCard } from './carousel-card-content';
//Data imports
import { CarouselCardsData } from '@/data/carousel-cards';

export default function CarouselBuilder() {
  const cards = CarouselCardsData().map((card, index) => (
    <CarouselCard key={card.src} card={card} index={index} />
  ));

  return (
    <div className='w-full h-full py-20'>
      <h2 className='max-w-10/12 pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans'>
        Proficient in React, C#, SQL, .NET, and Azure. Experienced in developing
        and maintaining web applications, managing teams, and delivering
        high-quality software solutions.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
