import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { CoreExpertise } from "@/components/sections/CoreExpertise";
import { Founder } from "@/components/sections/Founder";
import { Writing } from "@/components/sections/Writing";
import { LinkedInSection } from "@/components/sections/LinkedInSection";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <CoreExpertise />
      <Founder />
      <Writing />
      <LinkedInSection />
    </>
  );
}
