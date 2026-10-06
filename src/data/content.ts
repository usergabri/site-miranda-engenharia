/* Textos do site. A voz é a do engenheiro Matheus Miranda, em primeira pessoa. */

/** Números da placa de identificação. `featured` aparecem em destaque. */
export const record = {
  featured: [
    { value: '+1.000', label: 'Laudos emitidos' },
    { value: '+300', label: 'ARTs emitidas' },
    { value: '450', label: 'Vasos de pressão em um único contrato' },
  ],
  supporting: ['+20 clientes', '+10 cidades', '5 estados', '100% dos clientes satisfeitos'],
};

export const nr13Equipments = [
  { icon: 'lucide:flame', title: 'Caldeiras' },
  { icon: 'lucide:cylinder', title: 'Vasos de pressão' },
  { icon: 'lucide:route', title: 'Tubulações' },
];

/** Escopo NR-13, agrupado como as seções de um Relatório de Inspeção. */
export const nr13Scope = [
  {
    title: 'Inspeção',
    items: [
      'Inspeção inicial, periódica e extraordinária',
      'Inventário e categorização dos equipamentos',
      'Plano de inspeção com as datas de cada equipamento',
    ],
  },
  {
    title: 'Ensaios e medições',
    items: [
      'Medição de espessura por ultrassom',
      'Calibração e teste de válvulas de segurança (PSV)',
      'Aferição de manômetros',
      'Teste hidrostático',
    ],
  },
  {
    title: 'Documentação',
    items: [
      'Elaboração e atualização do Prontuário',
      'Livro de Registro de Segurança',
      'Relatório de Inspeção com ART, assinado por Profissional Habilitado (PH)',
    ],
  },
  {
    title: 'Acompanhamento',
    items: ['Acompanhamento das pendências até a regularização completa'],
  },
];

export type Service = { icon: string; title: string; text: string };

/** Serviços complementares, em 4 grupos. */
export const serviceGroups: { title: string; text: string; items: Service[] }[] = [
  {
    title: 'Documentação e responsabilidade técnica',
    text: 'Para obras, instalações e empresas que precisam de um engenheiro responsável junto ao CREA.',
    items: [
      {
        icon: 'lucide:file-badge',
        title: 'Emissão de ART',
        text: 'Anotação de Responsabilidade Técnica para obras, serviços, laudos e instalações mecânicas.',
      },
      {
        icon: 'lucide:id-card',
        title: 'Responsável Técnico',
        text: 'Responsabilidade técnica para empresas, indústrias e prestadores de serviço.',
      },
      {
        icon: 'lucide:stamp',
        title: 'Regularização junto ao CREA',
        text: 'Regularização de instalações e equipamentos, com toda a documentação exigida.',
      },
    ],
  },
  {
    title: 'Laudos técnicos',
    text: 'Avaliação em campo, laudo assinado e ART, para comprovar segurança e conformidade.',
    items: [
      {
        icon: 'lucide:file-chart-column',
        title: 'Laudos Técnicos Mecânicos',
        text: 'Segurança, desempenho e conformidade de máquinas e equipamentos.',
      },
      {
        icon: 'lucide:construction',
        title: 'Laudo de Andaimes',
        text: 'Inspeção de andaimes para trabalho em altura com segurança.',
      },
      {
        icon: 'lucide:chef-hat',
        title: 'Laudo de Exaustão para Cozinhas',
        text: 'Sistemas de exaustão de cozinhas industriais e comerciais.',
      },
    ],
  },
  {
    title: 'Máquinas e movimentação de cargas',
    text: 'Adequação às normas regulamentadoras de segurança do trabalho.',
    items: [
      {
        icon: 'lucide:cog',
        title: 'NR-12 · Segurança em máquinas',
        text: 'Análise de risco, adequações e laudo de conformidade de máquinas e equipamentos.',
      },
      {
        icon: 'lucide:forklift',
        title: 'NR-11 · Movimentação e armazenagem',
        text: 'Empilhadeiras, pontes rolantes, talhas e elevadores de carga.',
      },
    ],
  },
  {
    title: 'Climatização',
    text: 'Ar-condicionado e renovação de ar em ambientes de uso coletivo.',
    items: [
      {
        icon: 'lucide:air-vent',
        title: 'PMOC',
        text: 'Elaboração e atualização do Plano de Manutenção, Operação e Controle.',
      },
      {
        icon: 'lucide:thermometer-snowflake',
        title: 'Projetos de Climatização',
        text: 'Projetos e adequações de sistemas de climatização e renovação de ar.',
      },
    ],
  },
];

