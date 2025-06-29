type TEditalStatus = "pending" | "ok" | "error" | null;

export interface IMyEditals {
  idSCEdital: string;
  JustificativaNaoAprovacao: string | undefined;
  idSCCredenciadasEdital: string;
  ObjetoEditalBase64: string;
  finalEnt: number;
  baCreatedTime: string;
  baGuid: string;
  QuantidadeMinimaLocalidade: number | null;
  QuantidadeMaximaLocalidade: number | null;
  LocalidadePadrao: string | null;
  DocumentacaoPadrao: string;
  ObjetoEdital: string | null;
  TipodeCredenciamento: string;
  NomeEdital: string;
  FimEdital: string;
  Credenciadora: string;
  TipoChamadas: string;
  InicioEdital: string;
  Objetivos: string;
  EscolhaLocalidades: boolean;
  Status: TEditalStatus;
  PesquisaNome: string | null;
  PesquisaCNPJ: string | null;
  PesquisaStatusCred: string | null;
  PesquisaCredenciada: string | null;
  ObjetoEditalArquivo: number;
  ResumoEdital: string;
  ConfirmarDadosCadastro: boolean;
  SelecionadoExclusao: string | null;
  serializedEditalHistory: {
    idHistorico: string;
    finalEnt: number;
    baCreatedTime: string;
    baGuid: string;
    DadosPadrao: string | null;
    Responsavel: string;
    DataCriacao: string;
    Descricao: string;
    SCEdital: string;
  }[];
  serializedEditalAttachments: {
    Arquivo: number;
    DadosPadrao: null;
    DataCriacao: string;
    Descricao: string;
    Responsavel: string;
    SCEdital: string;
    baCreatedTime: string;
    baGuid: string;
    finalEnt: number;
    idAnexo: string;
  }[];
}

export type TState = {
  myEditals: IMyEditals[];
};

export type TActions = {
  setMyEdital: (myEditals: IMyEditals) => void;
  setListMyEditals: (myEditals: IMyEditals[]) => void;
};
