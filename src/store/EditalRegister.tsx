import { create } from "zustand";
import { IConsultant, MultipleCheckBoxOptions } from "@/types/types";
import { persist } from "zustand/middleware";

export type Document = {
  idSCDocumentacao?: string;
  title: string;
  blob: string;
  id: string;
  areaId?: string;
  areaName?: string;
  modalidade?: string;
  consultorId?: string;
  category?: string;
  file?: File[];
  turnToBase64: File;
  fileName?: string;
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
  Consultores: IConsultant[];
};

type ConsultantAreaDocuments = {
  areaId: string;
  areaName: string;
  files: File[];
};

type Localidade = {
  idSCLocalidade: string;
  nome: string;
};

export type IEditalStore = {
  documentosEmpresaAjustes: Document[];
  documentosPessoaisConsultoresAjustes: Document[];
  DocumentosQualificacaoEmpresaAjustes: Document[];
  DocumentosQualificacaoConsultoresAjustes: Document[];
  consultantNaturezasPorAreas: MultipleCheckBoxOptions[];
  localidadesDoConsultor: Localidade[];
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
  currentEditalName: string;
  consultantAreaDocuments: Document[];
  LocalidadesDisponiveis: Localidade[];
  limitesDeLocalidade: {
    QuantidadeMinimaLocalidade: number;
    QuantidadeMaximaLocalidade: number;
  };
};

type editalActions = {
  setConsultantNaturezasPorAreas: (areas: MultipleCheckBoxOptions[]) => void;
  removeConsultantNaturezasPorAreas: () => void;
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
  setEditalName: (editalName: string) => void;
  setNaturezaPrestacao: (
    naturezaPrestacao: NaturezaPrestacao[],
    areaId: string
  ) => void;
  clearNaturezaPrestacao: (areaId: string) => void;
  setDocumentsQty: (qty: number) => void;
  checkQualificacaoConsultants: () => boolean;
  inserirLocalidadesDoConsultor: (localidades: Localidade[]) => void;
  removerLocalidadesDoConsultor: () => void;
  carregarLimitesDeLocalidade: (limites: {
    QuantidadeMinimaLocalidade: number;
    QuantidadeMaximaLocalidade: number;
  }) => void;
  carregarLocalidadesDisponiveis: (
    localidades: { Nome: string; idSCLocalidade: string }[]
  ) => void;

  inserirDocumentosEmpresaAjustes: (documento: Document) => void;
  removerDocumentosEmpresaAjustes: (id: string) => void;
  inserirDocumentosPessoaisConsultorAjustes: (documento: Document) => void;
  removerDocumentosPessoaisConsultorAjustes: (id: string) => void;
  cadastrarDocumentosQualificacaoEmpresaAjustes: (documentos: Document) => void;
  removerDocumentosQualificacaoEmpresaAjustes: (
    id: string,
    title: string
  ) => void;
  cadastrarDocumentosQualificacaoConsultoresAjustes: (
    documentos: Document
  ) => void;
  removerDocumentosQualificacaoConsultoresAjustes: (
    id: string,
    title: string
  ) => void;
};

const initialState: IEditalStore = {
  DocumentosQualificacaoConsultoresAjustes: [],
  DocumentosQualificacaoEmpresaAjustes: [],
  documentosPessoaisConsultoresAjustes: [],
  documentosEmpresaAjustes: [],
  consultantNaturezasPorAreas: [],
  localidadesDoConsultor: [],
  limitesDeLocalidade: {
    QuantidadeMinimaLocalidade: 0,
    QuantidadeMaximaLocalidade: 0,
  },
  LocalidadesDisponiveis: [],
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
  currentEditalName: "",
  Consultores: [],
};

