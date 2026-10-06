import type { T } from './i18n-types';
import inverno from '../assets/works/o-inverno-do-seu-coracao.webp';
import vinteDias from '../assets/works/vinte-dias-de-chuva.webp';
import casalLaranja from '../assets/works/casal-laranja.webp';
import tempoAbstrato from '../assets/works/tempo-abstrato.webp';
import comAmorAtena from '../assets/works/com-amor-atena.webp';
import leitoraRuiva from '../assets/works/leitora-ruiva.webp';

export const contact = {
  name: 'Ana Paula Silva',
  email: 'anapaulapovao@gmail.com',
  phoneDisplay: { pt: '(99) 98544-0904', en: '+55 (99) 98544-0904' } as T,
  whatsapp: 'https://wa.me/5599985440904',
  whatsappMessage: {
    pt: 'Olá, Ana! Vim pelo seu portfólio e gostaria de conversar sobre um projeto.',
    en: 'Hi Ana! I found your portfolio and would love to talk about a project.',
  } as T,
  instagram: 'https://instagram.com/anarte.p',
  linkedin: 'https://linkedin.com/in/anarte-p',
  behance: 'https://www.behance.net/anartep',
};

export const whatsappLink = (msg: string) => `${contact.whatsapp}?text=${encodeURIComponent(msg)}`;

export const nav: { id: string; label: T }[] = [
  { id: 'sobre', label: { pt: 'Sobre', en: 'About' } },
  { id: 'editoras', label: { pt: 'Editoras', en: 'Publishers' } },
  { id: 'trabalhos', label: { pt: 'Trabalhos', en: 'Works' } },
  { id: 'contato', label: { pt: 'Contato', en: 'Contact' } },
];

export const ui = {
  tagline: {
    pt: 'Ilustradora digital especializada em capas de livros, personagens e projetos editoriais.',
    en: 'Digital illustrator specialized in book covers, characters and editorial projects.',
  } as T,
  available: { pt: 'Disponível para novos projetos', en: 'Available for new projects' } as T,
  faq: { pt: 'FAQ', en: 'FAQ' } as T,
  faqLong: { pt: 'Dúvidas frequentes', en: 'Frequently asked' } as T,
  menu: { pt: 'Menu', en: 'Menu' } as T,
  close: { pt: 'Fechar', en: 'Close' } as T,
  quote: { pt: 'Orçamento', en: 'Get a quote' } as T,
  quoteLong: { pt: 'Solicitar orçamento', en: 'Request a quote' } as T,
  themeToLight: { pt: 'Ativar tema dia', en: 'Switch to day theme' } as T,
  themeToDark: { pt: 'Ativar tema noite', en: 'Switch to night theme' } as T,
  language: { pt: 'Idioma', en: 'Language' } as T,
  skip: { pt: 'Pular para o conteúdo', en: 'Skip to content' } as T,
  heroAlt: {
    pt: 'Ilustração de Ana Paula: mulher de cabelos cacheados azuis e pele magenta num céu cósmico estrelado',
    en: 'Illustration by Ana Paula: a woman with curly blue hair and magenta skin in a starry cosmic sky',
  } as T,
  heroCaption: { pt: 'Ilustração autoral', en: 'Personal illustration' } as T,
  scroll: { pt: 'role', en: 'scroll' } as T,
  starsHint: { pt: 'clique no céu ✦', en: 'click the sky ✦' } as T,
};

export const marquee: { label: T; category: string }[] = [
  { label: { pt: 'Capas de livros', en: 'Book covers' }, category: 'covers' },
  { label: { pt: 'Mapas ilustrados', en: 'Illustrated maps' }, category: 'maps' },
  { label: { pt: 'Ilustrações internas', en: 'Interior illustrations' }, category: 'editorial' },
  { label: { pt: 'Personagens', en: 'Characters' }, category: 'personal' },
];

