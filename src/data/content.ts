export type Lang = 'pt' | 'en';
export type T<V = string> = Record<Lang, V>;

export interface Project {
  slug: string;
  title: string;
  category: T;
  client?: string;
  image: string;
}

export interface ProcessStep {
  number: number;
  title: T;
  description: T;
}

export interface FaqItem {
  question: T;
  answer: T;
}

export interface ServiceBlock {
  title: T;
  description: T;
  icon: string;
}

export interface ExperienceItem {
  company: string;
  location: string;
}

export const content = {
  nav: {
    links: [
      { id: 'works', label: { pt: 'Trabalhos', en: 'Works' } },
      { id: 'services', label: { pt: 'Serviços', en: 'Services' } },
      { id: 'about', label: { pt: 'Sobre', en: 'About' } },
      { id: 'process', label: { pt: 'Processo', en: 'Process' } },
      { id: 'faq', label: { pt: 'FAQ', en: 'FAQ' } },
      { id: 'contact', label: { pt: 'Contato', en: 'Contact' } },
    ] as { id: string; label: T }[],
  },

  hero: {
    name: 'Ana Paula',
    brandName: 'Anarte',
    title: {
      pt: 'Ilustradora para capas, personagens e projetos editoriais',
      en: 'Illustrator for book covers, characters and editorial projects',
    } as T,
    micro: {
      pt: 'Disponível para freelance e oportunidades remotas',
      en: 'Available for freelance and remote opportunities',
    } as T,
    ctaPrimary: {
      pt: 'Solicitar orçamento',
      en: 'Commission me',
    } as T,
    ctaSecondary: {
      pt: 'Ver trabalhos',
      en: 'View works',
    } as T,
  },

  social: {
    whatsapp: '#',
    behance: 'https://www.behance.net/anartep',
    linkedin: 'https://linkedin.com/in/anarte-p',
    instagram: 'https://instagram.com/anarte.p',
  },

  works: {
    sectionTitle: {
      pt: 'Trabalhos em destaque',
      en: 'Selected works',
    } as T,
    sectionDesc: {
      pt: 'Uma seleção de capas, personagens e ilustrações autorais',
      en: 'A curated selection of covers, character pieces and personal illustrations',
    } as T,
    projects: [
      {
        slug: 'para-amelia-com-amor',
        title: 'Para Amélia com Amor',
        category: { pt: 'Capa de livro', en: 'Book cover' },
        client: 'Ps. Edições',
        image: 'assets/works/para-amelia-com-amor.jpg',
      },
      {
        slug: 'vinte-dias-de-chuva',
        title: 'Vinte Dias de Chuva',
        category: { pt: 'Capa de livro', en: 'Book cover' },
        client: 'PS Glow',
        image: 'assets/works/vinte-dias-de-chuva.jpeg',
      },
      {
        slug: 'e-se-nao-fosse-um-sonho',
        title: 'E se não fosse um sonho?',
        category: { pt: 'Capa de livro', en: 'Book cover' },
        client: 'Ps. Edições',
        image: 'assets/works/e-se-nao-fosse-um-sonho.jpg',
      },
      {
        slug: 'com-amor-atena',
        title: 'Com amor, Atena',
        category: { pt: 'Capa de livro', en: 'Book cover' },
        client: 'Editora ZNS',
        image: 'assets/works/com-amor-atena.png',
      },
      {
        slug: 'tempo-abstrato',
        title: 'Tempo Abstrato',
        category: { pt: 'Ilustração editorial', en: 'Editorial illustration' },
        image: 'assets/works/tempo-abstrato.png',
      },
      {
        slug: 'ilustracao-elfa',
        title: 'Character Design — Elfa',
        category: { pt: 'Ilustração de personagem', en: 'Character illustration' },
        image: 'assets/works/ilustracao-wandinha.png',
      },
    ] as Project[],
  },

  services: {
    sectionTitle: {
      pt: 'O que eu ilustro',
      en: 'What I illustrate',
    } as T,
    blocks: [
      {
        title: { pt: 'Capas de livros', en: 'Book Covers' },
        description: {
          pt: 'Capas que contam a história antes da primeira página',
          en: 'Covers that tell the story before the first page',
        },
        icon: 'book',
      },
      {
        title: { pt: 'Ilustração de personagens', en: 'Character Illustration' },
        description: {
          pt: 'Personagens com personalidade, expressão e presença',
          en: 'Characters with personality, expression and presence',
        },
        icon: 'character',
      },
      {
        title: { pt: 'Ilustração editorial', en: 'Editorial Illustration' },
        description: {
          pt: 'Ilustrações para publicações, artigos e projetos editoriais',
          en: 'Illustrations for publications, articles and editorial projects',
        },
        icon: 'editorial',
      },
      {
        title: { pt: 'Projetos personalizados', en: 'Custom Projects' },
        description: {
          pt: 'Projetos sob medida para sua ideia, do conceito à entrega',
          en: 'Tailored projects for your idea, from concept to delivery',
        },
        icon: 'custom',
      },
    ] as ServiceBlock[],
  },

  about: {
    sectionTitle: {
      pt: 'Sobre',
      en: 'About',
    } as T,
    name: 'Ana Paula',
    role: {
      pt: 'Ilustradora',
      en: 'Illustrator',
    } as T,
    location: 'Maranhão, Brazil',
    status: {
      pt: 'Disponível para freelance',
      en: 'Available for freelance',
    } as T,
    statusSecondary: {
      pt: 'Aberta a oportunidades remotas',
      en: 'Open to remote opportunities',
    } as T,
    bio: {
      pt: 'Ilustradora digital especializada em capas de livros, personagens e projetos editoriais. Trabalho com editoras independentes e autores para transformar narrativas em arte visual com identidade autoral e acabamento premium.',
      en: 'Digital illustrator specialized in book covers, characters and editorial projects. I work with independent publishers and authors to transform narratives into visual art with authorial identity and premium finish.',
    } as T,
    chips: [
      { pt: 'Capas de livros', en: 'Book covers' },
      { pt: 'Character art', en: 'Character art' },
      { pt: 'Editorial', en: 'Editorial' },
      { pt: 'Freelance', en: 'Freelance' },
      { pt: 'Remoto', en: 'Remote' },
    ] as T[],
  },

  experience: {
    sectionTitle: {
      pt: 'Experiência',
      en: 'Experience',
    } as T,
    items: [
      { company: 'Grupo Novo Século', location: 'Brazil' },
      { company: 'Editora Vênus', location: 'Salvador, Brazil' },
      { company: 'Editora PS. Dois Pontos', location: 'Brazil' },
    ] as ExperienceItem[],
  },

  process: {
    sectionTitle: {
      pt: 'Como funciona',
      en: 'How it works',
    } as T,
    steps: [
      {
        number: 1,
        title: { pt: 'Contato', en: 'Contact' },
        description: {
          pt: 'Você me conta sua ideia e o que precisa',
          en: 'You tell me about your idea and what you need',
        },
      },
      {
        number: 2,
        title: { pt: 'Briefing', en: 'Brief' },
        description: {
          pt: 'Alinhamos referências, estilo e expectativas',
          en: 'We align references, style and expectations',
        },
      },
      {
        number: 3,
        title: { pt: 'Alinhamento e orçamento', en: 'Quote & alignment' },
        description: {
          pt: 'Definimos escopo, prazo e valor',
          en: 'We define scope, timeline and pricing',
        },
      },
      {
        number: 4,
        title: { pt: 'Produção', en: 'Production' },
        description: {
          pt: 'Sketches, refinamento e arte final',
          en: 'Sketches, refinement and final artwork',
        },
      },
      {
        number: 5,
        title: { pt: 'Revisão', en: 'Review' },
        description: {
          pt: 'Ajustes dentro do escopo combinado',
          en: 'Adjustments within the agreed scope',
        },
      },
      {
        number: 6,
        title: { pt: 'Entrega', en: 'Delivery' },
        description: {
          pt: 'Arquivos finais em alta resolução',
          en: 'Final files in high resolution',
        },
      },
    ] as ProcessStep[],
  },

  faq: {
    sectionTitle: {
      pt: 'Perguntas frequentes',
      en: 'Frequently asked questions',
    } as T,
    termsIntro: {
      pt: 'Antes de solicitar um orçamento, leia as informações abaixo.',
      en: 'Before requesting a quote, please read the information below.',
    } as T,
    items: [
      {
        question: {
          pt: 'Como peço um orçamento?',
          en: 'How do I request a quote?',
        },
        answer: {
          pt: 'Entre em contato pelo WhatsApp ou e-mail com uma descrição do projeto, referências visuais e prazo desejado. Respondo em até 48h.',
          en: 'Reach out via WhatsApp or email with a project description, visual references and desired timeline. I respond within 48h.',
        },
      },
      {
        question: {
          pt: 'O que devo enviar de referência?',
          en: 'What should I send as reference?',
        },
        answer: {
          pt: 'Imagens de estilo que você gosta, descrição dos personagens ou cena, paleta de cores desejada, e qualquer material relevante do projeto.',
          en: 'Style images you like, character or scene description, desired color palette, and any relevant project material.',
        },
      },
      {
        question: {
          pt: 'Qual o prazo médio?',
          en: 'What is the average timeline?',
        },
        answer: {
          pt: 'Depende da complexidade. Uma capa simples leva de 2 a 3 semanas. Projetos maiores são combinados individualmente.',
          en: 'It depends on complexity. A simple cover takes 2 to 3 weeks. Larger projects are discussed individually.',
        },
      },
      {
        question: {
          pt: 'Quantas revisões estão inclusas?',
          en: 'How many revisions are included?',
        },
        answer: {
          pt: 'Cada projeto inclui até 2 rodadas de revisão dentro do escopo combinado. Alterações fora do escopo são orçadas separadamente.',
          en: 'Each project includes up to 2 revision rounds within the agreed scope. Out-of-scope changes are quoted separately.',
        },
      },
      {
        question: {
          pt: 'Como funciona o pagamento?',
          en: 'How does payment work?',
        },
        answer: {
          pt: '50% na aprovação do orçamento e 50% na entrega final. Aceito Pix e transferência bancária.',
          en: '50% upon quote approval and 50% upon final delivery. I accept Pix and bank transfer.',
        },
      },
      {
        question: {
          pt: 'Posso usar a arte comercialmente?',
          en: 'Can I use the art commercially?',
        },
        answer: {
          pt: 'Sim, os direitos de uso comercial são incluídos no valor acordado. Os direitos autorais permanecem com a artista.',
          en: 'Yes, commercial usage rights are included in the agreed price. Copyright remains with the artist.',
        },
      },
      {
        question: {
          pt: 'O que você faz?',
          en: 'What do you do?',
        },
        answer: {
          pt: 'Ilustração digital para capas de livros, personagens, projetos editoriais e arte personalizada.',
          en: 'Digital illustration for book covers, characters, editorial projects and custom art.',
        },
      },
      {
        question: {
          pt: 'O que você não faz?',
          en: 'What don\'t you do?',
        },
        answer: {
          pt: 'Não trabalho com animação, modelagem 3D, design gráfico (logotipos, identidade visual) ou ilustração vetorial flat.',
          en: 'I don\'t work with animation, 3D modeling, graphic design (logos, brand identity) or flat vector illustration.',
        },
      },
    ] as FaqItem[],
  },

  contact: {
    headline: {
      pt: 'Vamos criar algo juntos',
      en: 'Let\'s make art together',
    } as T,
    cta: {
      pt: 'Solicitar orçamento',
      en: 'Commission me',
    } as T,
  },
};
