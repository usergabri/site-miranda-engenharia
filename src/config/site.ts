/**
 * Dados da empresa — edite aqui e republique o site.
 * Campos com `null` ficam ocultos no site até serem preenchidos.
 */
export const site = {
  name: 'Miranda Engenharia',
  engineer: 'Matheus Miranda',
  title: 'Engenheiro Mecânico',
  crea: '216375/D',
  url: 'https://engmiranda.com.br',

  city: 'Nova Esperança',
  state: 'PR',
  coverage: 'Todo o Brasil',
  /** Coordenadas da sede (pino no mapa e dados estruturados). */
  geo: { lat: -23.1819, lon: -52.2033 },

  whatsapp: {
    /** Somente dígitos, com DDI 55. */
    number: '5544997127007',
    display: '(44) 99712-7007',
    defaultMessage: 'Olá, Matheus! Vim pelo site e gostaria de um orçamento.',
  },

  /** Prazo de resposta mostrado no contato. `null` = oculto. Confirme antes de publicar. */
  responseTime: 'Retorno no mesmo dia útil' as string | null,

  // Preencher depois ↓ (ex.: 'contato@engmiranda.com.br')
  email: null as string | null,
  /** Ex.: 'https://instagram.com/mirandaengenharia' */
  instagram: null as string | null,
  /** Ex.: '00.000.000/0001-00' */
  cnpj: null as string | null,
  /** ID do Google Analytics 4 (ex.: 'G-XXXXXXXXXX'). `null` = desligado. */
  gaId: null as string | null,

  /** Siglas dos estados destacados no mapa (ids `BR-XX` do brazil.svg). */
  statesServed: ['PR', 'MG', 'SP', 'SC', 'MS'],
} as const;

export function whatsappLink(message: string = site.whatsapp.defaultMessage) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function serviceMessage(service: string) {
  return `Olá, Matheus! Vim pelo site e gostaria de um orçamento para: ${service}.`;
}
