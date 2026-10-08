import type { Project } from "../data/projects";

type Props = {
  project: Project;
};

const callouts: Record<string, [string, string]> = {
  "almas-para-cristo": ["Multiplayer em tempo real", "iOS + Web"],
  lavahub: ["Agenda centralizada", "WhatsApp + E-mail"],
  beforepreview: ["Preview 3×3", "Drag & drop"],
  "meu-influ-site": ["Captação", "Mobile-first"],
  "solar-express-site": ["Conversão", "Site comercial"],
  "solar-express-crm": ["Pipeline", "Operação centralizada"],
  "meu-influ-crm": ["CRM + WhatsApp", "Contexto comercial"],
  "camilla-rocha-form": ["Dados organizados", "Sheets integrado"]
};

function VisualCallouts({ project }: { project: Project }) {
  const [first, second] = callouts[project.id] ?? ["Produto digital", "Experiência real"];

  return (
    <>
      <div className="visual-callout visual-callout--top">
        <span className="visual-callout__dot" />
        {first}
      </div>
      <div className="visual-callout visual-callout--bottom">{second}</div>
    </>
  );
}

export function ProjectVisual({ project }: Props) {
  return (
    <div
      className={`project-visual project-visual--${project.visual} project-visual--${project.id}`}
      aria-hidden="true"
    >
      <div className="visual-glow visual-glow--one" />
      <div className="visual-glow visual-glow--two" />
      <div className="visual-grid-lines" />
      <VisualCallouts project={project} />

      <div className="visual-browser visual-browser--premium">
        <div className="visual-browser__bar">
          <div className="browser-dots"><span /><span /><span /></div>
          <div className="visual-browser__url">
            <span className="browser-lock">●</span>
            {project.title.toLowerCase().replaceAll(" ", "").replaceAll("—", "-")}.app
          </div>
          <div className="browser-action">•••</div>
        </div>

        {project.visual === "mobile" && (
          <div className="mobile-stage premium-stage">
            <div className="mobile-copy-card">
              <small>Batalha Bíblica</small>
              <strong>Aprender, jogar<br />e criar comunidade.</strong>
              <p>Uma experiência multiplayer criada para aproximar jovens da fé de um jeito interativo.</p>
              <div className="mobile-copy-tags"><span>1×1</span><span>2×2</span><span>4×4</span></div>
            </div>

            <div className="phone phone--back">
              <div className="phone__notch" />
              <div className="phone__screen">
                <div className="mini-brand">ALMAS</div>
                <div className="quiz-ring">?</div>
                <div className="mini-line mini-line--wide" />
                <div className="mini-line" />
                <div className="mini-button">Jogar agora</div>
              </div>
            </div>
            <div className="phone phone--front">
              <div className="phone__notch" />
              <div className="phone__screen">
                <div className="battle-top">
                  <div className="avatar-dot" />
                  <strong>Batalha Bíblica</strong>
                </div>
                <div className="room-code">SALA · 4F8K</div>
                <div className="versus">VS</div>
                <div className="score-row">
                  <span>Gabriel</span>
                  <b>4 × 3</b>
                  <span>Convidado</span>
                </div>
                <div className="answer-card">Quem construiu a arca?</div>
              </div>
            </div>
            <div className="floating-result-card">
              <span>Partida concluída</span>
              <strong>7 perguntas</strong>
              <small>Resultado sincronizado ✓</small>
            </div>
          </div>
        )}

        {project.visual === "dashboard" && (
          <div className="dashboard-stage premium-stage">
            <aside className="dash-sidebar">
              <div className="dash-logo">{project.title.charAt(0)}</div>
              <span className="dash-nav-active" />
              <span />
              <span />
              <span />
              <div className="dash-avatar" />
            </aside>
            <div className="dash-main">
              <div className="dash-heading">
                <div>
                  <small>Visão geral</small>
                  <strong>{project.title}</strong>
                </div>
                <div className="dash-heading-actions"><div className="dash-pill">Hoje</div><div className="dash-primary-action">+ Novo</div></div>
              </div>
              <div className="metric-grid">
                <div className="metric-card"><small>Ativos</small><strong>128</strong><em>+12%</em><i /></div>
                <div className="metric-card"><small>Hoje</small><strong>24</strong><em>+8</em><i /></div>
                <div className="metric-card"><small>Conversão</small><strong>38%</strong><em>+4,2%</em><i /></div>
              </div>
              <div className="dash-content-row">
                <div className="chart-card">
                  <div className="card-mini-head"><strong>Desempenho</strong><span>7 dias</span></div>
                  <div className="chart-bars">
                    {[42, 68, 54, 86, 64, 92, 74, 98, 83].map((h, index) => (
                      <span key={index} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="list-card">
                  <div className="card-mini-head"><strong>Recentes</strong><span>Ver todos</span></div>
                  <div className="list-row"><i /><span /></div>
                  <div className="list-row"><i /><span /></div>
                  <div className="list-row"><i /><span /></div>
                  <div className="list-row"><i /><span /></div>
                </div>
              </div>
              <div className="dash-toast"><span>✓</span><div><strong>Automação ativa</strong><small>Mensagem enviada ao cliente</small></div></div>
            </div>
          </div>
        )}

        {project.visual === "website" && (
          <div className="website-stage premium-stage">
            <div className="site-nav">
              <div className="site-logo">{project.title.split(" ")[0]}</div>
              <div className="site-links"><span /><span /><span /></div>
              <div className="site-cta">Contato</div>
            </div>
            <div className="site-hero-mock">
              <div className="site-copy">
                <span className="site-kicker">Experiência digital</span>
                <strong>Soluções que transformam ideias em resultado.</strong>
                <div className="site-paragraph" />
                <div className="site-paragraph site-paragraph--short" />
                <div className="site-button">Começar projeto ↗</div>
                <div className="site-proof"><span>●</span> Experiência responsiva e rápida</div>
              </div>
              <div className="site-art">
                <div className="site-orb site-orb--one" />
                <div className="site-orb site-orb--two" />
                <div className="site-card-float"><small>Novos contatos</small><strong>+37%</strong><span>↗ esta semana</span></div>
                <div className="site-mini-window"><span /><span /><span /><i /></div>
              </div>
            </div>
          </div>
        )}

        {project.visual === "grid" && (
          <div className="grid-stage premium-stage">
            <div className="grid-toolbar">
              <div><small>Workspace</small><strong>Preview do feed</strong></div>
              <div className="grid-toolbar-actions"><div className="dash-pill">9 posts</div><div className="dash-primary-action">Exportar</div></div>
            </div>
            <div className="grid-workspace">
              <div className="social-grid">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className={`social-tile social-tile--${index + 1}`}>
                    {index === 4 && <span>BEFORE<br />PREVIEW</span>}
                    {index === 1 && <i className="tile-badge">03</i>}
                  </div>
                ))}
              </div>
              <aside className="grid-panel">
                <small>Post selecionado</small>
                <div className="grid-panel-preview" />
                <div className="grid-panel-line" />
                <div className="grid-panel-line grid-panel-line--short" />
                <div className="grid-panel-button">Editar conteúdo</div>
              </aside>
            </div>
          </div>
        )}

        {project.visual === "form" && (
          <div className="form-stage-wrap premium-stage">
            <div className="form-side-copy">
              <span>01 / 03</span>
              <strong>Um formulário que já entrega o lead organizado.</strong>
              <p>Menos retrabalho no atendimento, mais contexto antes da primeira conversa.</p>
              <div className="sheet-mini-card"><span>Google Sheets</span><strong>Sincronizado ✓</strong></div>
            </div>
            <div className="form-stage">
              <div className="form-progress"><span /></div>
              <div className="form-copy">
                <small>Vamos começar</small>
                <strong>Conte um pouco sobre você</strong>
              </div>
              <label>Nome completo<div className="fake-input">Seu nome</div></label>
              <label>Telefone<div className="fake-input">(66) 9 9999-9999</div></label>
              <label>Objetivo<div className="fake-input fake-input--large">Quero entender qual solução faz sentido...</div></label>
              <div className="fake-submit">Continuar →</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