export const about = {
  label: { pt: 'Sobre', en: 'About' } as T,
  role: { pt: 'Ilustradora · Maranhão, Brasil', en: 'Illustrator · Maranhão, Brazil' } as T,
  bio: [
    {
      pt: 'Ilustradora digital, autodidata, maranhense, especializada em capas de livros, personagens e projetos editoriais. Trabalho com editoras independentes e autores para transformar narrativas em arte visual com identidade autoral e acabamento premium.',
      en: 'Self-taught digital illustrator from Maranhão, Brazil, specialized in book covers, characters and editorial projects. I work with independent publishers and authors to turn stories into visual art with an authorial voice and a premium finish.',
    },
    {
      pt: 'Se você busca uma artista criativa para projetos de ilustração ou editoriais, estou disponível para colaborações e novos desafios. Vamos conversar!',
      en: "If you're looking for a creative artist for illustration or editorial projects, I'm open to collaborations and new challenges. Let's talk!",
    },
  ] as T[],
  ring: {
    pt: 'ilustradora digital ✦ autodidata ✦ maranhense ✦ ',
    en: 'digital illustrator ✦ self-taught ✦ from maranhão ✦ ',
  } as T,
  ctaContact: { pt: 'Entre em contato', en: 'Get in touch' } as T,
  ctaWorks: { pt: 'Ver trabalhos', en: 'See works' } as T,
  portraitAlt: {
    pt: 'Autorretrato ilustrado de Ana Paula, de cabelo cacheado volumoso, sobre fundo amarelo xadrez',
    en: 'Illustrated self-portrait of Ana Paula with voluminous curly hair on a yellow checkered background',
  } as T,
};

export const publishers = {
  label: { pt: 'Parcerias', en: 'Partners' } as T,
  title: { pt: 'Editoras com quem já trabalhei', en: "Publishers I've worked with" } as T,
  hint: { pt: 'passe o mouse (ou toque) nas moedas', en: 'hover (or tap) the coins' } as T,
  items: [
    { id: 'ps', name: 'PS Editora · PS. Edições' },
    { id: 'qualis', name: 'Qualis Editora' },
    { id: 'thomasnelson', name: 'Thomas Nelson Brasil' },
    { id: 'novoseculo', name: 'Grupo Novo Século' },
    { id: 'venus', name: 'Editora Vênus' },
  ],
};

export interface Work {
  slug: string;
  image: string;
  title: T;
  meta: T;
  focus: string; // object-position
  project?: string; // slug in projects.ts
}

export const works = {
  label: { pt: 'Portfólio', en: 'Portfolio' } as T,
  title: { pt: 'Trabalhos em destaque', en: 'Selected works' } as T,
  hint: { pt: 'arraste para girar · clique para abrir', en: 'drag to spin · click to open' } as T,
  seeAll: { pt: 'Ver todos os projetos', en: 'See all projects' } as T,
  prev: { pt: 'Trabalho anterior', en: 'Previous work' } as T,
  next: { pt: 'Próximo trabalho', en: 'Next work' } as T,
  open: { pt: 'Abrir projeto', en: 'Open project' } as T,
  items: [
    {
      slug: 'o-inverno-do-seu-coracao', image: inverno, focus: '50% 50%', project: 'o-inverno-do-seu-coracao',
      title: { pt: 'O inverno do seu coração', en: 'O inverno do seu coração' },
      meta: { pt: 'Capa · Thomas Nelson Brasil', en: 'Book cover · Thomas Nelson Brasil' },
    },
    {
      slug: 'vinte-dias-de-chuva', image: vinteDias, focus: '50% 50%', project: 'vinte-dias-de-chuva',
      title: { pt: 'Vinte Dias de Chuva', en: 'Vinte Dias de Chuva' },
      meta: { pt: 'Capa · PS Editora', en: 'Book cover · PS Editora' },
    },
    {
      slug: 'com-amor-atena', image: comAmorAtena, focus: '76% 50%', project: 'com-amor-atena',
      title: { pt: 'Com amor, Atena', en: 'Com amor, Atena' },
      meta: { pt: 'Capa · NS Editora', en: 'Book cover · NS Editora' },
    },
    {
      slug: 'casal-laranja', image: casalLaranja, focus: '50% 40%', project: 'laranja',
      title: { pt: 'Projeto pessoal', en: 'Personal project' },
      meta: { pt: 'Ilustração autoral', en: 'Personal illustration' },
    },
    {
      slug: 'leitora-ruiva', image: leitoraRuiva, focus: '50% 30%',
      title: { pt: 'Ilustração autoral', en: 'Personal illustration' },
      meta: { pt: 'Personagem', en: 'Character' },
    },
    {
      slug: 'tempo-abstrato', image: tempoAbstrato, focus: '50% 60%', project: 'tempo-abstrato',
      title: { pt: 'Tempo Abstrato', en: 'Tempo Abstrato' },
      meta: { pt: 'Ilustração editorial · Editora SeLiga', en: 'Editorial illustration · Editora SeLiga' },
    },
  ] as Work[],
};

