import { create } from "zustand";
import { IConsultant } from "@/types/types";
import { persist } from "zustand/middleware";

export type Documents = {
  title: string;
  blob: string;
  id: string;
};

type History = {
  id: string;
  title: string;
  description: string;
};

export type Qualificacao = {
  naturezaPrestacao: string;
  areas: string[];
  documentosDaEmpresa: Documents[];
};

type IEditalStore = {
  editalData: {
    Consultores: IConsultant[];
    Documentos: Documents[];
    Qualificacao: Qualificacao;
    Historico: History[];
    Anexos: Documents[];
  };
};

type editalActions = {
  cadastrarConsultor: (consultor: IConsultant) => void;
  reset: () => void;
  removerConsultor: (consultorId: string) => void;
  permissaoDeEnvio: boolean;
  alterarPermissao: (permitir: boolean) => void;
  cadastrarDocumento: (documento: Documents[]) => void;
  cadastrarDocumentoQualificacao: (documento: Documents[]) => void;
  limparDocumentos: () => void;
  limparDocumentosTecnicos: () => void;
  inserirArea: (area: string) => void;
  removerArea: (area: string) => void;
  indicarNaturezaPrestacao: (natureza: string) => void;
};

const initialState = {
  editalData: {
    Consultores: [],
    Documentos: [],
    Historico: [],
    Anexos: [],
    Qualificacao: {
      naturezaPrestacao: "",
      areas: [],
      documentosDaEmpresa: [],
    },
  },
};

export const useEditalStore = create<IEditalStore & editalActions>()(
  persist(
    (set) => ({
      indicarNaturezaPrestacao: (natureza) =>
        set((state) => ({
          editalData: {
            ...state.editalData,
            Qualificacao: {
              ...state.editalData.Qualificacao,
              naturezaPrestacao: natureza,
            },
          },
        })),
      cadastrarDocumento: (documento) =>
        set((state) => ({
          editalData: {
            ...state.editalData,
            Documentos: [...documento],
          },
        })),
      cadastrarDocumentoQualificacao: (documento) =>
        set((state) => ({
          editalData: {
            ...state.editalData,
            Qualificacao: {
              ...state.editalData.Qualificacao,
              documentosDaEmpresa: [...documento],
            },
          },
        })),
      editalData: {
        Qualificacao: {
          naturezaPrestacao: "",
          areas: [],
          documentosDaEmpresa: [],
        },
        Consultores: [],
        Documentos: [],
        Historico: [],
        Anexos: [],
      },
      reset: () => {
        set(initialState);
      },
      limparDocumentos: () =>
        set((state) => ({
          editalData: {
            ...state.editalData,
            Documentos: [],
          },
        })),
      limparDocumentosTecnicos: () =>
        set((state) => ({
          editalData: {
            ...state.editalData,
            Qualificacao: {
              ...state.editalData.Qualificacao,
              documentosDaEmpresa: [],
            },
          },
        })),
      alterarPermissao: (permitir) => set({ permissaoDeEnvio: permitir }),
      permissaoDeEnvio: false,
      inserirArea: (area) =>
        set((state) => ({
          editalData: {
            ...state.editalData,
            Qualificacao: {
              ...state.editalData.Qualificacao,
              areas: [...state.editalData.Qualificacao.areas, area],
            },
          },
        })),
      removerArea: (area) =>
        set((state) => ({
          editalData: {
            ...state.editalData,
            Qualificacao: {
              ...state.editalData.Qualificacao,
              areas: state.editalData.Qualificacao.areas.filter(
                (a) => a !== area
              ),
            },
          },
        })),
      removerConsultor: (consultorId) =>
        set((state) => ({
          editalData: {
            ...state.editalData,
            Consultores: state.editalData.Consultores.filter(
              (consultor) => consultor.id !== consultorId
            ),
          },
        })),
      cadastrarConsultor: (consultor) =>
        set((state) => ({
          editalData: {
            ...state.editalData,
            Consultores: [...state.editalData.Consultores, consultor],
          },
        })),
    }),
    { name: "editalStorage" }
  )
);
