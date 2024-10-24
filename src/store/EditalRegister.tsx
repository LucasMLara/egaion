import { create } from "zustand";
import { IConsultant } from "@/types/types";
import { persist } from "zustand/middleware";

export type Documents = {
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
  AreaDocuments: Documents[];
  Consultores: IConsultant[];
};

type IEditalStore = {
  Consultores: IConsultant[];
  Documentos: Documents[];
  Qualificacao: Qualificacao[];
  Historico: History[];
  Anexos: Documents[];
  permissaoDeCadastroEdital: boolean;
  permissaoDeCadastroConsultor: boolean;
  activeArea: string;
  currentEditalId: string;
};

type editalActions = {
  cadastrarConsultor: (consultor: IConsultant) => void;
  reset: () => void;
  removerConsultor: (consultorId: string) => void;
  alterarPermissaoEdital: (permitir: boolean) => void;
  alterarPermissaoConsultor: (permitir: boolean) => void;
  cadastrarDocumento: (documento: Documents[]) => void;
  cadastrarDocumentosTecnicos: (areaId: string, documento: Documents[]) => void;
  limparDocumentos: () => void;
  limparDocumentosTecnicos: () => void;
  inserirArea: (area: Qualificacao) => void;
  removerArea: (areaId: string) => void;
  setActiveArea: (areaId: string) => void;
  clearActiveArea: () => void;
  setEditalId: (editalId: string) => void;
  setNaturezaPrestacao: (naturezaPrestacao: string[], areaId: string) => void;
  clearNaturezaPrestacao: (areaId: string) => void;
  vincularAreaConsultor: (areaId: string, consultorId: string) => void;
  desvincularAreaConsultor: (areaId: string, consultorId: string) => void;
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
      alterarPermissaoEdital: (permitir) =>
        set({ permissaoDeCadastroEdital: permitir }),
      alterarPermissaoConsultor: (permitir) =>
        set({ permissaoDeCadastroConsultor: permitir }),
      setActiveArea: (areaId) => set({ activeArea: areaId }),
      clearActiveArea: () => set({ activeArea: "" }),
      reset: () => {
        set(initialState);
      },

      vincularAreaConsultor: (areaId, consultorId) => {
        set((state) => ({
          Qualificacao: state.Qualificacao.map((qualificacao) => {
            if (qualificacao.areaId === areaId) {
              const consultor = state.Consultores.find(
                (consultor) => consultor.id === consultorId
              );

              if (consultor) {
                return {
                  ...qualificacao,

                  Consultores: [...qualificacao.Consultores, consultor],
                };
              }
            }

            return qualificacao;
          }),
        }));
      },
      desvincularAreaConsultor: (areaId, consultorId) => {
        set((state) => ({
          Qualificacao: state.Qualificacao.map((qualificacao) => {
            if (qualificacao.areaId === areaId) {
              return {
                ...qualificacao,
                Consultores: qualificacao.Consultores.filter(
                  (consultor) => consultor.id !== consultorId
                ),
              };
            }
            return qualificacao;
          }),
        }));
      },
      setNaturezaPrestacao: (naturezaPrestacao, areaId) => {
        set((state) => ({
          Qualificacao: state.Qualificacao.map((qualificacao) => {
            if (qualificacao.areaId === areaId) {
              return {
                ...qualificacao,
                naturezaPrestacao: naturezaPrestacao.map((np) => ({
                  label: np,
                  value: np,
                  id: np,
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
          Documentos: [...state.Documentos, ...documento],
        })),
      setEditalId: (editalId) => set({ currentEditalId: editalId }),
      limparDocumentos: () => set({ Documentos: [] }),
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
