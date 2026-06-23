"use client";
//node_modules
import { useState } from "react";
//Custom Components
import ExpandableCard from "../components/expandable-card-grid"
import Navbar from "../components/navbar"

export default function Page() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  return (
    <>
      <Navbar onHeightChange={setNavbarHeight} />
      <div style={{ marginTop: `${navbarHeight}px` }}>
        <ExpandableCard />
      </div>
    </>
  )
}