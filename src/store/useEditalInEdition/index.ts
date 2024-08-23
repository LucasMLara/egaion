import { create } from "zustand";
import { TActions, TState } from "./type";

const initialState = {
  consultant: {
    nome: "",
    cpf: "",
    email: "",
    confirmarEmail: "",
    telefone: "",
    comprovanteFormacaoAcademica: null,
    comprovanteVinculoCNPJ: null,
    docPessoal: null,
    registroProfissionalClasse: null,
  },
  documents: {
    habilitacaoJuridica: {
      "Comprovante de Inscrição e de Situação Cadastral do CNPJ": "",
    },
    qualificacaoTecnica: {
      "Relato de Experiência": "",
    },
    regularidadeFiscal: {
      "Comprovante de Regularidade Fazenda Federal": "",
    },
  },
  edital: {
    date: new Date(),
    description: "",
    status: "pending",
    title: "",
    id: "",
  },
  listConsultant: [],
};
export const useEditalInEdition = create<TState & TActions>((set) => ({
  editalInEdition: initialState,

  setEdital: (data) => {
    set((state) => ({
      editalInEdition: {
        ...state.editalInEdition,
        [data.key]: data.data,
      },
    }));
  },
  setDocuments: (data) => {
    set((state) => ({
      editalInEdition: {
        ...state.editalInEdition,
        [data.key]: data.data,
      },
    }));
  },
  setConsultant: (data) => {
    set((state) => ({
      editalInEdition: {
        ...state.editalInEdition,
        [data.key]: data.data,
      },
    }));
  },
  setListConsultant: (data) => {
    set((state) => ({
      editalInEdition: {
        ...state.editalInEdition,
        listConsultant: data,
      },
    }));
  },
  clearEditalInEdition: () => {
    set((state) => ({
      editalInEdition: initialState,
    }));
  },
}));
