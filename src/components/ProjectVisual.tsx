import { useState } from "react";
import type { Project } from "../data/projects";
import { almasShowcase } from "../assets/almasShowcase";

type Props = {
  project: Project;
};

type Capture = {
  desktop: string;
  mobile?: string;
  domain: string;
  label: string;
};

const captures: Record<string, Capture> = {
  beforepreview: {
    desktop: "projects/live/beforepreview-desktop.jpg",
    mobile: "projects/live/beforepreview-mobile.jpg",
    domain: "bpreview.meuinflu.com.br",
    label: "Planejamento visual"
  },
  lavahub: {
    desktop: "projects/live/lavahub-desktop.jpg",
    mobile: "projects/live/lavahub-mobile.jpg",
    domain: "lavahub.com.br",
    label: "Gestão operacional"
  },
  "meu-influ-site": {
    desktop: "projects/live/meu-influ-desktop.jpg",
    mobile: "projects/live/meu-influ-mobile.jpg",
    domain: "meuinflu.com.br",
    label: "Agência de influenciadores"
  },
  "solar-express-site": {
    desktop: "projects/live/solar-site-desktop.jpg",
    mobile: "projects/live/solar-site-mobile.jpg",
    domain: "solarexpress.com.br",
    label: "Energia solar"
  },
  "solar-express-crm": {
    desktop: "projects/live/solar-crm-desktop.jpg",
    mobile: "projects/live/solar-crm-mobile.jpg",
    domain: "crm100.solarexpress.com.br",
    label: "CRM comercial"
  },
  "camilla-rocha-form": {
    desktop: "projects/live/camilla-desktop.jpg",
    mobile: "projects/live/camilla-mobile.jpg",
    domain: "camilla.meuinflu.com.br",
    label: "Captação e dados"
  }
};

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}

function Screenshot({
  src,
  alt,
  className
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const [loaded, setLoaded] = useState(true);

  if (!loaded) {
    return (
      <div className={`${className} screenshot-fallback`}>
        <span>Visual real sendo atualizado</span>
      </div>
    );
  }

  return (
    <img
      src={asset(src)}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setLoaded(false)}
    />
  );
}

export function ProjectVisual({ project }: Props) {
  if (project.id === "almas-para-cristo") {
    return (
      <div className="project-visual-real project-visual-real--almas">
        <div className="real-visual-meta">
          <span>iOS</span>
          <span>App Store</span>
          <span>Missal</span>
          <span>Eventos</span>
          <span>Arena da Fé</span>
        </div>
        <img
          src={almasShowcase}
          alt="Telas reais do Almas para Cristo no iPhone, incluindo início, jogos bíblicos, missal e eventos"
          className="almas-showcase-image"
          loading="eager"
        />
      </div>
    );
  }

  if (project.id === "meu-influ-crm") {
    return (
      <div className="project-visual-real project-visual-real--standby">
        <div className="standby-orbit standby-orbit--one" />
        <div className="standby-orbit standby-orbit--two" />
        <div className="standby-content">
          <span className="standby-status">
            <i />
            Em desenvolvimento
          </span>
          <strong>Meu Influ CRM</strong>
          <p>
            O sistema ainda está em desenvolvimento. As telas reais entram aqui quando a versão estiver pronta para apresentação.
          </p>
          <div className="standby-tags">
            <span>CRM</span>
            <span>WhatsApp</span>
            <span>Operação interna</span>
          </div>
        </div>
      </div>
    );
  }

  const capture = captures[project.id];

  if (!capture) {
    return null;
  }

  return (
    <div className={`project-visual-real project-visual-real--capture project-visual-real--${project.id}`}>
      <div className="real-case-glow" />
      <div className="real-case-label">{capture.label}</div>

      <div className="real-desktop-frame">
        <div className="real-browser-bar">
          <div className="real-browser-dots">
            <i />
            <i />
            <i />
          </div>
          <span>{capture.domain}</span>
        </div>
        <Screenshot
          src={capture.desktop}
          alt={`Captura real da versão desktop de ${project.title}`}
          className="real-desktop-screenshot"
        />
      </div>

      {capture.mobile && (
        <div className="real-phone-frame">
          <div className="real-phone-speaker" />
          <Screenshot
            src={capture.mobile}
            alt={`Captura real da versão mobile de ${project.title}`}
            className="real-mobile-screenshot"
          />
        </div>
      )}
    </div>
  );
}
