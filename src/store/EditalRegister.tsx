import { create } from "zustand";
import { IConsultant } from "@/types/types";
import { persist } from "zustand/middleware";

type Documents = {
  title: string;
  blob: string;
  id: string;
};

type History = {
  id: string;
  title: string;
  description: string;
};

type IEditalStore = {
  editalData: {
    Consultores: IConsultant[];
    Documentos: Documents[];
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
};

const initialState = {
  editalData: {
    Consultores: [],
    Documentos: [],
    Historico: [],
    Anexos: [],
  },
};

export const useEditalStore = create<IEditalStore & editalActions>()(
  persist(
    (set, get) => ({
      editalData: {
        Consultores: get()?.editalData?.Consultores ?? [],
        Documentos: get()?.editalData?.Documentos ?? [],
        Historico: get()?.editalData?.Historico ?? [],
        Anexos: get()?.editalData?.Anexos ?? [],
      },
      reset: () => {
        set(initialState);
      },
      alterarPermissao: (permitir) => set({ permissaoDeEnvio: permitir }),
      permissaoDeEnvio: false,
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
