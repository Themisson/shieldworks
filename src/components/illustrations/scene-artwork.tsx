import type { SceneKind } from "./engineering-scene";

type Label = (pt: string, en: string) => string;
type ArtProps = { kind: SceneKind; label: Label; id: string };

function Arrow({ d }: { d: string }) {
  return <path d={d} className="scene-flow" />;
}

function Shield({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0-38 31-26v29C31 25 14 38 0 44-14 38-31 25-31 3v-29Z"
        className="art-shield"
      />
      <path
        d="m-15 0 11 12 22-28"
        className="art-check scene-draw"
        pathLength="1"
      />
    </g>
  );
}

/** A readable geological cross-section, with well casing and a salt interval. */
function Formation({ id }: { id: string }) {
  return (
    <g>
      <path d="M0 40Q75 15 145 36T300 30V300H0Z" className="art-rock" />
      <path
        d="M0 92Q90 63 170 85T300 77V138Q200 163 120 143T0 160Z"
        className="art-stratum"
      />
      <path
        d="M0 160Q80 137 150 149T300 138V221Q235 245 152 225T0 239Z"
        fill={`url(#${id}-salt)`}
        className="art-salt"
      />
      <path
        d="M0 239Q70 214 145 226T300 221V300H0Z"
        className="art-rock-deep"
      />
      <g className="art-contours">
        <path d="M0 60Q80 35 150 50T300 46M0 115Q100 90 170 110T300 103M0 268Q90 243 170 259T300 252" />
        <path d="M22 192q35-19 60-6m160 8q25-11 45-9M40 207q22-8 36-2m174 6 21-4" />
      </g>
      <path d="M144-7V258m12-265V258" className="art-casing" />
      <path d="M150-20V276" className="art-well" />
      <path d="M127-13h46m-38-10h30m-22 298h14" className="art-well" />
      <g className="art-stress scene-breathe">
        <ellipse cx="150" cy="196" rx="31" ry="45" />
        <ellipse cx="150" cy="196" rx="51" ry="66" />
        <path d="M63 196h37m-8-6 8 6-8 6m145-6h-37m8-6-8 6 8 6" />
      </g>
    </g>
  );
}

function Mesh() {
  return (
    <g className="art-mesh">
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => {
          const x = col * 42 + row * 9;
          const y = row * 37 - col * 5;
          return (
            <g key={`${row}-${col}`}>
              {col < 4 && <path d={`M${x} ${y}l42-5`} />}
              {row < 4 && <path d={`M${x} ${y}l9 37`} />}
              {row < 4 && col < 4 && <path d={`M${x} ${y}l51 32`} />}
              <circle cx={x} cy={y} r="3" />
            </g>
          );
        }),
      )}
      <path
        d="M-20 5h-20m20 44h-20m20 44h-20m20 44h-20"
        className="art-boundary"
      />
    </g>
  );
}

function Plot({ label }: { label: Label }) {
  return (
    <g>
      <rect width="265" height="170" rx="10" className="art-panel" />
      <path d="M0 30h265M24 52v91h218" className="art-rule" />
      <circle cx="17" cy="15" r="3" className="art-node" />
      <path d="M32 15h75" className="art-rule" />
      <path
        d="M25 120Q61 122 84 102T133 88T190 67L234 52"
        className="art-curve scene-draw"
        pathLength="1"
      />
      <path
        d="M25 137Q72 135 107 111T168 102T234 75"
        className="art-comparison"
      />
      <text x="34" y="163">
        {label("ANÁLISE / RESULTADOS", "ANALYSIS / RESULTS")}
      </text>
    </g>
  );
}

function Document({ label, title }: { label: Label; title?: string }) {
  return (
    <g>
      <path d="M0 0h141l39 39v194H0Z" className="art-paper" />
      <path
        d="M141 0v39h39M21 65h119M21 80h83M21 158h135M21 173h122M21 188h89"
        className="art-rule"
      />
      <text x="21" y="31" className="art-label-strong">
        {title ?? label("PESQUISA", "RESEARCH")}
      </text>
      <path
        d="M21 143v-41m0 41h135M28 133q27 0 43-14t42-3 37-21"
        className="art-curve scene-draw"
        pathLength="1"
      />
      <path d="M20 215h61" className="art-copper-rule" />
    </g>
  );
}

