export type IAvailableEdital = {
  LimiteMaximoNivel1: null,
  LimiteMaximoNivel2: null,
  LimiteMaximoNivel3: null,
  LimiteMaximoNivel4: null,
  LimiteMaximoNivel5: null,
  LimiteMaximoNivel6: null,
  LimiteMaximoNivel7: null,
  idSCEdital: string;
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
  Status: string | null;
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
    Arquivo: number,
    DadosPadrao: null,
    DataCriacao: string,
    Descricao: string,
    Responsavel: string,
    SCEdital: string,
    baCreatedTime: string,
    baGuid: string,
    finalEnt: number,
    idAnexo: string
  }[];
};

export type TState = {
  availableEditals: IAvailableEdital[];
};

export type TActions = {
  setEdital: (editals: IAvailableEdital) => void;
  setListEditals: (editals: IAvailableEdital[]) => void;
};





