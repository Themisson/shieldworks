export const researchLines = [
  {
    slug: "geomecanica", number: "01",
    title: { pt: "Geomecânica salina", en: "Salt geomechanics" },
    summary: { pt: "Comportamento de evaporitos, fluência e interação entre formação e poço.", en: "Evaporite behavior, creep and formation–well interaction." },
    topics: ["Evaporitos", "Fluência", "Termomecânica"],
    publications: ["ijrmms-2025-lot", "mrc-2024-apb", "tese-2019-apb", "cilamce-2024-creep"]
  },
  {
    slug: "metodos-numericos", number: "02",
    title: { pt: "Métodos numéricos", en: "Numerical methods" },
    summary: { pt: "Formulação, discretização e validação de modelos computacionais de engenharia.", en: "Formulation, discretization and validation of computational engineering models." },
    topics: ["BEM", "FEM", "MPM", "FVM", "ABAQUS", "C++", "Python"],
    publications: ["mrc-2024-apb", "cilamce-2024-reaming", "cilamce-2024-fracture"]
  },
  {
    slug: "engenharia-de-pocos", number: "03",
    title: { pt: "Engenharia de poços", en: "Well engineering" },
    summary: { pt: "Integridade de poços, pressão em anulares confinados e leak-off test em formações salinas.", en: "Well integrity, annular pressure buildup and leak-off tests in salt formations." },
    topics: ["APB", "LOT", "Integridade", "Poços verticais"],
    publications: ["ijrmms-2025-lot", "mrc-2024-apb", "tese-2019-apb", "cilamce-2024-fracture"]
  }
] as const;