function Code({ label }: { label: Label }) {
  return (
    <g>
      <rect width="252" height="158" rx="10" className="art-panel" />
      <path d="M0 30h252" className="art-rule" />
      <circle cx="16" cy="15" r="3" className="art-node" />
      <text x="32" y="19">
        C++ / Python
      </text>
      <text x="18" y="60" className="art-code">
        {label("dados → modelo", "data → model")}
      </text>
      <text x="32" y="86">
        {label("discretizar()", "discretize()")}
      </text>
      <text x="32" y="109">
        {label("resolver()", "solve()")}
      </text>
      <text x="18" y="136" className="art-code">
        {label("validar → documentar", "validate → document")}
      </text>
    </g>
  );
}

function Book({ label }: { label: Label }) {
  return (
    <g>
      <path
        d="M0 18Q52 0 100 18V180Q51 161 0 180ZM100 18Q149 0 200 18V180Q150 161 100 180Z"
        className="art-paper"
      />
      <path
        d="M100 18v162M16 47q30-10 67-2M16 64q30-10 67-2M16 81q30-10 67-2M116 47q30-10 67-2M116 64q30-10 67-2"
        className="art-rule"
      />
      <text x="117" y="107">
        {label("MÉTODO", "METHOD")}
      </text>
      <path
        d="M117 141h65m-65-14h42"
        className="art-copper-rule scene-draw"
        pathLength="1"
      />
    </g>
  );
}

