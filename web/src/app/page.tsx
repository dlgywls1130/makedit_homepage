import { Collaboration } from "@/components/sections/collaboration";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Infrastructure } from "@/components/sections/infrastructure";
import { MakeEdit } from "@/components/sections/make-edit";
import { Process } from "@/components/sections/process";
import { SelectedWorks } from "@/components/sections/selected-works";
import { Services } from "@/components/sections/services";
import { Why } from "@/components/sections/why";
import { getAllProjects } from "@/sanity/content";
import { demoMode } from "@/sanity/demo";

export default async function HomePage() {
  const projects = await getAllProjects();

  return (
    <>
      <Hero />
      <MakeEdit />
      <Services />
      <SelectedWorks projects={projects} demo={demoMode} />
      <Infrastructure />
      <Why />
      <Process />
      <Collaboration />
      <Contact />
    </>
  );
}
