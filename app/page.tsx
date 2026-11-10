import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { EducationCertifications } from "@/components/sections/EducationCertifications";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Stack } from "@/components/sections/Stack";
import { WhatIBuild } from "@/components/sections/WhatIBuild";
import { Marquee } from "@/components/ui/Marquee";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <About />
      <SelectedWork />
      <WhatIBuild />
      <Experience />
      <EducationCertifications />
      <Stack />
      <Contact />
    </main>
  );
}
