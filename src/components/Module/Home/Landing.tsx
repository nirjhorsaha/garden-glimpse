// Displays the main heading and subtitle for the landing page using styled title and subtitle components.
"use client"

import { subtitle, title } from "@/src/components/primitives";

export default function Landing() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-2 pt-6" >
      <div className="inline-block max-w-lg lg:max-w-5xl text-center justify-center">
        <span className={title({size: "sm"})}>Grow Together with&nbsp;</span>
        <span className={title({ color: "Custom", size: 'sm' })}>Garden Glimpse&nbsp;</span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          Find expert tips, connect with fellow gardeners, and watch your garden
          flourish.
        </div>
      </div>
    </section>
  );
}