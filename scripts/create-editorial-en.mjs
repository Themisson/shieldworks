import fs from "node:fs";

const entries = [
  ["modelagem-numerica-com-abaqus","Numerical modeling with ABAQUS in geomechanical problems","An applied view of computational simulation in engineering, geomechanics and numerical validation.","Computational Engineering",["ABAQUS","Geomechanics","Numerical Simulation"],[
    "Computational numerical modeling enables the representation, analysis and validation of engineering problems involving stresses, strains, nonlinearities and material behavior.",
    "In geomechanics, tools such as ABAQUS can support stability studies, rock behavior, model validation and comparisons with analytical solutions or custom codes.",
    "At ShieldWorks, this work connects to routines developed in C++ and Python, results post-processing and the organization of technical reports."
  ]],
  ["sistemas-academicos-e-gestao-institucional","Academic systems and institutional management","Reflections on document automation, course management, indicators and digital support for academic administration.","Institutional Systems",["Academic Management","Systems","Automation"],[
    "Academic management involves processes that depend on organization, traceability, standardized documents and information control.",
    "Digital systems can support the management of courses, classes, instructors, students, certificates, documents and indicators.",
    "Developing these solutions requires clear workflows, information security, ease of use and alignment with institutional routines."
  ]],
  ["metodologia-cientifica-e-producao-academica","Scientific methodology and academic writing","Notes on structuring projects, final papers, scientific articles, technical reports and preparation for examination boards.","Academic Advisory",["Final Papers","Articles","Methodology"],[
    "Academic writing requires logical organization, methodological clarity and consistency between the problem, objectives, rationale, theoretical framework and method.",
    "Projects, final papers, articles and technical reports need a coherent argument that respects authorship and institutional rules.",
    "Academic advisory should provide consultation, guidance and review, helping authors develop their work with rigor and integrity."
  ]],
  ["seguranca-operacional-e-gestao-de-riscos","Operational safety and risk management","How technology and risk analysis methods can support prevention, monitoring and operational response in high-risk environments.","Operational Safety",["Risk","Prevention","Operations"],[
    "Operational safety involves systematically anticipating failures, identifying vulnerabilities and organizing effective responses to adverse scenarios.",
    "Digital tools can expand monitoring capacity, organize risk indicators, support real-time decisions and document incidents with traceability.",
    "Integrating engineering, technology and institutional management helps build safer environments and more resilient organizations, with clear protocols, current training and specialized technical support."
  ]],
  ["desenvolvimento-de-sistemas-institucionais","Developing institutional systems","Reflections on building digital platforms for academic management, document automation and decision support.","Institutional Systems",["Academic Management","Automation","Documents"],[
    "Well-designed institutional systems reduce rework, increase traceability and allow teams to focus on teaching, research and informed decisions.",
    "Development starts by mapping actual institutional workflows: who does what, when, with which documents and which approvals. Technology without this mapping solves the wrong problem.",
    "Academic management platforms, certificate issuance, course control and report generation are examples of systems that, when well built, can eliminate hundreds of hours of manual work each year."
  ]],
  ["geomecanica-salina-e-engenharia-de-pocos","Salt geomechanics and well engineering","An introduction to the mechanical challenges of salt environments, focusing on evaporite creep and its influence on well integrity.","Computational Engineering",["Geomechanics","Wells","Simulation"],[
    "Evaporitic rocks, such as halite, exhibit viscoplastic behavior manifested as creep: continuous deformation over time even under constant stress. This phenomenon poses distinctive challenges to well design and operation in pre-salt environments.",
    "Modeling this behavior requires numerical methods capable of capturing time-dependent nonlinearities, such as the Finite Element Method with creep constitutive laws. Calibrating parameters against experimental data is critical to reliable results.",
    "Understanding the interaction between geomechanical loading, salt properties and well casing is essential to structural integrity throughout the installation's service life, connecting applied research with engineering decisions."
  ]]
];
fs.mkdirSync("content/articles/en",{recursive:true});
for(const [slug,title,description,category,tags,paragraphs] of entries) {
  const pt=fs.readFileSync(`content/articles/pt/${slug}.md`,"utf8");
  const metadata=JSON.parse(pt.match(/^---\n([\s\S]*?)\n---/)[1]);
  Object.assign(metadata,{title,description,summary:description,category,tags,locale:"en"});
  fs.writeFileSync(`content/articles/en/${slug}.md`,`---\n${JSON.stringify(metadata,null,2)}\n---\n\n${paragraphs.join("\n\n")}\n`);
}
console.log(`Created ${entries.length} English equivalents of existing notes.`);
