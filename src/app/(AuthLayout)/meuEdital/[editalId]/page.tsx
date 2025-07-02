"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import DocsEmpresaAdj from "@/components/layout/Ajustes/DocsEmpresaAdj";
import DocsPessoaisConsultAdj from "@/components/layout/Ajustes/DocsPessoaisConsultAdj";
import DocsQualifTecEmpresaAdj from "@/components/layout/Ajustes/DocsQualifTecEmpresaAdj";
import DocsAreaConsultsAdj from "@/components/layout/Ajustes/DocsAreaConsultsAdj";

import { useEditalStore } from "@/store/EditalRegister";

import {
  DocumentoConsultor,
  DocumentoConsultorPorArea,
  DocumentosAgrupadosPorConsultorEArea,
  GrupoConsultor,
  DocumentoEmpresaAjuste,
} from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText, File, UserCheck } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  prepararDocumentosCredenciadaAjustes,
  prepararAreasCredenciadaAjustes,
  prepararConsultoresCredenciadaAjustes,
} from "@/lib/concatEditalAdjustmentsDocs";
import NoContent from "@/components/layout/NoContent";

export default function MyEditalPage() {
  const { editalId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cancelando, setCancelando] = useState(false);
  const [enviandoAjuste, setEnviandoAjuste] = useState(false);
  const [numeroCaso, setNumeroCaso] = useState<string | null>(null);
  const [justificativa, setJustificativa] = useState("");
  const [dataPrazo, setDataPrazo] = useState("");

  const {
    documentosEmpresaAjustes,
    documentosPessoaisConsultoresAjustes,
    DocumentosQualificacaoEmpresaAjustes,
    DocumentosQualificacaoConsultoresAjustes,
    permissaoCadastroAjuste,
    reset,
  } = useEditalStore();
  const [documentosDaEmpresa, setDocumentosDaEmpresa] = useState([]);
  const [documentosPessoaisConsultores, setDocumentosPessoaisConsultores] =
    useState<GrupoConsultor[]>([]);

  const [
    documentosQualificacaoTecnicaEmpresa,
    setDocumentosQualificacaoTecnicaEmpresa,
  ] = useState<Record<string, DocumentoEmpresaAjuste[]>>({});

  const [documentosDosConsultoresPorArea, setDocumentosDosConsultoresPorArea] =
    useState<DocumentosAgrupadosPorConsultorEArea>({});

  function agruparDocumentosDosConsultores(
    docs: DocumentoConsultorPorArea[]
  ): DocumentosAgrupadosPorConsultorEArea {
    return docs.reduce((acc, doc) => {
      if (doc.Aprovado === false) {
        const consultorKey = `${doc.Nome} - ${doc.idSCTecnico}`;
        const areaKey = doc.Parametrizacao;
        if (!acc[consultorKey]) acc[consultorKey] = {};
        if (!acc[consultorKey][areaKey]) acc[consultorKey][areaKey] = [];
        acc[consultorKey][areaKey].push(doc);
      }
      return acc;
    }, {} as DocumentosAgrupadosPorConsultorEArea);
  }

  function agruparDocsEmpresaPorParametrizacao(
    docs?: DocumentoEmpresaAjuste[]
  ) {
    return (docs || []).reduce((acc, doc) => {
      const key = doc.Parametrizacao;
      if (!acc[key]) acc[key] = [];
      acc[key].push(doc);
      return acc;
    }, {} as Record<string, DocumentoEmpresaAjuste[]>);
  }

  function agruparPorConsultor(array: DocumentoConsultor[]): GrupoConsultor[] {
    const agrupado: Record<string, DocumentoConsultor[]> = {};

    for (const doc of array) {
      if (!agrupado[doc.idSCTecnico]) agrupado[doc.idSCTecnico] = [];
      agrupado[doc.idSCTecnico].push(doc);
    }

    return Object.entries(agrupado).map(([idSCTecnico, documentos]) => ({
      nome: documentos[0]?.Nome ?? "",
      cpf: documentos[0]?.CPF ?? "",
      idSCTecnico,
      documentos,
    }));
  }

  const url = `${process.env.NEXT_PUBLIC_WEB_SERVICE}`;

  const enviarAjustes = useCallback(async () => {
    const body = `
              <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
                <soap:Header/>
                  <soap:Body>
                      <tem:performActivity>
                        <tem:activityInfo>
                          <BizAgiWSParam>
                            <domain>domain</domain>
                            <userName>admon</userName>
                            <ActivityData>
                              <radNumber>${numeroCaso}</radNumber>
                              <taskName>Activity_100</taskName>
                            </ActivityData>
                            <Entities>
                              <SCCredenciadasEdital>
                                ${await prepararDocumentosCredenciadaAjustes(
                                  documentosEmpresaAjustes
                                )}
                                  ${await prepararAreasCredenciadaAjustes(
                                    DocumentosQualificacaoEmpresaAjustes
                                  )}

                                ${await prepararConsultoresCredenciadaAjustes(
                                  documentosPessoaisConsultoresAjustes,
                                  DocumentosQualificacaoConsultoresAjustes
                                )}
                              </SCCredenciadasEdital>
                            </Entities>
                          </BizAgiWSParam>
                            </tem:activityInfo>
                          </tem:performActivity>
                  </soap:Body>
        </soap:Envelope>
          `;

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type":
          'application/soap+xml;charset=UTF-8;action="http://tempuri.org/performActivity"',
        "Accept-Encoding": "gzip,deflate",
      },
      body,
    };
    try {
      setEnviandoAjuste(true);
      const response = await fetch(url, fetchOptions);
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "application/xml");
      const errorMessageElements = xmlDoc.getElementsByTagName("errorMessage");
      const taskDisplayName = xmlDoc.getElementsByTagName("taskDisplayName");
      const taskDisplayNameMsg =
        taskDisplayName.length > 0 &&
        taskDisplayName[0].textContent === "Analisar Documentação";
      const errorMessage =
        errorMessageElements.length > 0
          ? errorMessageElements[0].textContent
          : null;

      if ((errorMessage || !response.ok) && !taskDisplayNameMsg) {
        console.error(
          "Erro retornado pelo sistema:",
          errorMessage || "Resposta não OK"
        );
        setEnviandoAjuste(false);
        throw new Error(
          errorMessage || "Erro ao Enviar os ajustes da inscrição."
        );
      } else {
        toast.success("Ajustes Enviados!");
        setEnviandoAjuste(false);
        router.push("/");
      }

      reset();
    } catch (e) {
      if (e instanceof Error) {
        toast.error("Erro ao Enviar os ajustes da inscrição.");
        console.error(e.message);
      } else {
        toast.error("An unknown error occurred.");
      }
      console.error(e);
      setEnviandoAjuste(false);
    }
  }, [
    url,
    numeroCaso,
    documentosEmpresaAjustes,
    DocumentosQualificacaoEmpresaAjustes,
    documentosPessoaisConsultoresAjustes,
    DocumentosQualificacaoConsultoresAjustes,
    reset,
    router,
  ]);

  const cancelarInscricao = useCallback(async () => {
    const body = `
              <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
                <soap:Header/>
                  <soap:Body>
                      <tem:performActivity>
                        <tem:activityInfo>
                          <BizAgiWSParam>
                            <domain>domain</domain>
                            <userName>admon</userName>
                            <ActivityData>
                              <radNumber>${numeroCaso}</radNumber>
                              <taskName>Activity_100</taskName>
                            </ActivityData>
                            <Entities>
                              <SCCredenciadasEdital>
                                <StatusCadastro entityName="SCStatusCredEdital" businessKey="Codigo='2'"/>
                              </SCCredenciadasEdital>
                            </Entities>
                          </BizAgiWSParam>
                            </tem:activityInfo>
                          </tem:performActivity>
                  </soap:Body>
        </soap:Envelope>
          `;

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type":
          'application/soap+xml;charset=UTF-8;action="http://tempuri.org/performActivity"',
        "Accept-Encoding": "gzip,deflate",
      },
      body,
    };
    try {
      setCancelando(true);
      const response = await fetch(url, fetchOptions);
      const text = await response.text();
      console.log(text);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "application/xml");

      const errorMessageElements = xmlDoc.getElementsByTagName("errorMessage");
      const errorMessage =
        errorMessageElements.length > 0
          ? errorMessageElements[0].textContent
          : null;

      if (!response.ok) {
        console.error(
          "Erro retornado pelo sistema:",
          errorMessage || "Resposta não OK"
        );
        setCancelando(false);
        throw new Error(errorMessage || "Erro ao cancelar inscrição.");
      } else {
        toast.success("Inscrição Cancelada!");
        setCancelando(false);
        setLoading(true);
        router.push("/");
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error("Erro ao cancelar inscrição.");
        console.error(e.message);
      } else {
        toast.error("An unknown error occurred.");
      }
      console.error(e);
      setCancelando(false);
    }
  }, [numeroCaso, router, url]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/myEditals/${editalId}`);
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const data = await res.json();
        console.log(data);
        const {
          documentosDaEmpresa,
          DocumentosQualificacaoTecnicaEmpresa,
          documentosPessoaisConsultores,
          documentosDosConsultoresPorArea,
        } = data;
        const rawCaseNumber =
          documentosDaEmpresa?.[0]?.NumeroCaso ??
          DocumentosQualificacaoTecnicaEmpresa?.[0]?.NumeroCaso ??
          documentosPessoaisConsultores?.[0]?.NumeroCaso ??
          documentosDosConsultoresPorArea?.[0]?.NumeroCaso;

        const rawJustificativa =
          documentosDaEmpresa?.[0]?.JustificativaNaoAprovacao ??
          DocumentosQualificacaoTecnicaEmpresa?.[0]
            ?.JustificativaNaoAprovacao ??
          documentosPessoaisConsultores?.[0]?.JustificativaNaoAprovacao ??
          documentosDosConsultoresPorArea?.[0]?.JustificativaNaoAprovacao;

        const dataPrazoAjustes =
          documentosDaEmpresa?.[0]?.DataPrazoAjustes ??
          DocumentosQualificacaoTecnicaEmpresa?.[0]?.DataPrazoAjustes ??
          documentosPessoaisConsultores?.[0]?.DataPrazoAjustes ??
          documentosDosConsultoresPorArea?.[0]?.DataPrazoAjustes;

        if (!rawJustificativa) {
          throw new Error("Não foi inserido justificativa.");
        }
        if (!rawCaseNumber) {
          throw new Error("Nenhum Número de Caso encontrado.");
        }
        if (!dataPrazoAjustes) {
          throw new Error("Nenhuma data de prazo foi informada.");
        }

        setDataPrazo(dataPrazoAjustes);
        setNumeroCaso(rawCaseNumber);
        setJustificativa(rawJustificativa);
        setDocumentosDaEmpresa(data.documentosDaEmpresa || []);
        setDocumentosPessoaisConsultores(
          agruparPorConsultor(data.documentosPessoaisConsultores || [])
        );
        setDocumentosDosConsultoresPorArea(
          agruparDocumentosDosConsultores(
            data.documentosDosConsultoresPorArea || []
          )
        );
        setDocumentosQualificacaoTecnicaEmpresa(
          agruparDocsEmpresaPorParametrizacao(
            data.DocumentosQualificacaoTecnicaEmpresa || []
          )
        );
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar edital:", err);
      }
    };

    fetchData();
  }, [editalId, numeroCaso]);
  const nomeEdital = (() => {
    const values = Object.values(documentosDosConsultoresPorArea);
    if (!values.length) return null;
    const firstAreaDocs = Object.values(values[0]);
    if (!firstAreaDocs.length) return null;
    return firstAreaDocs[0]?.[0]?.NomeEdital ?? null;
  })();

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoaderIcon className="animate-spin size-8" />
      </div>
    );
  }

  return (
    <section className="space-y-6 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Realizar Ajustes - {nomeEdital ?? editalId}
      </h1>

      <Tabs defaultValue="justificativaEmpresa" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="justificativaEmpresa" className="text-center">
            <span className="hidden lg:inline">Justificativa</span>
            <FileText className="inline lg:hidden w-6 h-6" />
          </TabsTrigger>
          <TabsTrigger value="ajustesDocumentosEmpresa" className="text-center">
            <span className="hidden lg:inline">Documentos da Empresa</span>
            <FileText className="inline lg:hidden w-6 h-6" />
          </TabsTrigger>
          <TabsTrigger value="docspessoaisconsultores" className="text-center">
            <span className="hidden lg:inline">
              Docs. Pessoais dos Consultores
            </span>
            <File className="inline lg:hidden w-6 h-6" />
          </TabsTrigger>
          <TabsTrigger value="docsqualificacaotecnica" className="text-center">
            <span className="hidden lg:inline">Qualificações Técnicas</span>
            <UserCheck className="inline lg:hidden w-6 h-6" />
          </TabsTrigger>
          <TabsTrigger value="docsequipetecnica" className="text-center">
            <span className="hidden lg:inline">Equipe Técnica</span>
            <UserCheck className="inline lg:hidden w-6 h-6" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ajustesDocumentosEmpresa">
          <DocsEmpresaAdj documentosParaAjustes={documentosDaEmpresa} />
        </TabsContent>
        <TabsContent value="justificativaEmpresa">
          <NoContent texto={justificativa} data={dataPrazo} />
        </TabsContent>
        <TabsContent value="docspessoaisconsultores">
          <DocsPessoaisConsultAdj
            documentosDosConsultoresParaAjustes={documentosPessoaisConsultores}
          />
        </TabsContent>
        <TabsContent value="docsqualificacaotecnica">
          <DocsQualifTecEmpresaAdj
            DocumentosQualificacaoEmpresaAjustesProp={
              documentosQualificacaoTecnicaEmpresa
            }
          />
        </TabsContent>
        <TabsContent value="docsequipetecnica">
          <DocsAreaConsultsAdj
            DocumentosDosConsultoresPorAreaAjustesProp={
              documentosDosConsultoresPorArea
            }
          />
        </TabsContent>
      </Tabs>
      <section className="mt-6 flex justify-end space-x-4">
        <Button onClick={() => router.back()} variant="outline" type="button">
          Voltar
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Cancelar Inscrição</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Cancelar Inscrição</DialogTitle>
              <DialogDescription>
                Tem certeza de que deseja cancelar a inscrição? Esta ação não
                pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                disabled={cancelando}
                type="button"
                variant="destructive"
                onClick={cancelarInscricao}
              >
                {cancelando ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  "Confirmar Cancelamento da Inscrição"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          disabled={
            enviandoAjuste ||
            !Object.values(permissaoCadastroAjuste).every(
              (status) => status === true
            )
          }
          onClick={() => enviarAjustes()}
        >
          {enviandoAjuste ? <LoaderIcon className="animate-spin" /> : "Enviar"}
        </Button>
      </section>
    </section>
  );
}
