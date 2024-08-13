type mockInputFiles = {
  [key: string]: {
    [key: string]: string;
  }[];
};

export const mockInputsConsultor: mockInputFiles[] = [
  {
    documentoConsultor: [
      {
        documentoPessoal:
          "Documentos Pessoais (Carteira de Identidade e/ou CPF)",
      },
      {
        comprovanteVinculoComPJ: "Comprovante de Vínculo com PJ",
      },
      {
        comprovanteAcademico: "Comprovante de formação Acadêmica",
      },
      {
        registroProfissional: "Registro Profissional em Órgão de Classe",
      },
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
  // {
  //   "Atestado de Capacidade Técnica": [
  //     { teste1: "Teste 1" },
  //     { teste2: "Teste 2" },
  //     { teste3: "Teste 3" },
  //   ],
  // },
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
