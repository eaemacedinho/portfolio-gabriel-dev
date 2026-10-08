import { useEffect, useMemo, useState } from "react";
import { ContactModal } from "./components/ContactModal";
import { ProjectVisual } from "./components/ProjectVisual";
import { projects } from "./data/projects";

const heroPhoto = "https://avatars.githubusercontent.com/u/261530882?v=4";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(projects[0].id);

  const featured = useMemo(() => projects.filter((project) => project.featured), []);
  const secondary = useMemo(() => projects.filter((project) => !project.featured), []);

  useEffect(() => {
    const sections = projects
      .map((project) => document.getElementById(project.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveProject(visible.target.id);
      },
      { threshold: [0.2, 0.45, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Gabriel Macedo — início">
          <span className="brand-mark">GM</span>
          <span>Gabriel Macedo</span>
        </a>

        <nav className="main-nav" aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#projetos">Projetos</a>
          <button className="nav-cta" onClick={() => setContactOpen(true)}>Vamos conversar</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-shell" id="sobre">
          <div className="hero-photo-wrap">
            <div className="hero-photo-card">
              <img src={heroPhoto} alt="Foto de Gabriel Macedo" className="hero-photo" />
              <div className="hero-photo-caption">
                <span className="status-dot" />
                Disponível para novos projetos
              </div>
            </div>
            <div className="hero-floating-card">
              <span>Foco atual</span>
              <strong>Web, sistemas & mobile</strong>
            </div>
          </div>

          <div className="hero-copy">
            <span className="eyebrow">Desenvolvedor de produtos digitais</span>
            <h1>Olá, eu sou o Gabriel!</h1>
            <p className="hero-lead">
              Eu transformo ideias em sites, aplicativos e sistemas que resolvem problemas reais — da experiência visual à arquitetura e integração dos dados.
            </p>

            <div className="hero-story">
              <p>
                Minha relação com tecnologia começou cedo, primeiro desmontando e consertando computadores. Depois vieram Portugol, Python e o contato com ambientes de desenvolvimento como o VS Code.
              </p>
              <p>
                A formação técnica em Eletromecânica e a Engenharia de Controle e Automação ampliaram essa base com C, C++, Ladder, Diagramas de Blocos e lógica de sistemas. Hoje concentro meu trabalho em produtos digitais com React e TypeScript, além de aprofundar o desenvolvimento mobile — com foco especial no ecossistema iOS e experiências também em Android.
              </p>
            </div>

            <div className="hero-actions">
              <a className="button button--dark" href="#projetos">Ver projetos ↓</a>
              <button className="button button--light" onClick={() => setContactOpen(true)}>Tenho uma ideia →</button>
            </div>

            <div className="tech-line" aria-label="Tecnologias principais">
              {["React", "TypeScript", "Firebase", "Supabase", "iOS", "Android", "Automação"].map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="capabilities section-shell" aria-label="Áreas de atuação">
          <div className="capability">
            <span>01</span>
            <strong>Sites que convertem</strong>
            <p>Landing pages e sites institucionais com foco em clareza, posicionamento e contato.</p>
          </div>
          <div className="capability">
            <span>02</span>
            <strong>Apps e produtos</strong>
            <p>Experiências web e mobile desenhadas para uso real, não apenas para apresentação.</p>
          </div>
          <div className="capability">
            <span>03</span>
            <strong>Sistemas internos</strong>
            <p>CRMs, painéis e fluxos que tiram operação de planilhas e conversas espalhadas.</p>
          </div>
          <div className="capability">
            <span>04</span>
            <strong>Integrações</strong>
            <p>WhatsApp, e-mail, planilhas, bancos de dados e automações conectando o processo.</p>
          </div>
        </section>

        <section className="projects-intro section-shell" id="projetos">
          <span className="eyebrow">Projetos que desenvolvi</span>
          <h2>Não é só sobre fazer uma tela bonita.</h2>
          <p>
            Cada projeto abaixo começou com uma necessidade concreta. Meu trabalho é entender o problema, desenhar um fluxo que faça sentido e transformar isso em uma solução que as pessoas consigam usar de verdade.
          </p>
        </section>

        <div className="featured-layout section-shell">
          <aside className="project-index" aria-label="Índice de projetos em destaque">
            <span className="project-index__label">Em destaque</span>
            {featured.map((project) => (
              <a
                key={project.id}
                href={`#${project.id}`}
                className={activeProject === project.id ? "is-active" : ""}
              >
                <small>{project.eyebrow.split("·")[0]}</small>
                <span>{project.title}</span>
              </a>
            ))}
          </aside>

          <div className="featured-projects">
            {featured.map((project, index) => (
              <article className="case-study" id={project.id} key={project.id}>
                <div className="case-study__head">
                  <span className="eyebrow">{project.eyebrow}</span>
                  <h3>{project.title}</h3>
                  <p className="case-description">{project.description}</p>
                </div>

                <ProjectVisual project={project} />

                <div className="case-details">
                  <div className="case-detail">
                    <span>O problema</span>
                    <p>{project.problem}</p>
                  </div>
                  <div className="case-detail">
                    <span>A solução</span>
                    <p>{project.solution}</p>
                  </div>
                </div>

                <div className="feature-list">
                  {project.features.map((feature) => (
                    <div key={feature}><span>✓</span>{feature}</div>
                  ))}
                </div>

                <div className="case-footer">
                  <div className="stack-list">
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>

                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-link">
                      Ver projeto <ArrowIcon />
                    </a>
                  )}
                </div>

                {index < featured.length - 1 && <div className="case-divider" />}
              </article>
            ))}
          </div>
        </div>

        <section className="more-projects section-shell">
          <div className="more-projects__head">
            <span className="eyebrow">Outros sistemas e entregas</span>
            <h2>Projetos feitos para contextos diferentes.</h2>
          </div>

          <div className="project-card-grid">
            {secondary.map((project) => (
              <article className="project-card" key={project.id}>
                <ProjectVisual project={project} />
                <div className="project-card__body">
                  <span className="eyebrow">{project.eyebrow}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="compact-case-grid">
                    <div>
                      <span>Resolve</span>
                      <p>{project.problem}</p>
                    </div>
                    <div>
                      <span>Entrega</span>
                      <p>{project.solution}</p>
                    </div>
                  </div>

                  <div className="feature-list feature-list--compact">
                    {project.features.map((feature) => (
                      <div key={feature}><span>✓</span>{feature}</div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process section-shell">
          <div>
            <span className="eyebrow">Como eu penso o projeto</span>
            <h2>Do problema à versão que pode ir para a mão do usuário.</h2>
          </div>

          <div className="process-steps">
            <div><span>01</span><strong>Entender</strong><p>Objetivo, público, operação atual e gargalos.</p></div>
            <div><span>02</span><strong>Desenhar</strong><p>Fluxos, arquitetura, telas e prioridades do MVP.</p></div>
            <div><span>03</span><strong>Construir</strong><p>Frontend, dados, integrações e experiência responsiva.</p></div>
            <div><span>04</span><strong>Validar</strong><p>Testes, ajustes, publicação e evolução baseada no uso.</p></div>
          </div>
        </section>

        <section className="cta-section section-shell">
          <div className="cta-card">
            <span className="eyebrow eyebrow--light">Tem uma ideia?</span>
            <h2>Vamos transformar isso em algo que funcione de verdade.</h2>
            <p>
              Pode ser um site, um aplicativo, um sistema interno ou uma automação. Me conte o problema e eu te ajudo a organizar o caminho.
            </p>
            <button className="button button--white" onClick={() => setContactOpen(true)}>
              Vamos conversar →
            </button>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div>
          <a className="brand" href="#top">
            <span className="brand-mark">GM</span>
            <span>Gabriel Macedo</span>
          </a>
          <p>Produtos digitais com propósito, clareza e tecnologia.</p>
        </div>

        <div className="footer-links">
          <a href="https://github.com/eaemacedinho" target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
          <a href="mailto:contato@meuinflu.com">E-mail <ArrowIcon /></a>
          <button onClick={() => setContactOpen(true)}>Contato →</button>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Gabriel Macedo.</span>
          <span>Desenvolvido com React + TypeScript.</span>
        </div>
      </footer>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
