// Gerado a partir do Behance (behance.net/anartep). Imagens em public/projects/<id>/.
import type { T } from './i18n-types';

export type Category = 'covers' | 'maps' | 'editorial' | 'personal' | 'posters';

export interface ProjectImage { file: string; w: number; h: number }
export interface Project {
  id: string;
  slug: string;
  title: string | T;
  client?: string;
  category: Category;
  behance: string;
  cover: { w: number; h: number };
  images: ProjectImage[];
}

export const categories: { id: Category | 'all'; label: T }[] = [
  { id: 'all', label: { pt: 'Todos', en: 'All' } },
  { id: 'covers', label: { pt: 'Capas de livros', en: 'Book covers' } },
  { id: 'maps', label: { pt: 'Mapas ilustrados', en: 'Illustrated maps' } },
  { id: 'editorial', label: { pt: 'Editorial', en: 'Editorial' } },
  { id: 'personal', label: { pt: 'Personagens & autorais', en: 'Characters & personal' } },
  { id: 'posters', label: { pt: 'Pôsteres', en: 'Posters' } },
];

export const projects: Project[] = [
  { id: '255230949', slug: 'o-inverno-do-seu-coracao', title: 'O inverno do seu coração', client: 'Thomas Nelson Brasil', category: 'covers', behance: 'https://www.behance.net/gallery/255230949/O-inverno-do-seu-coracao-Thomas-Nelson-Brasil', cover: { w: 808, h: 632 }, images: [{ file: 'd29cdc', w: 1400, h: 1050 }, { file: '1afec5', w: 1400, h: 797 }, { file: '574aa6', w: 1400, h: 797 }, { file: 'c70cbc', w: 1214, h: 1600 }, { file: 'fc973c', w: 1200, h: 1600 }] },
  { id: '238821811', slug: 'com-amor-atena', title: 'Com amor, Atena', client: 'NS Editora', category: 'covers', behance: 'https://www.behance.net/gallery/238821811/Com-amor-Atena-NS-Editora', cover: { w: 808, h: 632 }, images: [{ file: '95491e', w: 1097, h: 1600 }, { file: '3a641e', w: 1067, h: 1600 }, { file: 'd9a217', w: 1400, h: 797 }, { file: 'e4c008', w: 1400, h: 608 }, { file: '503c93', w: 1400, h: 797 }, { file: '1e6cc1', w: 1098, h: 1600 }] },
  { id: '253907851', slug: 'ah-se-ela-soubesse', title: 'Ah, se ela soubesse', client: 'Novo Século', category: 'covers', behance: 'https://www.behance.net/gallery/253907851/ASES-NOVO-SECULO', cover: { w: 808, h: 632 }, images: [{ file: '97163d', w: 1400, h: 797 }, { file: '8cf293', w: 1400, h: 797 }, { file: '4557bf', w: 1400, h: 797 }, { file: 'acef47', w: 1400, h: 592 }, { file: 'ac4fcd', w: 1400, h: 797 }, { file: 'ac9374', w: 1400, h: 592 }] },
  { id: '209688463', slug: 'cosmos', title: { pt: 'Projeto pessoal', en: 'Personal project' }, category: 'personal', behance: 'https://www.behance.net/gallery/209688463/Personal-Project', cover: { w: 808, h: 632 }, images: [{ file: '8b09b5', w: 1400, h: 1600 }, { file: '58fd3f', w: 1400, h: 1399 }, { file: 'e85708', w: 1113, h: 1113 }, { file: '883e8b', w: 1400, h: 1401 }, { file: '66cb73', w: 1400, h: 1015 }] },
  { id: '204961729', slug: 'vinte-dias-de-chuva', title: 'Vinte Dias de Chuva', client: 'PS Editora', category: 'covers', behance: 'https://www.behance.net/gallery/204961729/Vinte-Dias-de-Chuva-PS-Editora', cover: { w: 730, h: 571 }, images: [{ file: 'c180af', w: 1400, h: 1461 }, { file: '0cdce3', w: 1400, h: 1050 }, { file: '603d44', w: 1400, h: 1050 }, { file: '0af941', w: 1400, h: 1547 }, { file: '213571', w: 1275, h: 1600 }, { file: '748647', w: 1275, h: 1600 }, { file: '784307', w: 1275, h: 1600 }, { file: '8e0415', w: 1261, h: 1600 }] },
  { id: '222899991', slug: 'laranja', title: { pt: 'Projeto pessoal', en: 'Personal project' }, category: 'personal', behance: 'https://www.behance.net/gallery/222899991/Personal-project', cover: { w: 808, h: 632 }, images: [{ file: 'a1d238', w: 1290, h: 1600 }, { file: '772273', w: 1032, h: 1032 }, { file: 'b3ecca', w: 984, h: 984 }, { file: '36a490', w: 1040, h: 1040 }, { file: '7e6d88', w: 1290, h: 1600 }, { file: 'e04a32', w: 1400, h: 1218 }, { file: '530e9d', w: 1290, h: 1600 }] },
  { id: '170680295', slug: 'para-amelia-com-amor', title: 'Para Amélia com Amor', client: 'Ps. Edições', category: 'covers', behance: 'https://www.behance.net/gallery/170680295/Para-Amlia-com-Amor-Ps-Edicoes', cover: { w: 808, h: 632 }, images: [{ file: '4eba3a', w: 1400, h: 1120 }, { file: 'a87536', w: 1131, h: 1600 }, { file: 'b4b446', w: 1400, h: 1120 }, { file: '3fbb58', w: 1131, h: 1600 }, { file: 'd4a707', w: 1400, h: 350 }] },
  { id: '253962241', slug: 'mapa-livros-da-alice', title: { pt: 'Mapa ilustrado', en: 'Illustrated map' }, client: 'Livros da Alice', category: 'maps', behance: 'https://www.behance.net/gallery/253962241/Mapa-Ilustrado-Livros-da-Alice', cover: { w: 808, h: 632 }, images: [{ file: '57a684', w: 1400, h: 1028 }, { file: '66ec7e', w: 1400, h: 1050 }, { file: '55e9d9', w: 622, h: 623 }, { file: 'c2751f', w: 716, h: 717 }, { file: 'de2cd9', w: 782, h: 782 }] },
  { id: '214396669', slug: 'e-se-nao-fosse-um-sonho', title: 'E se não fosse um sonho?', client: 'PS. Edições', category: 'covers', behance: 'https://www.behance.net/gallery/214396669/E-se-nao-fosse-um-sonho-PS-Edicoes', cover: { w: 808, h: 632 }, images: [{ file: '146af0', w: 1400, h: 1058 }, { file: '1ae941', w: 1077, h: 1600 }, { file: 'bda238', w: 1077, h: 1600 }, { file: '661cc7', w: 1400, h: 1058 }, { file: 'd8e59b', w: 1077, h: 1600 }] },
  { id: '204978631', slug: 'tempo-abstrato', title: 'Tempo Abstrato', client: 'Editora SeLiga', category: 'editorial', behance: 'https://www.behance.net/gallery/204978631/Tempo-Abstrato-Editora-SeLiga', cover: { w: 808, h: 632 }, images: [{ file: 'cada1b', w: 1242, h: 1600 }, { file: '52611d', w: 1233, h: 1600 }, { file: '3d476e', w: 1225, h: 1600 }, { file: '922650', w: 1200, h: 1600 }, { file: 'c542f9', w: 1400, h: 1205 }, { file: '33122f', w: 1400, h: 1050 }, { file: '1aa0b4', w: 1202, h: 1600 }] },
  { id: '171652435', slug: 'gig-poster-journey', title: 'Gig Pôster — Journey', category: 'posters', behance: 'https://www.behance.net/gallery/171652435/Gig-Poster-Journey', cover: { w: 808, h: 632 }, images: [{ file: 'e18ee7', w: 1097, h: 1600 }, { file: '7248ad', w: 1097, h: 1600 }, { file: '97fac4', w: 1097, h: 1600 }, { file: 'b12d46', w: 1097, h: 1600 }] },
  { id: '202119181', slug: 'carnaval', title: { pt: 'Projeto pessoal', en: 'Personal project' }, category: 'personal', behance: 'https://www.behance.net/gallery/202119181/Personal-project', cover: { w: 808, h: 632 }, images: [{ file: 'f421fd', w: 1400, h: 1543 }, { file: '9dd01a', w: 1400, h: 1543 }, { file: '65bd30', w: 914, h: 928 }, { file: 'f527ea', w: 938, h: 832 }, { file: 'e4a4cb', w: 1036, h: 996 }, { file: 'ae899a', w: 1400, h: 1265 }, { file: 'b3de51', w: 1400, h: 1543 }] },
  { id: '188159363', slug: 'lucy-e-snow', title: 'Lucy e Snow — Jogos Vorazes', category: 'personal', behance: 'https://www.behance.net/gallery/188159363/Lucy-e-Snow-Jogos-Vorazes', cover: { w: 695, h: 544 }, images: [{ file: '711d31', w: 1129, h: 1600 }, { file: '758853', w: 1400, h: 1050 }, { file: '8e8825', w: 1400, h: 1336 }, { file: '348a67', w: 1400, h: 1336 }, { file: 'db42f3', w: 1400, h: 1336 }, { file: '36abbe', w: 1400, h: 1336 }, { file: 'de30de', w: 1316, h: 1600 }, { file: 'c1442c', w: 1400, h: 650 }] },
  { id: '165376087', slug: 'wandinha', title: { pt: 'Ilustração Wandinha', en: 'Wednesday illustration' }, category: 'personal', behance: 'https://www.behance.net/gallery/165376087/Ilustracao-Wandinha', cover: { w: 808, h: 632 }, images: [{ file: '6428e9', w: 1400, h: 1400 }, { file: '543d8c', w: 1400, h: 1400 }, { file: 'ac0a8e', w: 1400, h: 1050 }] },
  { id: '177006863', slug: 'tudo-o-que-dizemos-no-silencio', title: 'Tudo o Que Dizemos no Silêncio', client: 'Qualis Editora', category: 'covers', behance: 'https://www.behance.net/gallery/177006863/Tudo-o-Que-Dizemos-no-Silencio', cover: { w: 808, h: 632 }, images: [{ file: 'ef7f34', w: 1249, h: 1600 }, { file: '90e7b2', w: 1400, h: 1050 }, { file: '1c953f', w: 1131, h: 1600 }, { file: 'a628a4', w: 1131, h: 1600 }, { file: 'ba9d88', w: 1131, h: 1600 }, { file: '839940', w: 1131, h: 1600 }, { file: 'af4073', w: 1400, h: 935 }] },
  { id: '170254863', slug: 'mapa-em-todas-as-gotas-de-chuva', title: { pt: 'Mapa — Em todas as gotas de chuva', en: 'Map — Em todas as gotas de chuva' }, category: 'maps', behance: 'https://www.behance.net/gallery/170254863/Mapa-Em-todas-as-gotas-de-chuv', cover: { w: 808, h: 632 }, images: [{ file: '0154af', w: 1162, h: 1600 }, { file: 'a9fc83', w: 1131, h: 1600 }, { file: 'b259ac', w: 1400, h: 1050 }, { file: '7ca6f1', w: 1400, h: 1050 }] },
  { id: '173605559', slug: 'gig-posters-2nd-edition', title: 'GIG Posters — 2nd Edition', client: 'Criativo!', category: 'posters', behance: 'https://www.behance.net/gallery/173605559/GIG-Posters-2nd-Edition', cover: { w: 808, h: 632 }, images: [{ file: 'fbd9b5', w: 1400, h: 788 }, { file: 'ca40ce', w: 1400, h: 788 }, { file: '3d8d71', w: 1400, h: 788 }, { file: '9aed61', w: 1400, h: 788 }, { file: '7a4e0c', w: 1400, h: 788 }, { file: '3af466', w: 1400, h: 788 }, { file: 'c31ebb', w: 1400, h: 788 }, { file: '6b051d', w: 1400, h: 788 }, { file: '1ad585', w: 1400, h: 788 }, { file: '787509', w: 1400, h: 788 }, { file: 'd6a4e6', w: 1400, h: 788 }, { file: '2ee7b2', w: 1400, h: 788 }] },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const projectImg = (p: Project, file: string) => `${import.meta.env.BASE_URL}projects/${p.id}/${file}.webp`;
