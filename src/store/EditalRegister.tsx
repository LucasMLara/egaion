import { create } from "zustand";
import { IConsultant } from "@/types/types";
import { persist } from "zustand/middleware";

export type Documents = {
  title: string;
  blob: string;
  id: string;
  areaId?: string;
};

type History = {
  id: string;
  title: string;
  description: string;
};

export type Qualificacao = {
  name: string;
  areaId: string;
  naturezaPrestacao: string;
  Consultores: IConsultant[];
  AreaDocuments: Documents[];
};

type IEditalStore = {
  Documentos: Documents[];
  Qualificacao: Qualificacao[];
  Historico: History[];
  Anexos: Documents[];
  permissaoDeEnvio: boolean;
  activeArea: string;
  currentEditalId: string;
};

type editalActions = {
  cadastrarConsultor: (consultor: IConsultant, areaId: string) => void;
  reset: () => void;
  removerConsultor: (consultorId: string) => void;
  alterarPermissao: (permitir: boolean) => void;
  cadastrarDocumento: (documento: Documents[]) => void;
  cadastrarDocumentosTecnicos: (areaId: string, documento: Documents[]) => void;
  limparDocumentos: () => void;
  limparDocumentosTecnicos: () => void;
  inserirArea: (area: Qualificacao) => void;
  removerArea: (areaId: string) => void;
  setActiveArea: (areaId: string) => void;
  clearActiveArea: () => void;
  setEditalId: (editalId: string) => void;
};

const initialState: IEditalStore = {
  Documentos: [],
  Historico: [],
  Anexos: [],
  Qualificacao: [],
  permissaoDeEnvio: false,
  activeArea: "",
  currentEditalId: "",
};

export const useEditalStore = create<IEditalStore & editalActions>()(
  persist(
    (set) => ({
      ...initialState,
      alterarPermissao: (permitir) => set({ permissaoDeEnvio: permitir }),
      setActiveArea: (areaId) => set({ activeArea: areaId }),
      clearActiveArea: () => set({ activeArea: "" }),
      reset: () => {
        set(initialState);
      },
      cadastrarDocumento: (documento) =>
        set((state) => ({
          Documentos: [...state.Documentos, ...documento],
        })),
      setEditalId: (editalId) => set({ currentEditalId: editalId }),
      limparDocumentos: () => set({ Documentos: [] }),
      cadastrarConsultor: (consultor, areaId) => {
        set((state) => {
          const updatedQualificacao = state.Qualificacao.map((qualificacao) => {
            if (qualificacao.areaId === areaId) {
              return {
                ...qualificacao,
                Consultores: [...qualificacao.Consultores, consultor],
              };
            }
            return qualificacao;
          });

          console.log("Qualificação atualizada:", updatedQualificacao);
          return { Qualificacao: updatedQualificacao };
        });
      },

      removerConsultor: (consultorId) => {
        set((state) => ({
          Qualificacao: state.Qualificacao.map((qualificacao) => ({
            ...qualificacao,
            Consultores: qualificacao.Consultores.filter(
              (consultor) => consultor.id !== consultorId
            ),
          })),
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
