"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import DocsEmpresaAdj from "@/components/layout/Ajustes/DocsEmpresaAdj";
import DocsPessoaisConsultAdj from "@/components/layout/Ajustes/DocsPessoaisConsultAdj";
import DocsQualifTecEmpresaAdj from "@/components/layout/Ajustes/DocsQualifTecEmpresaAdj";
import DocsAreaConsultsAdj from "@/components/layout/Ajustes/DocsAreaConsultsAdj";

import { toast } from "sonner";
import {
  DocumentoConsultor,
  DocumentoConsultorPorArea,
  DocumentoQualificacao,
  DocumentosAgrupadosPorConsultorEArea,
  DocumentoSimples,
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
import { FileText, File, UserCheck, Paperclip, History } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyEditalPage() {
  const { editalId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [documentosDaEmpresa, setDocumentosDaEmpresa] = useState([]);
  const [documentosPessoaisConsultores, setDocumentosPessoaisConsultores] =
    useState<Record<string, DocumentoConsultor[]>>({});
  const [
    documentosQualificacaoTecnicaEmpresa,
    setDocumentosQualificacaoTecnicaEmpresa,
  ] = useState<Record<string, DocumentoQualificacao[]>>({});
  const [documentosDosConsultoresPorArea, setDocumentosDosConsultoresPorArea] =
    useState<DocumentosAgrupadosPorConsultorEArea>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/myEditals/${editalId}`);
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const data = await res.json();

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
  }, [editalId]);

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

  function agruparDocsEmpresaPorParametrizacao(docs?: DocumentoQualificacao[]) {
    return (docs || []).reduce((acc, doc) => {
      const key = doc.Parametrizacao;
      if (!acc[key]) acc[key] = [];
      acc[key].push(doc);
      return acc;
    }, {} as Record<string, DocumentoQualificacao[]>);
  }

  function agruparPorConsultor(
    array: DocumentoConsultor[]
  ): Record<string, DocumentoConsultor[]> {
    return array.reduce((acc, doc) => {
      if (!acc[doc.CPF]) acc[doc.CPF] = [];
      acc[doc.CPF].push(doc);
      return acc;
    }, {} as Record<string, DocumentoConsultor[]>);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log("Form submitted");
    // event.preventDefault();

    // const form = event.target as HTMLFormElement;
    // const fileInputs =
    //   form.querySelectorAll<HTMLInputElement>('input[type="file"]');
    // const allFilled = Array.from(fileInputs).every(
    //   (input) => input.files && input.files.length > 0
    // );

    // if (!allFilled) {
    //   toast.error(
    //     "Você deve preencher todos os campos de arquivo antes de enviar."
    //   );
    //   return;
    // }

    // const formData = new FormData();

    // fileInputs.forEach((input) => {
    //   const name = input.name; // já está nomeado no render por tipo
    //   const files = input.files!;

    //   if (input.multiple) {
    //     Array.from(files).forEach((file, idx) => {
    //       formData.append(`${name}[${idx}]`, file);
    //     });
    //   } else {
    //     formData.append(name, files[0]);
    //   }
    // });
    // console.log("FormData:", formData);
  }

  const nomeEdital = (() => {
    const values = Object.values(documentosDosConsultoresPorArea);
    if (!values.length) return null;
    const firstAreaDocs = Object.values(values[0]);
    if (!firstAreaDocs.length) return null;
    return firstAreaDocs[0]?.[0]?.NomeEdital ?? null;
  })();

  // if (loading) {
  //   return (
  //     <div className="h-full flex justify-center items-center">
  //       <LoaderIcon className="animate-spin size-8" />
  //     </div>
  //   );
  // }
  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Realizar Ajustes - {nomeEdital ?? editalId}
      </h1>
      <Tabs defaultValue="ajustesDocumentosEmpresa" className="w-full">
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
          <DocsPessoaisConsultAdj />
        </TabsContent>
        <TabsContent value="docsqualificacaotecnica">
          <DocsQualifTecEmpresaAdj />
        </TabsContent>
        <TabsContent value="docsequipetecnica">
          <DocsAreaConsultsAdj />
        </TabsContent>
      </Tabs>
      {/* {documentosDaEmpresa.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-2">Documentos da Empresa</h2>
          {documentosDaEmpresa.map((doc, index) => (
            <div key={`empresa-${doc.Nome}-${index}`} className="space-y-1">
              <Label>{doc.Nome}</Label>
              <Input type="file" name={`empresa-${doc.Nome}`} />
            </div>
          ))}
        </section>
      )} */}

      {/* {Object.entries(documentosPessoaisConsultores).map(([cpf, docs]) => (
        <section key={cpf}>
          <h2 className="text-xl font-bold mb-2">
            Documentos Pessoais dos Consultores
          </h2>
          <div>
            <h3 className="font-semibold mt-4">
              Consultor: {docs[0]?.Nome || cpf}
            </h3>
            {docs.map((doc, index) => (
              <div
                key={`${cpf}-${doc.NomeInput}-${index}`}
                className="space-y-1"
              >
                <Label>{doc.NomeInput}</Label>
                <Input type="file" name={`pessoal-${cpf}-${doc.NomeInput}`} />
              </div>
            ))}
          </div>
        </section>
      ))} */}

      {/* {Object.entries(documentosQualificacaoTecnicaEmpresa).map(
        ([param, docs]) => (
          <section key={param}>
            <h2 className="text-xl font-bold mb-2">
              Documentos de Qualificação Técnica da Empresa
            </h2>
            <div className="space-y-2 mt-4">
              <h3 className="font-semibold">{param}</h3>
              {docs.map((doc, index) => (
                <div
                  key={`${param}-${doc.NomeInput}-${index}`}
                  className="space-y-1"
                >
                  <Label>{doc.NomeInput}</Label>
                  <Input
                    type="file"
                    multiple
                    name={`qualificacao-${param}-${doc.NomeInput}`}
                  />
                </div>
              ))}
            </div>
          </section>
        )
      )} */}

      {/* {Object.entries(documentosDosConsultoresPorArea).map(
        ([consultorKey, areas]) => (
          <section key={consultorKey} className="space-y-4 mt-6">
            <h2 className="text-xl font-bold mb-2">
              Documentos dos Consultores por Área
            </h2>
            <h3 className="font-semibold">{consultorKey}</h3>
            {Object.entries(areas).map(([area, docs]) => (
              <div key={area} className="space-y-2 ml-4">
                <h4 className="text-sm font-medium text-gray-700">
                  Área: {area}
                </h4>
                {docs.map((doc, index) => (
                  <div
                    key={`${consultorKey}-${area}-${doc.NomeInput}-${index}`}
                    className="space-y-1"
                  >
                    <Label>{doc.NomeInput}</Label>
                    <Input
                      type="file"
                      multiple
                      name={`consultor-area-${consultorKey}-${area}-${doc.NomeInput}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </section>
        )
      )} */}
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
              <Button type="button" variant="destructive">
                Confirmar Cancelamento da Inscrição
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button type="submit">Enviar</Button>
      </section>
    </form>
  );
}
