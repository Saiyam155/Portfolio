import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/portfolio/Topbar";
import { HeroDAG } from "@/components/portfolio/HeroDAG";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { KPIStrip } from "@/components/portfolio/KPIStrip";
import { ExperienceLog } from "@/components/portfolio/ExperienceLog";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { SkillsMatrix, EducationSection } from "@/components/portfolio/SkillsMatrix";
import { ContactTerminal } from "@/components/portfolio/ContactTerminal";
import { StatusBar } from "@/components/portfolio/StatusBar";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Saiyam Doshi — Data Engineer | Spark, dbt, Snowflake, RAG" },
      {
        name: "description",
        content:
          "Boston-based data engineer. 5TB+ ingested, 99.5% pipeline uptime, 1M+ records/day. Spark, dbt, ClickHouse, Snowflake, Airflow, LLM-powered semantic layers.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar />
      <main>
        <HeroDAG />
        <AboutSection />
        <KPIStrip />
        <ExperienceLog />
        <ProjectsSection />
        <SkillsMatrix />
        <EducationSection />
        <ContactTerminal />
      </main>
      <StatusBar />
    </div>
  );
}
