import { useEffect, useRef, useState } from "react";
import { almasShowcase } from "../assets/almasShowcase";

type Screen = { id: string; title: string; eyebrow: string; description: string; path: string; theme: "light" | "dark" | "blue" };
const screens: Screen[] = [
  { id:"inicio", title:"Início", eyebrow:"Sua fé no dia a dia", description:"Versículo do dia, oração, formação e acesso rápido aos recursos do aplicativo.", path:"/projects/almas/inicio.jpg", theme:"dark" },
  { id:"jogos", title:"Jogos Bíblicos", eyebrow:"Arena da Fé", description:"Treino individual e desafios entre amigos com partidas de 1x1, 2x2 e 4x4.", path:"/projects/almas/jogos.jpg", theme:"blue" },
  { id:"sala", title:"Sala 1x1", eyebrow:"Desafie um amigo", description:"Criação de sala, convite e preparação para uma batalha de conhecimento bíblico.", path:"/projects/almas/sala.webp", theme:"blue" },
  { id:"missal", title:"Missal do Dia", eyebrow:"A Palavra de perto", description:"Leituras e salmos organizados para acompanhar a Santa Missa pelo celular.", path:"/projects/almas/missal.jpg", theme:"dark" },
  { id:"eventos", title:"Eventos", eyebrow:"Comunidade conectada", description:"Agenda da paróquia e encontros da juventude com datas e detalhes.", path:"/projects/almas/eventos.webp", theme:"dark" }
];

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return <span aria-hidden="true">{direction === "prev" ? "←" : "→"}</span>;
}

export function AlmasGallery() {
  const [active, setActive] = useState(0);
  const [originalAvailable, setOriginalAvailable] = useState<Record<string, boolean>>({});
  const [storeScreens, setStoreScreens] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const screen = screens[active];
  const original = originalAvailable[screen.id] !== false;
  const fallbackSource = storeScreens[active] || almasShowcase;
  const src = original ? screen.path : fallbackSource;

  useEffect(() => {
    let cancelled = false;
    fetch("https://itunes.apple.com/lookup?id=6814705411&country=br")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("App Store offline")))
      .then((data) => {
        const screenshots = data?.results?.[0]?.screenshotUrls;
        if (!cancelled && Array.isArray(screenshots)) {
          setStoreScreens(screenshots.filter((url: unknown): url is string => typeof url === "string").slice(0, 5));
        }
      })
      .catch(() => {/* The local original gallery remains the preferred source. */});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const handleEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setExpanded(false); };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [expanded]);

  const select = (index: number, focus = false) => {
    const next = (index + screens.length) % screens.length;
    setActive(next);
    if (focus) refs.current[next]?.focus();
  };

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") { event.preventDefault(); select(index + 1, true); }
    if (event.key === "ArrowLeft") { event.preventDefault(); select(index - 1, true); }
    if (event.key === "Home") { event.preventDefault(); select(0, true); }
    if (event.key === "End") { event.preventDefault(); select(screens.length - 1, true); }
  };

  const selectedImage = (
    <img
      key={src}
      className={"ag-screen-image " + (!original && storeScreens.length === 0 ? "ag-screen-image--fallback" : "")}
      src={src}
      alt={"Tela real do aplicativo Almas para Cristo. " + screen.title}
      loading={expanded ? "eager" : "lazy"}
      decoding="async"
      onError={() => {
        if (original) setOriginalAvailable((prev) => ({ ...prev, [screen.id]: false }));
      }}
    />
  );

  return (
    <section className="ag-showcase" aria-label="Explore o aplicativo Almas para Cristo">
      <div className="ag-showcase__halo" aria-hidden="true" />
      <div className="ag-intro">
        <span className="ag-kicker"><span className="ag-kicker__dot"/> DISPONÍVEL NO iPHONE</span>
        <h4>Um aplicativo para viver a fé.<br/><em>Conheça cada detalhe.</em></h4>
        <p>Escolha uma funcionalidade para explorar as telas do aplicativo. Cada parte foi pensada para aproximar pessoas, conteúdo e comunidade.</p>
      </div>

      <div className="ag-tabs" role="tablist" aria-label="Telas do aplicativo">
        {screens.map((item, i) => (
          <button
            key={item.id}
            id={"ag-tab-" + item.id}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            aria-controls="ag-panel"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            className={"ag-tab " + (i === active ? "ag-tab--active" : "")}
            onClick={() => select(i)}
            onKeyDown={(event) => onTabKeyDown(event, i)}
          >{item.title}</button>
        ))}
      </div>

      <div className="ag-stage" id="ag-panel" role="tabpanel" aria-labelledby={"ag-tab-" + screen.id} tabIndex={0}>
        <div className="ag-rail">
          <span className="ag-rail__index">{String(active + 1).padStart(2, "0")} / 05</span>
          <span className="ag-rail__small">EXPERIÊNCIA iOS</span>
          <h5>{screen.eyebrow}</h5>
          <p>{screen.description}</p>
          <div className="ag-stage__controls">
            <button type="button" aria-label="Tela anterior" onClick={() => select(active - 1)}><Arrow direction="prev"/></button>
            <button type="button" aria-label="Próxima tela" onClick={() => select(active + 1)}><Arrow direction="next"/></button>
          </div>
          <a className="ag-appstore" target="_blank" rel="noreferrer" href="https://apps.apple.com/br/app/almas-para-cristo/id6814705411">Ver na App Store <span aria-hidden="true">↗</span></a>
        </div>
        <div className={"ag-device-orbit ag-device-orbit--" + screen.theme}>
          <div className="ag-device" onClick={() => setExpanded(true)}>
            <div className="ag-device__notch" />
            {selectedImage}
          </div>
          <button className="ag-zoom" onClick={() => setExpanded(true)} type="button">Ampliar tela <span aria-hidden="true">↗</span></button>
        </div>
        <div className="ag-stage__edge" aria-hidden="true"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span></div>
      </div>

      {expanded && (
        <div className="ag-lightbox" role="presentation" onMouseDown={() => setExpanded(false)}>
          <div className="ag-lightbox__inner" role="dialog" aria-modal="true" aria-label={"Ampliar " + screen.title} onMouseDown={(e) => e.stopPropagation()}>
            <button type="button" className="ag-lightbox__close" onClick={() => setExpanded(false)} aria-label="Fechar imagem">×</button>
            {selectedImage}
            <div className="ag-lightbox__bar">
              <button type="button" onClick={() => select(active - 1)} aria-label="Imagem anterior">←</button>
              <span>{screen.title}</span>
              <button type="button" onClick={() => select(active + 1)} aria-label="Próxima imagem">→</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