export const allProjects = {
  title: { pt: 'Todos os projetos', en: 'All projects' } as T,
  subtitle: { pt: 'Capas, mapas, personagens e pôsteres — direto do meu Behance.', en: 'Covers, maps, characters and posters — straight from my Behance.' } as T,
  back: { pt: 'Todos os projetos', en: 'All projects' } as T,
  behance: { pt: 'Ver no Behance', en: 'View on Behance' } as T,
  view: { pt: 'ver projeto', en: 'view project' } as T,
  images: { pt: 'imagens', en: 'images' } as T,
  prevProject: { pt: 'Projeto anterior', en: 'Previous project' } as T,
  nextProject: { pt: 'Próximo projeto', en: 'Next project' } as T,
  zoomHint: { pt: 'clique na imagem para ampliar', en: 'click an image to zoom' } as T,
  empty: { pt: 'Nada por aqui ainda.', en: 'Nothing here yet.' } as T,
};

export const contactSection = {
  label: { pt: 'Contato', en: 'Contact' } as T,
  headline: { pt: 'Vamos criar algo juntos?', en: "Shall we make something together?" } as T,
  phone: { pt: 'Telefone', en: 'Phone' } as T,
  email: { pt: 'E-mail', en: 'E-mail' } as T,
  cta: { pt: 'Entre em contato', en: 'Get in touch' } as T,
  copied: { pt: 'E-mail copiado ✦', en: 'E-mail copied ✦' } as T,
  copyHint: { pt: 'clique para copiar', en: 'click to copy' } as T,
  stampHint: { pt: 'carimbe aqui', en: 'stamp it' } as T,
  rights: { pt: 'Todos os direitos reservados.', en: 'All rights reserved.' } as T,
  artRights: { pt: 'Ilustrações © Ana Paula Silva', en: 'Illustrations © Ana Paula Silva' } as T,
  top: { pt: 'Voltar ao topo', en: 'Back to top' } as T,
};

export interface FaqItem { q: T; a: T[] }

