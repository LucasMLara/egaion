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
import { prepararDocumentosCredenciadaAjustes } from "@/lib/concatEditalAdjustmentsDocs";

export default function MyEditalPage() {
  const { editalId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cancelando, setCancelando] = useState(false);
  const [enviandoAjuste, setEnviandoAjuste] = useState(false);
  const [numeroCaso, setNumeroCaso] = useState<string | null>(null);
  const {
    documentosEmpresaAjustes,
    reset,
    documentosPessoaisConsultoresAjustes,
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
        const consultorKey = `${doc.Nome}`;
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
      if (!agrupado[doc.CPF]) agrupado[doc.CPF] = [];
      agrupado[doc.CPF].push(doc);
    }

    return Object.entries(agrupado).map(([cpf, documentos]) => ({
      nome: documentos[0]?.Nome ?? "", // segurança básica
      cpf,
      documentos,
    }));
  }
  const url = "http://192.168.2.149/EGAION/webservices/workflowenginesoa.asmx";

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

    console.log(body);
    // try {
    //   setEnviandoAjuste(true);
    //   const response = await fetch(url, fetchOptions);
    //   const text = await response.text();
    //   console.log(text);

    //   const parser = new DOMParser();
    //   const xmlDoc = parser.parseFromString(text, "application/xml");

    //   const errorMessageElements = xmlDoc.getElementsByTagName("errorMessage");
    //   const errorMessage =
    //     errorMessageElements.length > 0
    //       ? errorMessageElements[0].textContent
    //       : null;

    //   if (errorMessage || !response.ok) {
    //     console.error(
    //       "Erro retornado pelo sistema:",
    //       errorMessage || "Resposta não OK"
    //     );
    //     setEnviandoAjuste(false);
    //     throw new Error(
    //       errorMessage || "Erro ao Enviar os ajustes da inscrição."
    //     );
    //   } else {
    //     toast.success("Ajustes Enviados!");
    //     setEnviandoAjuste(false);
    //   }
    // } catch (e) {
    //   if (e instanceof Error) {
    //     toast.error("Erro ao Enviar os ajustes da inscrição.");
    //     console.error(e.message);
    //   } else {
    //     toast.error("An unknown error occurred.");
    //   }
    //   console.error(e);
    //   setEnviandoAjuste(false);
    // }
  }, [numeroCaso, documentosEmpresaAjustes]);

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
  }, [numeroCaso, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/myEditals/${editalId}`);
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const data = await res.json();
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

        if (!rawCaseNumber) {
          throw new Error("Nenhum Número de Caso encontrado.");
        }

        setNumeroCaso(rawCaseNumber);
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
      <section className="mt-6 flex justify-end space-x-4">
        <Button onClick={() => router.back()} variant="outline" type="button">
          Voltar
        </Button>
        <Button onClick={() => reset()} variant="destructive" type="button">
          RESETA
        </Button>
        <Button
          onClick={() => {
            // console.log(
            //   "DocumentosQualificacaoConsultoresAjustes",
            //   DocumentosQualificacaoConsultoresAjustes
            // );
            // console.log(
            //   "DocumentosQualificacaoEmpresaAjustes",
            //   DocumentosQualificacaoEmpresaAjustes
            // );
            console.log(
              "documentosPessoaisConsultoresAjustes",
              documentosPessoaisConsultoresAjustes
            );
            // console.log(
            //   "documentosPessoaisConsultoresAjustes",
            //   documentosPessoaisConsultoresAjustes
            // );
          }}
          variant="ghost"
          type="button"
        >
          LOGAR STATE
        </Button>
        <Dialog>
          {/* <DialogTrigger asChild>
            <Button variant="outline">Cancelar Inscrição</Button>
          </DialogTrigger> */}
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
        <Button disabled={enviandoAjuste} onClick={() => enviarAjustes()}>
          {cancelando ? <LoaderIcon className="animate-spin" /> : "Enviar"}
        </Button>
      </section>
      <Tabs defaultValue="docspessoaisconsultores" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
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
    </section>
  );
}