export const services = serviceGroups.flatMap((g) => g.items);

export const process = [
  {
    title: 'Contato',
    text: 'Você me descreve o equipamento ou a demanda pelo WhatsApp. Sem burocracia.',
  },
  {
    title: 'Diagnóstico e proposta',
    text: 'Levanto o que a norma exige para o seu caso e envio um orçamento claro, com prazos.',
  },
  {
    title: 'Execução em campo',
    text: 'Vou até a sua planta para inspecionar, medir e testar, respeitando horários e o cronograma.',
  },
  {
    title: 'Documentação e ART',
    text: 'Entrego laudos, relatórios, prontuários e ART completos e organizados.',
  },
  {
    title: 'Acompanhamento',
    text: 'Acompanho cada pendência encontrada até a regularização completa dos equipamentos.',
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  full: string[];
};

export type Case = {
  id: string;
  metric: string;
  unit: string;
  title: string;
  place: string;
  scope: string;
  via?: string;
  testimonial: Testimonial;
};

/** Cases, cada um com o depoimento do cliente. O primeiro é o destaque. */
export const cases: Case[] = [
  {
    id: 'art-mecanica',
    metric: '+450',
    unit: 'vasos de pressão',
    title: 'Multinacional do setor automotivo',
    place: 'Sete Lagoas – MG',
    scope: 'Medição de espessura, aferição de válvulas e manômetros em projeto de grande volume, com cronograma cumprido.',
    via: 'Em parceria com a ART Mecânica e Automação',
    testimonial: {
      quote:
        'A Miranda Engenharia nos deu o suporte técnico necessário para atender uma demanda de grande porte com organização, responsabilidade e comprometimento.',
      name: 'Leonardo Campos',
      role: 'Sócio-proprietário',
      company: 'ART Mecânica e Automação',
      full: [
        'Somos da ART Mecânica e Automação, atuante no setor automotivo, e prestamos serviços para uma empresa multinacional. Para atender uma demanda do projeto, contratamos a Miranda Engenharia para integrar nossa equipe e realizar os serviços em aproximadamente 450 vasos de pressão.',
        'Foi um trabalho de grande volume, envolvendo a medição de espessura dos equipamentos, a aferição das válvulas e dos manômetros. Mesmo diante da quantidade de equipamentos, a execução foi organizada e acompanhada de forma profissional.',
        'Foi demonstrada capacidade de planejamento e organização para atender ao cronograma estabelecido, mantendo um bom fluxo de trabalho durante a execução. Os horários e os serviços previamente combinados foram respeitados, o que foi importante para o andamento do projeto.',
        'Outro ponto positivo foi a organização das informações e da documentação gerada durante o processo. O trabalho foi conduzido de forma estruturada, permitindo que conseguíssemos acompanhar e atender às necessidades do projeto dentro dos prazos determinados.',
        'A Miranda Engenharia nos deu o suporte técnico necessário para atender uma demanda de grande porte com organização, responsabilidade e comprometimento.',
      ],
    },
  },
  {
    id: 'biobras',
    metric: '6 equipamentos',
    unit: '5 compressores e 1 vaso de pressão',
    title: 'Biobras Biodiesel',
    place: 'Nova Esperança – PR',
    scope: 'Documentação técnica, relatório técnico (RT) e atendimento às especificações aplicáveis, entregues no prazo.',
    testimonial: {
      quote:
        'Tivemos a tranquilidade de saber o que estava sendo feito, quais informações eram necessárias e quais etapas precisavam ser concluídas.',
      name: 'Larissa Sisti Brasinha',
      role: 'Sócia-proprietária',
      company: 'Biobras Biodiesel',
      full: [
        'Contratamos a Miranda Engenharia para realizar os serviços relacionados a cinco compressores e um vaso de pressão da Biobras, incluindo a elaboração da documentação necessária, emissão da RT e atendimento às especificações técnicas aplicáveis.',
        'Durante todo o processo, tivemos um atendimento muito claro e próximo. Sempre que surgia alguma necessidade ou dúvida relacionada aos equipamentos ou à documentação, recebíamos as orientações necessárias para dar continuidade ao processo de forma adequada.',
        'Também foi demonstrado comprometimento com os horários e prazos estabelecidos. O serviço foi realizado conforme o combinado e os laudos e documentos necessários foram entregues completos dentro do prazo determinado.',
        'Além da parte técnica, considero que a organização e a facilidade de comunicação fizeram diferença durante o serviço. Tivemos a tranquilidade de saber o que estava sendo feito, quais informações eram necessárias e quais etapas precisavam ser concluídas.',
        'Ficamos satisfeitos com o atendimento e com a forma responsável e profissional como todo o serviço foi conduzido.',
      ],
    },
  },
  {
    id: 'protein-meal',
    metric: 'Digestores',
    unit: 'válvulas, manômetros e RTs',
    title: 'Protein Meal',
    place: 'Nova Esperança – PR',
    scope: 'Serviços em válvulas, aferição de manômetros, RTs e acompanhamento de todas as pendências até a solução.',
    testimonial: {
      quote:
        'Foi um trabalho que nos trouxe mais segurança e tranquilidade em relação aos nossos equipamentos e à documentação técnica.',
      name: 'Augusto Bernardes',
      role: 'Gerente Industrial',
      company: 'Protein Meal',
      full: [
        'Contratamos a Miranda Engenharia para realizar os serviços relacionados aos nossos digestores, incluindo os serviços nas válvulas, a aferição dos manômetros e a emissão das respectivas RTs e documentações técnicas.',
        'Um dos pontos que mais destacamos no trabalho foi a atenção dada às pendências encontradas durante o processo. A equipe não se limitou à execução dos serviços, mas acompanhou as necessidades identificadas e trabalhou para que todas fossem devidamente solucionadas.',
        'Também tivemos um atendimento muito organizado e profissional, com os serviços realizados conforme o que havia sido previamente combinado e dentro do cronograma estabelecido.',
        'Ao final, recebemos a documentação e os laudos necessários de forma completa, com as pendências que precisavam ser resolvidas devidamente atendidas. Foi um trabalho que nos trouxe mais segurança e tranquilidade em relação aos nossos equipamentos e à documentação técnica.',
      ],
    },
  },
];

export const faq = [
  {
    q: 'Quais equipamentos precisam atender à NR-13?',
    a: 'Caldeiras, vasos de pressão, tubulações e tanques metálicos de armazenamento que se enquadram nos critérios da norma, como reservatórios de ar comprimido, autoclaves, digestores, vasos de compressores e geradores de vapor. Na dúvida, eu faço o inventário e a categorização dos seus equipamentos.',
  },
  {
    q: 'De quanto em quanto tempo preciso inspecionar meus equipamentos?',
    a: 'Os prazos máximos de inspeção de segurança periódica dependem da categoria do equipamento e de a empresa possuir ou não Serviço Próprio de Inspeção de Equipamentos (SPIE). Depois da categorização, entrego o plano de inspeção com as datas de cada equipamento.',
  },
  {
    q: 'O que é o Prontuário e o Livro de Registro de Segurança?',
    a: 'O Prontuário reúne as informações de projeto, fabricação e operação do equipamento. O Livro de Registro de Segurança registra inspeções, ocorrências e intervenções. Os dois são obrigatórios pela NR-13. Quando não existem, eu elaboro ou reconstituo.',
  },
  {
    q: 'O que é o Profissional Habilitado (PH)?',
    a: 'É o profissional com competência legal para o exercício da engenharia na área de inspeção de equipamentos sob pressão, com registro no conselho de classe. Todo relatório de inspeção NR-13 deve ser assinado por um PH e acompanhado de ART.',
  },
  {
    q: 'Você atende fora do Paraná?',
    a: 'Sim. Minha base é em Nova Esperança – PR e atendo empresas em todo o Brasil, com serviços já realizados em PR, MG, SP, SC e MS.',
  },
  {
    q: 'O que é ART e quando ela é necessária?',
    a: 'A Anotação de Responsabilidade Técnica registra no CREA quem é o responsável técnico por uma obra ou serviço de engenharia. É exigida em laudos, inspeções, projetos, instalações e manutenções, e é a garantia legal do serviço prestado.',
  },
  {
    q: 'Minha empresa precisa de PMOC?',
    a: 'Edifícios de uso público e coletivo com sistemas de climatização precisam manter um Plano de Manutenção, Operação e Controle atualizado, sob responsabilidade de um profissional habilitado. Eu elaboro e atualizo o PMOC do seu estabelecimento.',
  },
  {
    q: 'Como solicito um orçamento?',
    a: 'Pelo WhatsApp ou pelo formulário desta página. Informe o tipo de equipamento ou serviço, a quantidade e a cidade. Retorno com a proposta e os prazos.',
  },
];
