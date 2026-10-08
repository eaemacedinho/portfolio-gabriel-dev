export type Project = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  liveUrl?: string;
  visual: "mobile" | "dashboard" | "website" | "grid" | "form";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "almas-para-cristo",
    eyebrow: "01 · Projeto solidário",
    title: "Almas para Cristo",
    description:
      "Uma plataforma criada para apoiar o grupo de jovens da minha igreja, unindo comunidade, conteúdo católico e experiências interativas.",
    problem:
      "Transformar atividades que antes dependiam de grupos, mensagens e organização manual em uma experiência digital simples, divertida e acessível.",
    solution:
      "Desenvolvi uma experiência web/mobile com quiz bíblico multiplayer, salas 1x1, 2x2 e 4x4, roleta de categorias, placar, histórico de partidas, notificações e recursos de conteúdo.",
    features: [
      "Quiz bíblico multiplayer",
      "Salas 1x1, 2x2 e 4x4",
      "Notificações e histórico de partidas",
      "Conteúdo católico e eventos"
    ],
    stack: ["React", "TypeScript", "Supabase", "Capacitor", "iOS"],
    liveUrl: "https://almasparacristo.com.br",
    visual: "mobile",
    featured: true
  },
  {
    id: "lavahub",
    eyebrow: "02 · SaaS / Operação",
    title: "LavaHub",
    description:
      "Uma solução de gestão pensada para estéticas automotivas e lava-jatos organizarem a rotina e melhorarem a experiência do cliente.",
    problem:
      "Negócios locais costumam controlar agenda, clientes e retorno por WhatsApp de forma espalhada, o que gera perda de tempo, esquecimentos e pouca previsibilidade.",
    solution:
      "A proposta centraliza agendamentos, clientes, serviços e comunicação em um fluxo único, permitindo acompanhar a operação sem depender de planilhas soltas.",
    features: [
      "Agendamento de serviços",
      "Gestão de clientes e atendimentos",
      "Mensagens via WhatsApp",
      "Comunicações por e-mail"
    ],
    stack: ["React", "TypeScript", "PostgreSQL", "Automations"],
    liveUrl: "https://lavahub.com.br",
    visual: "dashboard",
    featured: true
  },
  {
    id: "beforepreview",
    eyebrow: "03 · Creator tools",
    title: "BeforePreview",
    description:
      "Uma ferramenta visual para social medias planejarem conteúdos e enxergarem o feed antes da publicação.",
    problem:
      "Planejar estética, ordem de posts e consistência visual costuma exigir montagens manuais e várias idas e voltas.",
    solution:
      "Criei uma interface focada em visualização rápida, organização de conteúdo e tomada de decisão antes de publicar.",
    features: [
      "Preview visual do feed",
      "Organização por arrastar e soltar",
      "Planejamento mobile-first",
      "Fluxo pensado para social media"
    ],
    stack: ["React", "TypeScript", "UI/UX", "Responsive"],
    visual: "grid",
    featured: true
  },
  {
    id: "meu-influ-site",
    eyebrow: "04 · Site institucional",
    title: "Meu Influ",
    description:
      "Site institucional da agência de influenciadores, criado para posicionar a marca e facilitar a entrada de criadores e parceiros.",
    problem:
      "A agência precisava apresentar serviços, autoridade e proposta de valor de forma clara para públicos diferentes.",
    solution:
      "Estruturei uma presença digital objetiva, com páginas de conversão e comunicação alinhada ao posicionamento da agência.",
    features: [
      "Apresentação institucional",
      "Captação de influenciadores",
      "Contato para marcas",
      "Experiência responsiva"
    ],
    stack: ["React", "TypeScript", "SEO", "Responsive"],
    liveUrl: "https://meuinflu.com.br",
    visual: "website",
    featured: true
  },
  {
    id: "solar-express-site",
    eyebrow: "05 · Site comercial",
    title: "Solar Express — Site",
    description:
      "Presença digital comercial pensada para explicar serviços, gerar confiança e transformar visitas em oportunidades.",
    problem:
      "Organizar a proposta comercial da empresa em uma experiência clara, rápida e preparada para captação.",
    solution:
      "Desenvolvimento de uma página comercial com arquitetura de informação, prova de valor e chamadas para ação ao longo da jornada.",
    features: [
      "Landing pages de conversão",
      "Apresentação de serviços",
      "Captação de contatos",
      "Design responsivo"
    ],
    stack: ["React", "TypeScript", "Landing Page", "SEO"],
    visual: "website"
  },
  {
    id: "solar-express-crm",
    eyebrow: "06 · Sistema interno",
    title: "Solar Express — CRM",
    description:
      "Sistema interno para centralizar o acompanhamento comercial e reduzir informação espalhada entre diferentes canais.",
    problem:
      "Quando contatos, etapas e atividades ficam fragmentados, a equipe perde contexto e oportunidades ficam mais difíceis de acompanhar.",
    solution:
      "Estruturei um CRM com visão de pipeline, cadastro de contatos, andamento e histórico do relacionamento.",
    features: [
      "Pipeline comercial",
      "Cadastro de contatos",
      "Histórico de atividades",
      "Acompanhamento por etapas"
    ],
    stack: ["React", "TypeScript", "Database", "CRM"],
    visual: "dashboard"
  },
  {
    id: "meu-influ-crm",
    eyebrow: "07 · CRM + automação",
    title: "Meu Influ — CRM interno",
    description:
      "CRM interno da agência para acompanhar contatos, negociações e conversas com mais contexto operacional.",
    problem:
      "Uma agência lida com muitos criadores, marcas, campanhas e conversas simultâneas — informação dispersa vira gargalo rapidamente.",
    solution:
      "A centralização do relacionamento permite acompanhar contatos e evoluções, incluindo integrações com fluxos de WhatsApp.",
    features: [
      "Acompanhamento de contatos",
      "Visão comercial por etapas",
      "Contexto de conversas",
      "Integração com WhatsApp"
    ],
    stack: ["React", "TypeScript", "PostgreSQL", "WhatsApp"],
    visual: "dashboard"
  },
  {
    id: "camilla-rocha-form",
    eyebrow: "08 · Formulário + dados",
    title: "Camilla Rocha — Formulário inteligente",
    description:
      "Fluxo de captação criado para organizar informações de leads de forma simples para quem preenche e útil para quem atende.",
    problem:
      "Formulários genéricos coletam dados, mas nem sempre entregam informação pronta para operação e acompanhamento.",
    solution:
      "Montei um formulário com experiência personalizada e integração com planilha, permitindo organizar os dados automaticamente.",
    features: [
      "Formulário responsivo",
      "Validação de campos",
      "Integração com planilha",
      "Dados prontos para atendimento"
    ],
    stack: ["React", "Forms", "Google Sheets", "Automation"],
    visual: "form"
  }
];
