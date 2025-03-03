import { create } from "zustand";
import { IConsultant } from "@/types/types";
import { persist } from "zustand/middleware";

export type Document = {
  idSCDocumentacao?: string;
  title: string;
  blob: string;
  id: string;
  areaId?: string;
  areaName? : string;
  consultorId?: string;
  category?: string;
  file?: File[];
  turnToBase64: File;
  fileName? : string,
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
  subLevels: string[];
};

type ConsultantAreaDocuments = {
  areaId: string;
  areaName: string;
  files: File[];
};

export type IEditalStore = {
  Consultores: IConsultant[];
  Documentos: Document[];
  RequiredDocumentsQty: number;
  Qualificacao: Qualificacao[];
  Historico: History[];
  Anexos: Document[];
  permissaoDeCadastroEdital: boolean;
  permissaoDeCadastroConsultor: boolean;
  activeArea: string;
  currentEditalId: string;
  consultantAreaDocuments: Document[];
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
  insertConsultantAreaDocuments: (documents: ConsultantAreaDocuments[]) => void;
  removeConsultantAreaDocuments: () => void;
  setEditalId: (editalId: string) => void;
  setNaturezaPrestacao: (
    naturezaPrestacao: NaturezaPrestacao[],
    areaId: string
  ) => void;
  clearNaturezaPrestacao: (areaId: string) => void;
  setDocumentsQty: (qty: number) => void;
};

const initialState: IEditalStore = {
  RequiredDocumentsQty: 0,
  consultantAreaDocuments: [],
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
      insertConsultantAreaDocuments: (documents) =>
        set({
          consultantAreaDocuments: documents.flatMap((doc) =>
            doc.files.map((file) => ({
              title: file.name,
              blob: URL.createObjectURL(file),
              id: file.name,
              areaId: doc.areaId,
              areaName: doc.areaName,
              turnToBase64: file,
            }))
          ),
        }),
      setDocumentsQty: (qty) => set({ RequiredDocumentsQty: qty }),
      removeConsultantAreaDocuments: () => set({ consultantAreaDocuments: [] }),
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
      removerDocumento: (id) =>
        set((state) => ({
          Documentos: state.Documentos.filter(
            (documento) => documento.id !== id
          ),
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