export const faq = {
  title: { pt: 'Perguntas frequentes', en: 'Frequently asked questions' } as T,
  status: { pt: 'responde em até 48h', en: 'replies within 48h' } as T,
  hello: [
    { pt: 'Oi! ✦ Aqui é a Ana.', en: "Hi! ✦ It's Ana here." },
    { pt: 'Separei as perguntas que eu mais recebo. Toque em uma delas:', en: 'These are the questions I get the most. Tap one:' },
  ] as T[],
  more: { pt: 'Quer perguntar outra coisa?', en: 'Want to ask something else?' } as T,
  done: {
    pt: 'Ficou alguma dúvida? Me chama que eu respondo rapidinho:',
    en: 'Still curious? Message me and I’ll get back to you soon:',
  } as T,
  restart: { pt: 'recomeçar', en: 'start over' } as T,
  typing: { pt: 'digitando', en: 'typing' } as T,
  items: [
    {
      q: { pt: 'Como peço um orçamento?', en: 'How do I request a quote?' },
      a: [
        { pt: 'Me chama no WhatsApp ou por e-mail contando sobre o projeto: o que é, referências visuais e o prazo que você imagina.', en: 'Message me on WhatsApp or by e-mail telling me about the project: what it is, visual references and the timeline you have in mind.' },
        { pt: 'Eu respondo em até 48h ✦', en: 'I reply within 48h ✦' },
      ],
    },
    {
      q: { pt: 'O que devo enviar de referência?', en: 'What should I send as reference?' },
      a: [
        { pt: 'Imagens de estilo que você gosta, descrição dos personagens ou da cena, a paleta de cores desejada e qualquer material do projeto (sinopse, briefing, medidas da capa).', en: 'Style images you like, character or scene descriptions, the colour palette you want and any project material (synopsis, brief, cover dimensions).' },
      ],
    },
    {
      q: { pt: 'Qual o prazo médio?', en: 'What is the average timeline?' },
      a: [
        { pt: 'Depende da complexidade. Uma capa costuma levar de 2 a 3 semanas.', en: 'It depends on complexity. A cover usually takes 2 to 3 weeks.' },
        { pt: 'Projetos maiores, como mapas e ilustrações internas, a gente combina individualmente.', en: 'Bigger projects, like maps and interior illustrations, we plan individually.' },
      ],
    },
    {
      q: { pt: 'Quantas revisões estão inclusas?', en: 'How many revisions are included?' },
      a: [
        { pt: 'Cada projeto inclui até 2 rodadas de revisão dentro do escopo combinado. Alterações fora do escopo são orçadas à parte.', en: 'Each project includes up to 2 revision rounds within the agreed scope. Out-of-scope changes are quoted separately.' },
      ],
    },
    {
      q: { pt: 'Como funciona o pagamento?', en: 'How does payment work?' },
      a: [
        { pt: '50% na aprovação do orçamento e 50% na entrega final. Aceito Pix e transferência bancária.', en: '50% when the quote is approved and 50% on final delivery. I accept Pix and bank transfer.' },
      ],
    },
    {
      q: { pt: 'Posso usar a arte comercialmente?', en: 'Can I use the art commercially?' },
      a: [
        { pt: 'Sim! Os direitos de uso comercial entram no valor combinado. Os direitos autorais continuam com a artista.', en: 'Yes! Commercial usage rights are included in the agreed price. Copyright stays with the artist.' },
      ],
    },
    {
      q: { pt: 'O que você faz?', en: 'What do you do?' },
      a: [
        { pt: 'Capas de livros, mapas ilustrados, ilustrações internas, personagens e arte personalizada.', en: 'Book covers, illustrated maps, interior illustrations, characters and custom art.' },
      ],
    },
    {
      q: { pt: 'O que você não faz?', en: "What don't you do?" },
      a: [
        { pt: 'Não trabalho com animação, modelagem 3D, design gráfico (logotipos, identidade visual) nem ilustração vetorial flat.', en: "I don't do animation, 3D modelling, graphic design (logos, brand identity) or flat vector illustration." },
      ],
    },
  ] as FaqItem[],
};

export const bookstore = {
  label: { pt: 'Nas livrarias', en: 'In bookstores' } as T,
  items: [
    { id: 'desafiando', title: 'Desafiando as pistas com você' },
    { id: 'thomas-nelson', title: 'O inverno do seu coração', project: 'o-inverno-do-seu-coracao' },
    { id: 'ouvi-dizer', title: 'Ouvi dizer que era você' },
    { id: 'atena', title: 'Com amor, Atena', project: 'com-amor-atena' },
  ] as { id: string; title: string; project?: string }[],
};