export const useEditalStore = create<IEditalStore & editalActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      cadastrarDocumentosQualificacaoConsultoresAjustes: (documento) => {
        set((state) => ({
          DocumentosQualificacaoConsultoresAjustes: [
            ...state.DocumentosQualificacaoConsultoresAjustes,
            documento,
          ],
        }));
      },
      removerDocumentosQualificacaoConsultoresAjustes: (id, title) => {
        set((state) => ({
          DocumentosQualificacaoConsultoresAjustes:
            state.DocumentosQualificacaoConsultoresAjustes.filter(
              (doc) => !(doc.id === id && doc.title === title)
            ),
        }));
      },
      cadastrarDocumentosQualificacaoEmpresaAjustes: (documento) => {
        set((state) => ({
          DocumentosQualificacaoEmpresaAjustes: [
            ...state.DocumentosQualificacaoEmpresaAjustes,
            documento,
          ],
        }));
      },
      removerDocumentosQualificacaoEmpresaAjustes: (id, title) => {
        set((state) => ({
          DocumentosQualificacaoEmpresaAjustes:
            state.DocumentosQualificacaoEmpresaAjustes.filter(
              (doc) => !(doc.id === id && doc.title === title)
            ),
        }));
      },
      inserirDocumentosPessoaisConsultorAjustes: (documento) => {
        set((state) => ({
          documentosPessoaisConsultoresAjustes: [
            ...state.documentosPessoaisConsultoresAjustes,
            documento,
          ],
        }));
      },
      removerDocumentosPessoaisConsultorAjustes: (id: string) => {
        set((state) => ({
          documentosPessoaisConsultoresAjustes:
            state.documentosPessoaisConsultoresAjustes.filter(
              (documento) => documento.id !== id
            ),
        }));
      },
      inserirDocumentosEmpresaAjustes: (documento) => {
        set((state) => ({
          documentosEmpresaAjustes: [
            ...state.documentosEmpresaAjustes,
            documento,
          ],
        }));
      },
      removerDocumentosEmpresaAjustes: (id: string) => {
        set((state) => ({
          documentosEmpresaAjustes: state.documentosEmpresaAjustes.filter(
            (documento) => documento.id !== id
          ),
        }));
      },
      setConsultantNaturezasPorAreas: (areas) =>
        set({ consultantNaturezasPorAreas: areas }),
      removeConsultantNaturezasPorAreas: () =>
        set({ consultantNaturezasPorAreas: [] }),
      removerLocalidadesDoConsultor: () => set({ localidadesDoConsultor: [] }),
      inserirLocalidadesDoConsultor: (localidades) =>
        set({ localidadesDoConsultor: localidades }),
      carregarLimitesDeLocalidade: (limites) =>
        set({ limitesDeLocalidade: limites }),
      carregarLocalidadesDisponiveis: (localidades) =>
        set({
          LocalidadesDisponiveis: localidades.map((localidade) => ({
            idSCLocalidade: localidade.idSCLocalidade,
            nome: localidade.Nome,
          })),
        }),
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
      setEditalName: (editalName) => set({ currentEditalName: editalName }),
      removerDocumento: (id) =>
        set((state) => ({
          Documentos: state.Documentos.filter(
            (documento) => documento.id !== id
          ),
        })),
      cadastrarConsultor: (consultor) => {
        set((state) => ({
          Consultores: [...state.Consultores, consultor],
          Qualificacao: state.Qualificacao.map((qualificacao) => {
            if (
              consultor.areas?.some((area) => area.id === qualificacao.areaId)
            ) {
              return {
                ...qualificacao,
                Consultores: [...qualificacao.Consultores, consultor],
              };
            }
            return qualificacao;
          }),
        }));
      },
      removerConsultor: (consultorId) => {
        set((state) => ({
          Consultores: state.Consultores.filter(
            (consultor) => consultor.id !== consultorId
          ),
          Qualificacao: state.Qualificacao.map((area) => ({
            ...area,
            Consultores: area.Consultores.filter(
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
          Consultores: state.Consultores.filter(
            (consultor) => !consultor.areas?.some((area) => area.id === areaId)
          ),
        })),
      checkQualificacaoConsultants: () => {
        const state = get();
        return state.Qualificacao.every((qualificacao) =>
          state.Consultores.some((consultor) =>
            consultor.areas?.some((area) => area.id === qualificacao.areaId)
          )
        );
      },
    }),
    { name: "editalStorage" }
  )
);
