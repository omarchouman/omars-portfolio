import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Omar Chouman: LaraUtilX, Jobly, ERP systems, AI-powered microservices.",
};

export default function ProjectsPage() {
  return <ProjectsGrid />;
}
