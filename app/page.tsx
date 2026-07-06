"use client";
//Custom Components
import Navbar from "@/components/navbar";
import ScrollingWorkInformation from "@/components/scrolling-work-information";
import CarouselBuilder from "@/components/carousel-builder";
import ExpandableCardGrid from "@/components/expandable-card-grid";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function Page() {
  return (
    <>
      <Navbar />
      <TracingBeam>
        <section id="work-experience" />
        <ScrollingWorkInformation />
        <section id="strengths" />
        <CarouselBuilder />
        <section id="projects" />
        <ExpandableCardGrid />
      </TracingBeam>
      <section id="footer-section" />
    </>
  );
}
