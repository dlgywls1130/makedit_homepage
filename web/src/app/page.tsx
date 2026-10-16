import { Collaboration } from "@/components/sections/collaboration";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Infrastructure } from "@/components/sections/infrastructure";
import { MakeEdit } from "@/components/sections/make-edit";
import { Process } from "@/components/sections/process";
import { SelectedWorks } from "@/components/sections/selected-works";
import { Services } from "@/components/sections/services";
import { Why } from "@/components/sections/why";
import { getHomeProjects } from "@/sanity/content";

export default async function HomePage() {
  const { projects, total } = await getHomeProjects();

  return (
    <>
      <Hero projects={projects} />
      <MakeEdit />
      <Services />
      <SelectedWorks projects={projects} total={total} />
      <Infrastructure />
      <Why />
      <Process />
      <Collaboration />
      <Contact />
    </>
  );
}
