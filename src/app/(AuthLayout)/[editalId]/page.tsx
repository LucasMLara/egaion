"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  formatDate,
  createBlobUrl,
  transformData,
  InputItem,
} from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Attachments from "@/components/layout/Attachments";
import InsertEditalDocuments from "@/components/layout/InsertEditalDocuments";
import { useEditalStore } from "@/store/EditalRegister";
import { useRouter } from "next/navigation";
import InsertQualificacaoTecnicaDocs from "@/components/layout/InsertQualificacaoTecnicaDocs";
import ConsultantsArea from "@/components/layout/ConsultantsArea";
import { FileText, File, UserCheck, Paperclip, History } from "lucide-react";
import { IAvailableEdital } from "@/store/useAvailableEditals/types";
import EditalHistory from "@/components/layout/EditalHistory";
import { HistoryItem, AttachmentItem, RequiredDocuments } from "@/types/types";
import { LoaderIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  prepararDocumentosCredenciada,
  prepararConsultoresCredenciada,
  prepararAreasCredenciada,
} from "@/lib/concatEditalDocuments";

export default function EditalId({
  params,
}: {
  params: {
    editalId: string;
  };
}) {
  const router = useRouter();
  const {
    permissaoDeCadastroEdital,
    setDocumentsQty,
    Consultores,
    Qualificacao,
    Documentos,
    currentEditalId,
    reset,
    setEditalName,
    setEditalId,
    carregarLocalidadesDisponiveis,
    carregarLimitesDeLocalidade,
  } = useEditalStore();

  const initialCurrentEditalState: IAvailableEdital = {
    idSCEdital: "",
    ObjetoEditalBase64: "",
    finalEnt: 0,
    baCreatedTime: "",
    baGuid: "",
    QuantidadeMinimaLocalidade: 0,
    QuantidadeMaximaLocalidade: 0,
    LocalidadePadrao: "",
    DocumentacaoPadrao: "",
    ObjetoEdital: "",
    TipodeCredenciamento: "",
    NomeEdital: "",
    FimEdital: "",
    Credenciadora: "",
    TipoChamadas: "",
    InicioEdital: "",
    Objetivos: "",
    EscolhaLocalidades: false,
    Status: "",
    PesquisaNome: "",
    PesquisaCNPJ: "",
    PesquisaStatusCred: "",
    PesquisaCredenciada: "",
    ObjetoEditalArquivo: 0,
    ResumoEdital: "",
    ConfirmarDadosCadastro: false,
    SelecionadoExclusao: "",
    serializedEditalHistory: [],
    serializedEditalAttachments: [],
  };
  const [currentEdital, setCurrentEdital] = useState<IAvailableEdital>(
    initialCurrentEditalState
  );
  const [editalHistory, setEditalHistory] = useState<HistoryItem[]>([]);
  const [editalAttachments, setEditalAttachments] = useState<AttachmentItem[]>(
    []
  );

  const [requiredEditalDocs, setRequiredEditalDocs] = useState<
    RequiredDocuments[]
  >([]);

  const [documentCategories, setDocumentCategories] = useState<
    RequiredDocuments[]
  >([]);

  const [areas, setAreas] = useState<InputItem[]>([]);

  const [loading, setLoading] = useState(true);

  const editalDocsPerCategory = useMemo(() => {
    const categorias = documentCategories.map((categoria) => ({
      Codigo: String(categoria.Codigo),
      Descricao: categoria.Descricao,
    }));

    const documentacao = requiredEditalDocs.map((doc) => ({
      ...doc,
      Categoria: String(doc.Categoria),
    }));

    const filteredDocuments = categorias.map((categoria) => ({
      [String(categoria.Descricao)]: documentacao
        .filter((doc) => doc.Categoria === categoria.Codigo)
        .map((doc: any) => ({
          [doc.Nome.toLowerCase().replace(/ /g, "")]:
            doc.Nome + `#${doc.idSCDocumentacao}`,
        })),
    }));
    return filteredDocuments;
  }, [documentCategories, requiredEditalDocs]);

  const history = useMemo(() => {
    return editalHistory.map((itemHistorico) => {
      return {
        DataCriacao: itemHistorico.DataCriacao,
        Descricao: itemHistorico.Descricao,
        Responsavel: itemHistorico.Responsavel,
        idHistorico: itemHistorico.idHistorico,
      };
    });
  }, [editalHistory]);

  const attachments = useMemo(() => {
    return editalAttachments.map((anexo: AttachmentItem) => {
      return {
        idAnexo: anexo.idAnexo,
        Descricao: anexo.Descricao,
        DataCriacao: anexo.DataCriacao,
        Responsavel: anexo.Responsavel,
        Arquivo: anexo.Arquivo,
        DadosPadrao: anexo.DadosPadrao,
        SCEdital: anexo.SCEdital,
      };
    });
  }, [editalAttachments]);

  const editalAreas = useMemo(() => {
    return transformData(areas);
  }, [areas]);

  useEffect(() => {
    async function fetchEdital() {
      try {
        const response = await fetch(`/api/${params.editalId}`);
        const data = await response.json();
        if (!response.ok) {
          console.error("Error:", data.error || data.message);
        } else {
          setAreas(data.serializedEditalParameters);
          setCurrentEdital(data.serializedEdital);
          carregarLimitesDeLocalidade({
            QuantidadeMaximaLocalidade:
              data.serializedEdital.QuantidadeMaximaLocalidade,
            QuantidadeMinimaLocalidade:
              data.serializedEdital.QuantidadeMinimaLocalidade,
          });
          carregarLocalidadesDisponiveis(data.serializedEditalLocalidades);
          setEditalHistory(data.serializedEditalHistory);
          setEditalAttachments(data.serializedEditalAttachments);
          setDocumentCategories(data.serializedEditalDocCategorias);
          setRequiredEditalDocs(data.serializedEditalDocuments);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Fetch error:", error);
      }
    }
    if (params.editalId) {
      fetchEdital();
    }
  }, [
    carregarLimitesDeLocalidade,
    carregarLocalidadesDisponiveis,
    params.editalId,
  ]);

  useEffect(() => {
    setDocumentsQty(requiredEditalDocs.length);
  }, [requiredEditalDocs.length, setDocumentsQty]);

  useEffect(() => {
    setEditalName(currentEdital.NomeEdital);
    setEditalId(currentEdital.idSCEdital);
  }, [
    currentEdital.NomeEdital,
    currentEdital.idSCEdital,
    setEditalId,
    setEditalName,
  ]);

  const { data } = useSession();

  const idScCredenciada = data?.user.idSCCredenciada;

  async function enviarDadosEdital() {
    const url = `${process.env.NEXT_PUBLIC_WEB_SERVICE}`;
    const body = `
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
          <soap:Header/>
            <soap:Body>
                <tem:createCases>
                  <tem:casesInfo>
                    <BizAgiWSParam>
                        <Cases>
                          <Case>
                        <Process>CadastrarCredenciadaNoEdit</Process>
                                  <Entities>
                                      <SCCredenciadasEdital>
                                        <StatusCadastro entityName="SCStatusCredEdital" businessKey="Codigo='3'"/>
                                            <SCEdital businessKey="idSCEdital='${currentEditalId}'"/>
                                            <Credenciada entityName="SCCredenciada" businessKey="idSCCredenciada='${idScCredenciada}'"/>
                                              ${await prepararDocumentosCredenciada(
                                                Documentos
                                              )}
                                            ${await prepararAreasCredenciada(
                                              Qualificacao
                                            )}
                                                ${await prepararConsultoresCredenciada(
                                                  Consultores,
                                                  idScCredenciada
                                                )}
                                      </SCCredenciadasEdital>
                            </Entities>
                            </Case>
                          </Cases>
                        </BizAgiWSParam>
                      </tem:casesInfo>
                    </tem:createCases>
            </soap:Body>
  </soap:Envelope>
    `;

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type":
          'application/soap+xml;charset=UTF-8;action="http://tempuri.org/createCases"',
        "Accept-Encoding": "gzip,deflate",
      },
      body,
    };
    try {
      setLoading(true);
      const response = await fetch(url, fetchOptions);
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "application/xml");
      const errorMessage =
        xmlDoc.getElementsByTagName("ErrorMessage")[0]?.textContent;

      if (errorMessage || !response.ok) {
        console.error(errorMessage);
        setLoading(false);
        throw new Error("Erro ao se Registrar no Edital.");
      } else {
        toast.success("Registro no Edital Bem sucedido!");
        router.push("/");
        setLoading(false);
      }
      reset();
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("An unknown error occurred.");
      }
      console.error(e);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoaderIcon className="animate-spin size-8" />
      </div>
    );
  }
  return (
    <section className="h-full">
      <Tabs defaultValue="content" className="w-auto m-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="content" className="text-center">
            <span className="hidden lg:inline">Edital</span>
            <FileText className="inline lg:hidden w-6 h-6" />
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-center">
            <span className="hidden lg:inline">Documentos</span>
            <File className="inline lg:hidden w-6 h-6" />
          </TabsTrigger>
          <TabsTrigger value="qualificacaotecnica" className="text-center">
            <span className="hidden lg:inline">Qualificações Técnicas</span>
            <UserCheck className="inline lg:hidden w-6 h-6" />
          </TabsTrigger>
          <TabsTrigger value="consultants" className="text-center">
            <span className="hidden lg:inline">Equipe Técnica</span>
            <UserCheck className="inline lg:hidden w-6 h-6" />
          </TabsTrigger>
          <TabsTrigger value="anexos" className="text-center">
            <span className="hidden lg:inline">Anexos</span>
            <Paperclip className="inline lg:hidden w-6 h-6" />
          </TabsTrigger>
          <TabsTrigger value="historico" className="text-center">
            <span className="hidden lg:inline">Histórico</span>
            <History className="inline lg:hidden w-6 h-6" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="consultants">
          <ConsultantsArea />
        </TabsContent>
        <TabsContent value="documents">
          <InsertEditalDocuments documentosRequeridos={editalDocsPerCategory} />
        </TabsContent>
        <TabsContent value="qualificacaotecnica">
          <InsertQualificacaoTecnicaDocs areas={editalAreas} />
        </TabsContent>
        <TabsContent value="historico">
          <EditalHistory historico={history} />
        </TabsContent>
        <TabsContent value="anexos">
          {attachments.length > 0 && (
            <h2 className="text-lg text-center font-bold mb-4">Anexos</h2>
          )}
          <Attachments anexos={attachments} />
        </TabsContent>
        <TabsContent value="content" className="py-5">
          <div className="border-2 rounded-xl overflow-auto m-4 bg-neutral-300 text-neutral-600 h-full">
            <h1 className="text-center m-4 text-2xl font-bold">
              {" "}
              Edital : {currentEdital.NomeEdital}{" "}
            </h1>
            <h2 className="text-center text-lg">
              Data: {formatDate(currentEdital.InicioEdital)}
            </h2>
            <h1 className="text-center text-md font-semibold my-3">
              Clique no Link abaixo para visualizar as informaçoes atualizadas
              do edital.
            </h1>
            <ul className="my-3">
              <li className="text-center text-lg font-bold text-blue-600 underline ">
                <a
                  href={createBlobUrl(
                    currentEdital.ObjetoEditalBase64,
                    "application/pdf"
                  )}
                  target="_blank"
                >
                  Objeto do Edital
                </a>
              </li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end p-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              disabled={!permissaoDeCadastroEdital}
              className="float-end  bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all disabled:cursor-not-allowed disabled:pointer-events-auto disabled:shadow-none"
            >
              Confirmar Dados de Cadastro
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tem Certeza?</DialogTitle>
              <DialogDescription>
                Após confirmar, você não poderá alterar os dados cadastrados.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => enviarDadosEdital()}
                disabled={loading}
                className="bg-gradient-primary"
              >
                {loading ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  "Confirmar"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
