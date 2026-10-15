# Projetos e produtos digitais

`projects.ts` contém sete registros bilíngues com problema, resumo, capacidades,
tecnologias, estágio, repositório e evidência de auditoria. `/projetos/[slug]` gera
detalhes e metadata; JSON-LD é CreativeWork, sem notas, preço ou usuários fictícios.

| Projeto | Evidência consultada | Tratamento |
|---|---|---|
| MDFolio | checkout 046ef4a, AGENTS, direção visual e landing | aplicação publicada, link documentado |
| AcadImprove | checkout 447cdb3 e CHANGELOG @ dbb47dc (v1.2.0) | aplicação publicada em 2026-10-14; link documentado |
| Sursum | checkout 40c1013, CLAUDE, LANDING e componentes | aplicação publicada, link documentado |
| Gabarita | README local, fluxos OMR e revisão | publicado/piloto em evolução; validação em mais aparelhos pendente |
| Sentinela | checkout e527b58, README, CLAUDE e docs/plano/PROGRESSO.md | no ar desde 2026-10-10 com aceite parcial; link documentado |
| ObraVisão | checkout 2f66793, README, docs/00-VISAO e 04-ROADMAP | publicado em 2026-10-12, piloto em curso; link documentado |
| NaEscala | checkout 4c71327, README e CLAUDE (fases 0 a 25, v0.3.0) | aplicação publicada; link documentado |

Em 2026-10-15 os sete subdomínios responderam HTTP 200 a uma requisição simples; é o que
sustenta o link "Abrir aplicação" nos cards da landing e de `/projetos`. A marca de cada card é
o favicon do repositório do produto, inline em `src/components/illustrations/project-marks.tsx`
e colorida por `src/styles/project-marks.css` nos dois temas. Não se testou login, produção ou
dados dos produtos. “Publicado” reproduz a
documentação de origem, não certifica disponibilidade operacional. Sem URL confirmada,
o CTA aponta ao repositório/contato. Fontes completas estão nos registros para revisão.

Os seis sistemas/capacidades institucionais anteriores continuam em `/sistemas`,
incluindo estados de desenvolvimento, sob demanda e módulos futuros. Catálogo de
produtos não substitui nem promove esses projetos a sistemas oficiais do CBMAL.

Para incluir produto: comprovar recursos/estágio/link, preencher PT/EN, associar case
somente se documentado e executar checks. Não copiar estilos ou marcas de projetos de referência.
