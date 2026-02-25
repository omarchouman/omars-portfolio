import type { Metadata } from "next";
import { AboutContent } from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Omar Chouman — I build systems and think in trade-offs. Engineering philosophy, experience, and beyond code.",
};

export default function AboutPage() {
  return <AboutContent />;
}
