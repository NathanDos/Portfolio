"use client";
//node_modules
import { cn } from "@/lib/utils";
//Custom data
import { WorkInformationCards, IWorkInformationCard } from "@/data/work-information-cards";

export default function ScrollingWorkInformation() {
  return (
    <>
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Work Information
      </h2>
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {WorkInformationCards.map((item: IWorkInformationCard, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className={cn("text-xl mb-4")}>
              {item.title}
            </p>
            <p className={cn("text-lg mb-4")}>
              {item.subtitle}
            </p>

            <div className="text-sm  prose prose-sm dark:prose-invert">
              {item?.image && (
                <img
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