/** Wide compositions keep secondary scenes readable without adding a second screen. */
export function CompactSceneArtwork({ kind, label, id }: ArtProps) {
  switch (kind) {
    case "approach":
      return (
        <g>
          <Arrow d="M150 126H755" />
          {[
            label("CONTEXTO", "CONTEXT"),
            label("HIPÓTESE", "HYPOTHESIS"),
            label("MODELO", "MODEL"),
            label("ENTREGA", "DELIVERY"),
          ].map((text, i) => (
            <g key={text} transform={`translate(${140 + i * 205} 126)`}>
              <circle r="55" className="art-orbit" />
              <circle
                r="42"
                className="art-panel scene-breathe"
                style={{ animationDelay: `${i * 2}s` }}
              />
              {i === 0 && (
                <path
                  d="M-19-21h38v42h-38Zm8 10h22m-22 10h16m-16 10h22"
                  className="art-rule"
                />
              )}
              {i === 1 && (
                <g>
                  <circle cy="-5" r="17" className="art-line" />
                  <path
                    d="M-7 21H7m-14 7H7M0-31v-10m-31 10-8-7m70 7 8-7"
                    className="art-copper-rule"
                  />
                </g>
              )}
              {i === 2 && (
                <path
                  d="m-22-17 44-8-8 43-42 9Zm0 0 14 44m30-52-58 52m14-44 30 35"
                  className="art-line"
                />
              )}
              {i === 3 && (
                <g transform="scale(.62)">
                  <Shield />
                </g>
              )}
              <text x="0" y="88" textAnchor="middle" className="art-heading">
                {text}
              </text>
              <text x="0" y="119" textAnchor="middle">
                0{i + 1}
              </text>
            </g>
          ))}
        </g>
      );
    case "solutions":
      return (
        <g>
          <g transform="translate(76 82) scale(.73)">
            <Mesh />
          </g>
          <g transform="translate(340 90) scale(.74)">
            <Code label={label} />
          </g>
          <g transform="translate(630 147)">
            <Shield />
          </g>
          <g transform="translate(730 77) scale(.76)">
            <Book label={label} />
          </g>
          <Arrow d="M252 147h64m-9-7 9 7-9 7M535 147h44m-9-7 9 7-9 7M670 147h45m-9-7 9 7-9 7" />
          <text x="61" y="268" className="art-label-strong">
            {label("ENGENHARIA", "ENGINEERING")}
          </text>
          <text x="343" y="268" className="art-label-strong">
            SOFTWARE
          </text>
          <text x="573" y="268" className="art-label-strong">
            {label("SEGURANÇA", "SAFETY")}
          </text>
          <text x="725" y="268" className="art-label-strong">
            {label("PESQUISA", "RESEARCH")}
          </text>
        </g>
      );
    case "publication":
      return (
        <g>
          <g transform="translate(76 64) scale(.63)">
            <Formation id={id} />
          </g>
          <g transform="translate(359 91) scale(.78)">
            <Plot label={label} />
          </g>
          <g transform="translate(658 48) scale(.84)">
            <Document label={label} title="LOT / 2025" />
          </g>
          <Arrow d="M280 156h62m-9-7 9 7-9 7M579 156h62m-9-7 9 7-9 7" />
          <text x="78" y="284" className="art-label-strong">
            {label("INVESTIGAÇÃO", "INVESTIGATION")}
          </text>
          <text x="390" y="284" className="art-label-strong">
            {label("ANÁLISE", "ANALYSIS")}
          </text>
          <text x="661" y="284" className="art-label-strong">
            {label("PUBLICAÇÃO", "PUBLICATION")}
          </text>
        </g>
      );
    case "software":
      return (
        <g>
          {["MDFolio", "AcadImprove", "Sursum", "Gabarita"].map((name, i) => (
            <g key={name} transform={`translate(${27 + i * 221} 53)`}>
              <rect width="185" height="190" rx="9" className="art-panel" />
              <text x="15" y="28" className="art-heading">
                {name}
              </text>
              {i === 0 && (
                <g>
                  <path
                    d="M20 55h62l17 17v94H20ZM82 55v17h17M33 91h49m-49 18h34m-34 18h49m-49 18h25"
                    className="art-rule"
                  />
                  <path d="M120 89h42v57h-42" className="art-line" />
                  <text x="128" y="120">
                    PDF
                  </text>
                  <Arrow d="M103 115h14" />
                </g>
              )}
              {i === 1 && (
                <g>
                  <path
                    d="M19 160h148M34 147V107h20v40m20 0V91h20v56m20 0V77h20v70m20 0V65h20v82"
                    className="art-line"
                  />
                  <path
                    d="m24 88 42-16 39 5 49-23"
                    className="art-curve scene-draw"
                    pathLength="1"
                  />
                </g>
              )}
              {i === 2 && (
                <g>
                  <path
                    d="M18 79h148M18 96h148M18 113h148M18 130h148M18 147h148"
                    className="art-rule"
                  />
                  <text x="22" y="66">
                    C
                  </text>
                  <text x="74" y="66">
                    F
                  </text>
                  <text x="138" y="66">
                    G
                  </text>
                  <path
                    d="M57 87v48q-14-7-14 5t14 4m67-51v41q-14-7-14 5t14 4"
                    className="art-copper-rule"
                  />
                </g>
              )}
              {i === 3 && (
                <g>
                  {[0, 1, 2].map((row) => (
                    <g key={row}>
                      {[0, 1, 2, 3].map((col) => (
                        <circle
                          key={col}
                          cx={35 + col * 37}
                          cy={79 + row * 33}
                          r="7"
                          className={
                            col === row
                              ? "art-filled-answer scene-breathe"
                              : "art-answer"
                          }
                        />
                      ))}
                    </g>
                  ))}
                  <path d="M19 61h148v100H19" className="art-scan scene-scan" />
                </g>
              )}
              <text x="92" y="222" textAnchor="middle">
                {
                  [
                    label("DOCUMENTOS", "DOCUMENTS"),
                    label("AVALIAÇÃO", "ASSESSMENT"),
                    label("CIFRAS", "CHORD SHEETS"),
                    label("LEITURA ÓPTICA", "OPTICAL READING"),
                  ][i]
                }
              </text>
            </g>
          ))}
        </g>
      );
    case "cases":
      return (
        <g>
          <g transform="translate(60 53) scale(.59)">
            <Formation id={id} />
          </g>
          <g transform="translate(342 107) scale(.86)">
            <Mesh />
          </g>
          <g transform="translate(652 46) scale(.84)">
            <Document label={label} title={label("CASE", "CASE STUDY")} />
          </g>
          <Arrow d="M249 145h70m-9-7 9 7-9 7M531 145h101m-9-7 9 7-9 7" />
          <text x="68" y="277" className="art-label-strong">
            {label("PROBLEMA", "PROBLEM")}
          </text>
          <text x="343" y="277" className="art-label-strong">
            {label("MÉTODO", "METHOD")}
          </text>
          <text x="652" y="277" className="art-label-strong">
            {label("EVIDÊNCIA", "EVIDENCE")}
          </text>
        </g>
      );
    case "editorial":
      return (
        <g>
          <g transform="translate(60 74) scale(.85)">
            <Book label={label} />
          </g>
          <g transform="translate(337 87) scale(.84)">
            <Code label={label} />
          </g>
          <g transform="translate(663 44) scale(.86)">
            <Document
              label={label}
              title={label("NOTA TÉCNICA", "TECHNICAL NOTE")}
            />
          </g>
          <Arrow d="M249 153h69m-9-7 9 7-9 7M567 153h76m-9-7 9 7-9 7" />
          <text x="67" y="285" className="art-label-strong">
            {label("CONHECIMENTO", "KNOWLEDGE")}
          </text>
          <text x="385" y="285" className="art-label-strong">
            {label("EXEMPLOS", "EXAMPLES")}
          </text>
          <text x="664" y="285" className="art-label-strong">
            {label("REFERÊNCIAS", "REFERENCES")}
          </text>
        </g>
      );
    case "trajectory":
      return (
        <g>
          <g transform="translate(67 62) scale(.94)">
            <Book label={label} />
          </g>
          <g transform="translate(377 90) scale(.96)">
            <Mesh />
          </g>
          <g transform="translate(756 149) scale(1.5)">
            <Shield />
          </g>
          <Arrow d="M274 142h84m-9-7 9 7-9 7M602 142h80m-9-7 9 7-9 7" />
          <text x="59" y="280" className="art-label-strong">
            {label("ENSINO / PESQUISA", "TEACHING / RESEARCH")}
          </text>
          <text x="372" y="280" className="art-label-strong">
            {label("ENGENHARIA / SOFTWARE", "ENGINEERING / SOFTWARE")}
          </text>
          <text x="700" y="280" className="art-label-strong">
            {label("SEGURANÇA", "SAFETY")}
          </text>
        </g>
      );
    case "updates":
      return (
        <g>
          <g transform="translate(86 44) scale(.84)">
            <Document label={label} title={label("CONTEÚDO", "CONTENT")} />
          </g>
          <circle cx="416" cy="183" r="8" className="art-filled-answer" />
          <path
            d="M416 137a46 46 0 0 1 46 46M416 98a85 85 0 0 1 85 85M416 59a124 124 0 0 1 124 124"
            className="art-rss scene-breathe"
          />
          <g transform="translate(668 49)">
            <rect width="145" height="195" rx="12" className="art-panel" />
            <text x="23" y="27">
              RSS / XML
            </text>
            <path
              d="M12 39h121m-112 29h100m-100 19h84m-84 31h100m-100 19h84m-84 31h71"
              className="art-rule"
            />
          </g>
          <Arrow d="M267 170h114m-9-7 9 7-9 7M560 170h91m-9-7 9 7-9 7" />
          <text x="85" y="286" className="art-label-strong">
            {label("PUBLICAR", "PUBLISH")}
          </text>
          <text x="403" y="286" className="art-label-strong">
            {label("DISTRIBUIR", "DISTRIBUTE")}
          </text>
          <text x="667" y="286" className="art-label-strong">
            {label("ACOMPANHAR", "FOLLOW")}
          </text>
        </g>
      );
    default:
      return <SceneArtwork kind={kind} label={label} id={id} />;
  }
}

