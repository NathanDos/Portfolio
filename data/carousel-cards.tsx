"use client";
import { CardType } from "@/components/carousel-cards";

export const CarouselCardsData : () => CardType[] = () => [
      {
        category: "Application Developer",
        title: "Infostructure Technology Inc",
        src: "/assets/Chronos.png",
        content: <Content />,
      },
      {
        category: "Shift Manager",
        title: "McDonald's",
        src: "/assets/GoogleDrive.png",
        content: <Content />,
      },
      {
        category: "Test 3",
        title: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
        src: "/assets/Dart.png",
        content: <Content />,
      },
     
      {
        category: "Test 4",
        title: "Lorem ipsum dolor sit amet.",
        src: "/assets/GoogleDrive.png",
        content: <Content />,
      },
      {
        category: "Test 5",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        src: "/assets/NewcombBenfordLaw.png",
        content: <Content />,
      },
      {
        category: "Test 6",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        src: "/assets/Chronos.png",
        content: <Content />,
      },
];


     // Inside the Carousel component, we are mapping over the data array and creating a Card component for each item. 
     // The key prop is set to card.src to ensure that each Card has a unique identifier. 
     // The card and index props are passed to the Card component to provide it with the necessary data and index information.
    const Content = () => {
      return (
        <>
          {[...new Array(3).fill(1)].map((_, index) => {
            return (
              <div
                key={"content" + index}
                className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
              >
                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                  <span className="font-bold text-neutral-700 dark:text-neutral-200">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum sem ut elit elementum, ut hendrerit arcu lobortis. Nam a augue metus. Suspendisse in efficitur ipsum.
                  </span>{" "}
                  Nam in tincidunt nisl. Curabitur et elit vel odio interdum efficitur id at metus. Aliquam pulvinar, nisi ac vestibulum scelerisque, orci mauris sodales diam, a iaculis enim nisi et ex. In at felis vitae eros vulputate interdum. Mauris euismod fringilla aliquet. Integer eleifend, purus vitae pulvinar convallis, leo tortor finibus tellus, ac fringilla metus felis ac risus. Sed eleifend nec tellus eu tristique. Aliquam erat volutpat. Integer non purus eu lacus scelerisque tristique quis sollicitudin tortor. Sed id dolor ante. Praesent vitae sollicitudin augue. 
                </p>
                <img
                  src="/assets/Chronos.png"
                  alt="Chronos the God of Time"
                  height="500"
                  width="500"
                  className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                />
              </div>
            );
          })}
        </>
      );
    };