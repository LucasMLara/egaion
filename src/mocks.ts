type mockInputFiles = {
  [key: string]: {
    [key: string]: string;
  }[];
};
export const mockDocumentosAreaConsultor: mockInputFiles[] = [
  {
    "Documentos da Área 1": [
      { relatoDeExperiencia: "Relato de Experiência" },
      { atestadoDeCapacidadeTecnica: "Atestado de Capacidade Técnica" },
    ],
    "Documentos da Área 2": [
      { relatoDeExperiencia: "Relato de Experiência" },
      { atestadoDeCapacidadeTecnica: "Atestado de Capacidade Técnica" },
    ],
  },
];
export const mockQualificacaoTecnica: mockInputFiles[] = [
  {
    "Documentos Obrigatórios": [
      { reLatoDeExperiencia: "Relato de Experiência" },
      { atestadoDeCapacidadeTecnica: "Atestado de Capacidade Técnica" },
    ],
  },
];

export const mockInputsEmpresa: mockInputFiles[] = [
  {
    "Habilitacão Jurídica": [
      {
        comprovanteDeInscricao:
          "Comprovante de Inscrição e de Situação Cadastral do CNPJ",
      },
      {
        declaracaoCapitalSocial: "Declaração de Capital Social",
      },
      { declaracaoResponsabilidade: "Declaração de Responsabilidade" },
      {
        documentoConstitutivoFornecedor: "Documento Constitutivo do Fornecedor",
      },
      {
        fichaCadastroMunicipalOuInscricaoMunicipal:
          "Ficha Cadastral Municipal ou Inscrição Municipal",
      },
      {
        termoDeCompromissoDeSegurancaDaInformacao:
          "Termo de Compromisso de Segurança da Informação",
      },
      {
        termoConhecimentoAceiteContrato:
          "Termo de Conhecimento e Aceite de Contrato",
      },
      {
        termoDeConsentimentoLGPD:
          "Termo de Consentimento Tratamento de Dados Pessoais Lei Geral de Proteção de Dados pessoais - LGPD",
      },
    ],
  },
  {
    "Regularidade Fiscal": [
      {
        comprovanteRegularidadeFazendaFederal:
          "Comprovante de Regularidade Fazenda Federal",
      },
      {
        comprovanteRegularidadeFazendaEstadual:
          "Comprovante de Regularidade Fazenda Estadual",
      },
      {
        comprovanteRegularidadeFazendaMunicipal:
          "Comprovante de Regularidade Fazenda Municipal",
      },
      { comprovanteRegularidadeFGTS: "Comprovante de Regularidade FGTS" },
    ],
  },
];

export const history = [
  {
    id: 1,
    title: "Extensão do Prazo",
    date: "2023-10-10",
    status: "Em andamento",
  },
  {
    id: 2,
    title: "Ratificação",
    date: "2022-10-10",
    status: "Em andamento",
  },
  {
    id: 3,
    title: "Abertura de Processo",
    date: "2021-10-10",
    status: "Em andamento",
  },
];