export function SceneArtwork({ kind, label, id }: ArtProps) {
  switch (kind) {
    case "integrated":
      return (
        <g>
          <text x="38" y="64" className="art-heading">
            {label("DO PROBLEMA À APLICAÇÃO", "FROM PROBLEM TO APPLICATION")}
          </text>
          <g transform="translate(42 150) scale(.95)">
            <Formation id={id} />
          </g>
          <text x="40" y="474">
            {label("01 / ENGENHARIA", "01 / ENGINEERING")}
          </text>
          <g transform="translate(409 190)">
            <Mesh />
          </g>
          <text x="406" y="373">
            {label("02 / MÉTODO NUMÉRICO", "02 / NUMERICAL METHOD")}
          </text>
          <g transform="translate(615 85) scale(.86)">
            <Code label={label} />
          </g>
          <g transform="translate(599 344) scale(.94)">
            <Plot label={label} />
          </g>
          <text x="607" y="526">
            {label("03 / SOFTWARE E DECISÃO", "03 / SOFTWARE AND DECISIONS")}
          </text>
          <Arrow d="M315 222h65m-9-7 9 7-9 7M565 228h22v-65h27m-8-6 8 6-8 6M514 355v55h76m-9-7 9 7-9 7" />
          <g transform="translate(438 462) scale(.72)">
            <Shield />
          </g>
          <text x="470" y="467">
            {label("INTEGRIDADE", "INTEGRITY")}
          </text>
        </g>
      );
    case "research":
      return (
        <g>
          <text x="40" y="50" className="art-heading">
            {label(
              "GEOMECÂNICA / INTEGRIDADE DE POÇOS",
              "GEOMECHANICS / WELL INTEGRITY",
            )}
          </text>
          <g transform="translate(62 120) scale(1.2)">
            <Formation id={id} />
          </g>
          <text x="64" y="511">
            {label("FORMAÇÃO / SAL / POÇO", "FORMATION / SALT / WELL")}
          </text>
          <path d="M250 349h221v-140h59" className="art-rule" />
          <text x="535" y="172" className="art-label-strong">
            {label("MODELO TERMOMECÂNICO", "THERMOMECHANICAL MODEL")}
          </text>
          <g transform="translate(559 206) scale(.9)">
            <Mesh />
          </g>
          <g transform="translate(528 372) scale(.85)">
            <Plot label={label} />
          </g>
          <Arrow d="M636 353v18" />
        </g>
      );
    case "numerical":
      return (
        <g>
          <text x="44" y="70" className="art-heading">
            {label(
              "DISCRETIZAR / RESOLVER / VALIDAR",
              "DISCRETIZE / SOLVE / VALIDATE",
            )}
          </text>
          <g transform="translate(115 182) scale(1.65)">
            <Mesh />
          </g>
          <g transform="translate(565 103)">
            <Code label={label} />
          </g>
          <g transform="translate(557 328)">
            <Plot label={label} />
          </g>
          <Arrow d="M440 263h90v-82h34m-9-7 9 7-9 7M687 267v53m-7-8 7 8 7-8" />
          <text x="85" y="496">
            {label(
              "CONDIÇÕES DE CONTORNO / ELEMENTOS / NÓS",
              "BOUNDARY CONDITIONS / ELEMENTS / NODES",
            )}
          </text>
        </g>
      );
    case "approach":
      return (
        <g>
          <text x="45" y="75" className="art-heading">
            {label("UM MÉTODO, QUATRO MOVIMENTOS", "ONE METHOD, FOUR STEPS")}
          </text>
          <Arrow d="M145 270H746m-12-9 12 9-12 9" />
          {[
            label("CONTEXTO", "CONTEXT"),
            label("HIPÓTESE", "HYPOTHESIS"),
            label("MODELO", "MODEL"),
            label("ENTREGA", "DELIVERY"),
          ].map((text, i) => (
            <g key={text} transform={`translate(${142 + i * 198} 263)`}>
              <circle r="59" className="art-orbit" />
              <circle
                r="44"
                className="art-panel scene-breathe"
                style={{ animationDelay: `${i * 2}s` }}
              />
              {i === 0 && (
                <path
                  d="M-19-20h38v40h-38Zm8 11h22m-22 9h16m-16 9h22"
                  className="art-rule"
                />
              )}
              {i === 1 && (
                <g>
                  <circle cy="-5" r="17" className="art-line" />
                  <path
                    d="M-7 21H7m-14 7H7M0-31v-10m-31 10-8-7m70 7 8-7"
                    className="art-copper-rule"
                  />
                </g>
              )}
              {i === 2 && (
                <path
                  d="m-22-17 44-8-8 43-42 9Zm0 0 14 44m30-52-58 52m14-44 30 35"
                  className="art-line"
                />
              )}
              {i === 3 && (
                <g transform="scale(.62)">
                  <Shield />
                </g>
              )}
              <text
                x="0"
                y="96"
                textAnchor="middle"
                className="art-label-strong"
              >
                {text}
              </text>
              <text x="0" y="126" textAnchor="middle">
                0{i + 1}
              </text>
            </g>
          ))}
          <path d="M141 433H734" className="art-rule" />
          <text x="438" y="470" textAnchor="middle">
            {label(
              "EVIDÊNCIA / RASTREABILIDADE / PROPÓSITO",
              "EVIDENCE / TRACEABILITY / PURPOSE",
            )}
          </text>
        </g>
      );
    case "solutions":
      return (
        <g>
          <g transform="translate(88 108) scale(.8)">
            <Mesh />
          </g>
          <g transform="translate(558 82) scale(.9)">
            <Code label={label} />
          </g>
          <g transform="translate(145 340) scale(.9)">
            <Shield />
          </g>
          <g transform="translate(552 345) scale(.9)">
            <Book label={label} />
          </g>
          <circle cx="431" cy="281" r="72" className="art-orbit" />
          <circle cx="431" cy="281" r="55" className="art-panel" />
          <text
            x="431"
            y="278"
            textAnchor="middle"
            className="art-label-strong"
          >
            {label("PROBLEMA", "PROBLEM")}
          </text>
          <text x="431" y="301" textAnchor="middle">
            {label("REAL", "REAL-WORLD")}
          </text>
          <Arrow d="M284 182 378 240M556 180l-74 59M189 350l192-48M554 380l-74-66" />
          <text x="70" y="277">
            {label("ENGENHARIA", "ENGINEERING")}
          </text>
          <text x="555" y="265">
            SOFTWARE
          </text>
          <text x="87" y="432">
            {label("SEGURANÇA", "SAFETY")}
          </text>
          <text x="554" y="538">
            {label("ASSESSORIA / PESQUISA", "ADVISORY / RESEARCH")}
          </text>
        </g>
      );
    case "publication":
      return (
        <g>
          <text x="45" y="55" className="art-heading">
            {label(
              "DA INVESTIGAÇÃO AO REGISTRO CIENTÍFICO",
              "FROM INVESTIGATION TO SCIENTIFIC RECORD",
            )}
          </text>
          <g transform="translate(50 158) scale(.8)">
            <Formation id={id} />
          </g>
          <g transform="translate(347 190) scale(.86)">
            <Plot label={label} />
          </g>
          <g transform="translate(646 138) scale(1.16)">
            <Document label={label} title="LOT / 2025" />
          </g>
          <Arrow d="M294 297h40m-9-7 9 7-9 7M581 296h59m-9-7 9 7-9 7" />
          <text x="53" y="461">
            {label("FORMAÇÃO SALINA", "SALT FORMATION")}
          </text>
          <text x="646" y="452">
            {label("PUBLICAÇÃO / FONTE", "PUBLICATION / SOURCE")}
          </text>
        </g>
      );
    case "software":
      return (
        <g>
          <text x="45" y="65" className="art-heading">
            {label(
              "FERRAMENTAS, CADA UMA COM UM PROPÓSITO",
              "TOOLS, EACH WITH A PURPOSE",
            )}
          </text>
          {["MDFolio", "AcadImprove", "Sursum", "Gabarita"].map((name, i) => (
            <g
              key={name}
              transform={`translate(${70 + (i % 2) * 405} ${120 + Math.floor(i / 2) * 210})`}
            >
              <rect width="315" height="171" rx="12" className="art-panel" />
              <text x="20" y="31" className="art-label-strong">
                {name}
              </text>
              {i === 0 && (
                <g>
                  <path
                    d="M22 57h98v89H22Zm15 20h65M37 95h50M37 114h65M37 132h32"
                    className="art-rule"
                  />
                  <Arrow d="M146 100h34m-9-7 9 7-9 7" />
                  <path
                    d="M207 68h54l15 15v59h-69ZM261 68v15h15"
                    className="art-line"
                  />
                  <text x="219" y="117">
                    PDF
                  </text>
                </g>
              )}
              {i === 1 && (
                <g>
                  <path
                    d="M22 141h260M40 126V92h29v34m23 0V77h29v49m23 0V100h29v26m23 0V62h29v64"
                    className="art-line"
                  />
                  <path
                    d="m40 72 59-18 60 16 65-25"
                    className="art-curve scene-draw"
                    pathLength="1"
                  />
                </g>
              )}
              {i === 2 && (
                <g>
                  <path
                    d="M25 62h261M25 78h261M25 94h261M25 110h261M25 126h261"
                    className="art-rule"
                  />
                  <text x="37" y="57">
                    C
                  </text>
                  <text x="127" y="57">
                    F
                  </text>
                  <text x="228" y="57">
                    G
                  </text>
                  <path
                    d="M79 68v53q-15-7-15 4t15 5V91m110-14v41q-15-7-15 4t15 5"
                    className="art-copper-rule"
                  />
                </g>
              )}
              {i === 3 && (
                <g>
                  {[0, 1, 2].map((row) => (
                    <g key={row}>
                      {[0, 1, 2, 3, 4].map((col) => (
                        <circle
                          key={col}
                          cx={45 + col * 47}
                          cy={72 + row * 28}
                          r="7"
                          className={
                            col === row + 1
                              ? "art-filled-answer scene-breathe"
                              : "art-answer"
                          }
                        />
                      ))}
                    </g>
                  ))}
                  <path d="M24 51h262v97H24" className="art-scan scene-scan" />
                </g>
              )}
            </g>
          ))}
        </g>
      );
    case "cases":
      return (
        <g>
          <text x="40" y="64" className="art-heading">
            {label(
              "MODELAR / IMPLEMENTAR / DOCUMENTAR",
              "MODEL / IMPLEMENT / DOCUMENT",
            )}
          </text>
          <g transform="translate(54 153) scale(.72)">
            <Formation id={id} />
          </g>
          <g transform="translate(66 411) scale(.75)">
            <Code label={label} />
          </g>
          <g transform="translate(369 172) scale(1.1)">
            <Mesh />
          </g>
          <g transform="translate(647 151) scale(1.15)">
            <Document label={label} title={label("CASE", "CASE STUDY")} />
          </g>
          <Arrow d="M277 270h74m-9-7 9 7-9 7M262 446h76V325h40M592 267h48m-9-7 9 7-9 7" />
          <text x="375" y="439">
            {label("MÉTODO / EVIDÊNCIA", "METHOD / EVIDENCE")}
          </text>
        </g>
      );
    case "editorial":
      return (
        <g>
          <g transform="translate(49 124) scale(1.3)">
            <Book label={label} />
          </g>
          <g transform="translate(390 144)">
            <Code label={label} />
          </g>
          <g transform="translate(677 131)">
            <Document
              label={label}
              title={label("NOTA TÉCNICA", "TECHNICAL NOTE")}
            />
          </g>
          <Arrow d="M316 262h60m-9-7 9 7-9 7M648 262h22m-9-7 9 7-9 7" />
          <path d="M97 415H781" className="art-rule" />
          <text x="54" y="481">
            {label(
              "IDEIAS / EQUAÇÕES / CÓDIGO / REFERÊNCIAS",
              "IDEAS / EQUATIONS / CODE / REFERENCES",
            )}
          </text>
        </g>
      );
    case "knowledge":
      return (
        <g>
          <path
            d="M450 280 193 131m257 149L709 131m-259 149L192 438m258-158 259 158m-259-158V69m0 211v231"
            className="scene-flow"
          />
          <circle cx="450" cy="280" r="84" className="art-orbit" />
          <circle cx="450" cy="280" r="64" className="art-panel" />
          <text x="450" y="284" textAnchor="middle" className="art-heading">
            SW
          </text>
          {[
            [193, 131, label("PESQUISA", "RESEARCH")],
            [709, 131, label("MÉTODOS", "METHODS")],
            [192, 438, "SOFTWARE"],
            [709, 438, label("PUBLICAÇÕES", "PUBLICATIONS")],
            [450, 69, label("SEGURANÇA", "SAFETY")],
            [450, 511, label("DECISÃO", "DECISION")],
          ].map(([x, y, text]) => (
            <g key={text}>
              <rect
                x={Number(x) - 90}
                y={Number(y) - 29}
                width="180"
                height="58"
                rx="29"
                className="art-panel scene-breathe"
              />
              <text
                x={x}
                y={Number(y) + 5}
                textAnchor="middle"
                className="art-label-strong"
              >
                {text}
              </text>
            </g>
          ))}
        </g>
      );
    case "trajectory":
      return (
        <g>
          <text x="45" y="65" className="art-heading">
            {label(
              "CONHECIMENTO QUE ATRAVESSA DISCIPLINAS",
              "KNOWLEDGE ACROSS DISCIPLINES",
            )}
          </text>
          <g transform="translate(85 163) scale(1.05)">
            <Book label={label} />
          </g>
          <g transform="translate(374 198) scale(1.1)">
            <Mesh />
          </g>
          <g transform="translate(758 264) scale(1.65)">
            <Shield />
          </g>
          <Arrow d="M304 264h51m-9-7 9 7-9 7M612 264h84m-9-7 9 7-9 7" />
          <text x="89" y="416">
            {label("ENSINO / PESQUISA", "TEACHING / RESEARCH")}
          </text>
          <text x="375" y="416">
            {label("ENGENHARIA / SOFTWARE", "ENGINEERING / SOFTWARE")}
          </text>
          <text x="682" y="416">
            {label("SEGURANÇA", "SAFETY")}
          </text>
        </g>
      );
    case "updates":
      return (
        <g>
          <g transform="translate(75 136)">
            <Document label={label} title={label("CONTEÚDO", "CONTENT")} />
          </g>
          <circle cx="424" cy="297" r="8" className="art-filled-answer" />
          <path
            d="M424 248a49 49 0 0 1 49 49M424 205a92 92 0 0 1 92 92M424 164a133 133 0 0 1 133 133"
            className="art-rss scene-breathe"
          />
          <g transform="translate(637 166)">
            <rect width="185" height="248" rx="14" className="art-panel" />
            <path
              d="M13 37h159m-143 36h122m-122 20h104m-104 46h122m-122 20h104m-104 46h95"
              className="art-rule"
            />
            <text x="26" y="27">
              RSS / XML
            </text>
            <circle cx="93" cy="230" r="6" className="art-answer" />
          </g>
          <Arrow d="M261 296h117m-9-7 9 7-9 7M566 296h58m-9-7 9 7-9 7" />
          <text x="78" y="473">
            {label(
              "PUBLICAR / DISTRIBUIR / ACOMPANHAR",
              "PUBLISH / DISTRIBUTE / FOLLOW",
            )}
          </text>
        </g>
      );
    case "contact":
      return (
        <g>
          <path d="M72 114h271v193H192l-54 46v-46H72Z" className="art-panel" />
          <path
            d="M102 155h200m-200 29h154m-154 29h184m-184 29h113"
            className="art-rule"
          />
          <path
            d="M565 193h271v193H716l-52 45v-45h-99Z"
            className="art-panel"
          />
          <path
            d="M596 235h205m-205 29h140m-140 29h188m-188 29h128"
            className="art-rule"
          />
          <Arrow d="M359 226h93v56h95m-9-7 9 7-9 7" />
          <g transform="translate(451 420) scale(.8)">
            <Shield />
          </g>
          <text x="102" y="90" className="art-label-strong">
            {label("SEU CONTEXTO", "YOUR CONTEXT")}
          </text>
          <text x="583" y="167" className="art-label-strong">
            {label("PRÓXIMOS PASSOS", "NEXT STEPS")}
          </text>
          <text x="450" y="506" textAnchor="middle">
            {label("ESCUTA / ESCOPO / ENTREGA", "LISTEN / SCOPE / DELIVER")}
          </text>
        </g>
      );
    case "safety":
      return (
        <g>
          <text x="45" y="65" className="art-heading">
            {label(
              "RISCO / CAMADAS DE PROTEÇÃO / DECISÃO",
              "RISK / LAYERS OF PROTECTION / DECISION",
            )}
          </text>
          <Arrow d="M75 282H820m-12-9 12 9-12 9" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${200 + i * 163} 251)`}>
              <path d="M-32-84h64v184h-64Z" className="art-barrier" />
              <g transform="scale(.7)">
                <Shield />
              </g>
              <text x="0" y="153" textAnchor="middle">
                0{i + 1}
              </text>
            </g>
          ))}
          <text x="75" y="472">
            {label(
              "PREVENÇÃO / REDUNDÂNCIA / INTEGRIDADE",
              "PREVENTION / REDUNDANCY / INTEGRITY",
            )}
          </text>
        </g>
      );
  }
}
