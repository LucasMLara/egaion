import { create } from "zustand";
import { IConsultant } from "@/types/types";
import { persist } from "zustand/middleware";

export type Document = {
  title: string;
  blob: string;
  id: string;
  areaId?: string;
  consultorId?: string;
};

type History = {
  id: string;
  title: string;
  description: string;
};
export type NaturezaPrestacao = {
  label: string;
  value: string;
  id: string;
  areaId: string;
};

export type Qualificacao = {
  name: string;
  areaId: string;
  naturezaPrestacao: NaturezaPrestacao[];
  AreaDocuments: Document[];
};

type IEditalStore = {
  Consultores: IConsultant[];
  Documentos: Document[];
  Qualificacao: Qualificacao[];
  Historico: History[];
  Anexos: Document[];
  permissaoDeCadastroEdital: boolean;
  permissaoDeCadastroConsultor: boolean;
  activeArea: string;
  currentEditalId: string;
};

type editalActions = {
  limparConsultores: () => void;
  cadastrarConsultor: (consultor: IConsultant) => void;
  reset: () => void;
  removerConsultor: (consultorId: string) => void;
  alterarPermissaoEdital: (permitir: boolean) => void;
  alterarPermissaoConsultor: (permitir: boolean) => void;
  cadastrarDocumento: (documento: Document) => void;
  cadastrarDocumentosTecnicos: (areaId: string, documento: Document[]) => void;
  removerDocumento: (id: string) => void;
  limparDocumentosTecnicos: () => void;
  inserirArea: (area: Qualificacao) => void;
  removerArea: (areaId: string) => void;
  setActiveArea: (areaId: string) => void;
  clearActiveArea: () => void;
  setEditalId: (editalId: string) => void;
  setNaturezaPrestacao: (
    naturezaPrestacao: NaturezaPrestacao[],
    areaId: string
  ) => void;
  clearNaturezaPrestacao: (areaId: string) => void;
};

const initialState: IEditalStore = {
  Documentos: [],
  Historico: [],
  Anexos: [],
  Qualificacao: [],
  permissaoDeCadastroEdital: false,
  permissaoDeCadastroConsultor: false,
  activeArea: "",
  currentEditalId: "",
  Consultores: [],
};

export const useEditalStore = create<IEditalStore & editalActions>()(
  persist(
    (set) => ({
      ...initialState,
      limparConsultores: () => set({ Consultores: [] }),
      alterarPermissaoEdital: (permitir) =>
        set({ permissaoDeCadastroEdital: permitir }),
      alterarPermissaoConsultor: (permitir) =>
        set({ permissaoDeCadastroConsultor: permitir }),
      setActiveArea: (areaId) => set({ activeArea: areaId }),
      clearActiveArea: () => set({ activeArea: "" }),
      reset: () => {
        set(initialState);
      },
      setNaturezaPrestacao: (naturezaPrestacao, areaId) => {
        set((state) => ({
          Qualificacao: state.Qualificacao.map((qualificacao) => {
            if (qualificacao.areaId === areaId) {
              return {
                ...qualificacao,
                naturezaPrestacao: naturezaPrestacao.map((np) => ({
                  ...np,
                  areaId: areaId,
                })),
              };
            }
            return qualificacao;
          }),
        }));
      },
      clearNaturezaPrestacao: (areaId: string) => {
        set((state) => ({
          Qualificacao: state.Qualificacao.map((qualificacao) =>
            qualificacao.areaId === areaId
              ? { ...qualificacao, naturezaPrestacao: [] }
              : qualificacao
          ),
        }));
      },
      cadastrarDocumento: (documento) =>
        set((state) => ({
          Documentos: [...state.Documentos, documento],
        })),
      setEditalId: (editalId) => set({ currentEditalId: editalId }),
      removerDocumento: (id) => set((state) => ({
        Documentos: state.Documentos.filter((documento) => documento.id !== id)
      })),
      cadastrarConsultor: (consultor) => {
        set((state) => ({
          Consultores: [...state.Consultores, consultor],
        }));
      },
      removerConsultor: (consultorId) => {
        set((state) => ({
          Consultores: state.Consultores.filter(
            (consultor) => consultor.id !== consultorId
          ),
        }));
      },

      cadastrarDocumentosTecnicos: (areaId, documento) => {
        set((state) => ({
          Qualificacao: state.Qualificacao.map((qualificacao) => {
            if (qualificacao.areaId === areaId) {
              return {
                ...qualificacao,
                AreaDocuments: [...qualificacao.AreaDocuments, ...documento],
              };
            }
            return qualificacao;
          }),
        }));
      },

      limparDocumentosTecnicos: () => {
        set((state) => ({
          Qualificacao: state.Qualificacao.map((qualificacao) => ({
            ...qualificacao,
            AreaDocuments: [],
          })),
        }));
      },

      inserirArea: (area) =>
        set((state) => ({
          Qualificacao: [...state.Qualificacao, area],
        })),

      removerArea: (areaId) =>
        set((state) => ({
          Qualificacao: state.Qualificacao.filter(
            (qualificacao) => qualificacao.areaId !== areaId
          ),
        })),
    }),
    { name: "editalStorage" }
  )
);
