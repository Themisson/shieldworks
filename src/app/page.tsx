import {
  HomeCase,
  HomeCredentials,
  HomeHero,
  HomeInsights,
  HomePublications,
  HomeSolutions,
  HomeStartingPoints,
  HomeSystems
} from "@/components/home/home-sections";
import { CTA } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { getFeaturedCase } from "@/data/cases";
import { getRecentInsights } from "@/data/insights";
import { getFeaturedPublications } from "@/data/publications";

export default function Home() {
  const recentInsights = getRecentInsights();
  const featuredCase = getFeaturedCase();
  const featuredPublications = getFeaturedPublications(5);

  return (
    <>
      <HomeHero />
      <HomeStartingPoints />
      <HomeSolutions />
      <HomeCredentials />
      {featuredCase ? <HomeCase study={featuredCase} /> : null}
      <HomePublications items={featuredPublications} />
      <HomeSystems />
      <HomeInsights items={recentInsights} />
      <Reveal>
        <CTA
          title="Tem um desafio técnico, institucional ou acadêmico?"
          description="Apresente o contexto da sua demanda. A conversa inicial serve para entender o problema, avaliar aderência e definir os próximos passos com objetividade."
          action="Apresentar minha demanda"
        />
      </Reveal>
    </>
  );
}
