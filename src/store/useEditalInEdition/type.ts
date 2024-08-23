interface IEdital {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: string;
}

// TODO - Add the missing fields on the interface from documents form
interface IHavilitacaoJuridica {
  "Comprovante de Inscrição e de Situação Cadastral do CNPJ": string;
}
interface IRegularidadeFiscal {
  "Comprovante de Regularidade Fazenda Federal": string;
}

interface IQualificacaoTecnica {
  "Relato de Experiência": string;
}

interface IDocuments {
  habilitacaoJuridica: IHavilitacaoJuridica;
  regularidadeFiscal: IRegularidadeFiscal;
  qualificacaoTecnica: IQualificacaoTecnica;
}

interface IConsultantinEdition {
  nome: string;
  cpf: string;
  email: string;
  confirmarEmail: string;
  telefone: string;
  docPessoal: File | null;
  comprovanteVinculoCNPJ: File | null;
  comprovanteFormacaoAcademica: File | null;
  registroProfissionalClasse: File | null;
}

export interface IEditalInEdition {
  edital: IEdital;
  documents: IDocuments;
  consultant: IConsultantinEdition;
  listConsultant: IConsultantinEdition[];
}

export type TState = {
  editalInEdition: IEditalInEdition;
};

export type TActions = {
  setEdital: (data: ISetEdition<IEdital>) => void;
  setDocuments: (data: ISetEdition<IDocuments>) => void;
  setConsultant: (data: ISetEdition<IConsultantinEdition>) => void;
  setListConsultant: (consultant: IConsultantinEdition[]) => void;
  clearEditalInEdition: () => void;
};

interface ISetEdition<T extends IConsultantinEdition | IDocuments | IEdital> {
  key: keyof T;
  data: T[keyof T];
}
