"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { currentDate, formatDate } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { history } from "@/mocks";
import Attachments from "@/components/layout/Attachments";
import InsertEditalDocuments from "@/components/layout/InsertEditalDocuments";
import { useEditalStore } from "@/store/EditalRegister";
import { useRouter } from "next/navigation";
import InsertQualificacaoTecnicaDocs from "@/components/layout/InsertQualificacaoTecnicaDocs";
import ConsultantsArea from "@/components/layout/ConsultantsArea";
import { FileText, File, UserCheck, Paperclip, History } from "lucide-react";
import { IAvailableEdital } from "@/store/useAvailableEditals/types";



export default function EditalId({
  params,
}: {
  params: {
    editalId: string;
  };
}) {
  const router = useRouter();
  const { permissaoDeCadastroEdital, Consultores, Documentos, Qualificacao } =
    useEditalStore();

  const initialCurrentEditalState = {
    idSCEdital: "",
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
      serializedEditalHistory: []
  }
    const [currentEdital, setCurrentEdital] = useState<IAvailableEdital>(initialCurrentEditalState);

    useEffect(() => {
      async function fetchEdital() {
          try {
              const response = await fetch(`/api/${params.editalId}`);
              const data = await response.json();
              setCurrentEdital(data);
              if (!response.ok) {
                  console.error("Error:", data.error || data.message);
              } else {
                  console.log("Edital data:", data);
              }
          } catch (error) {
              console.error("Fetch error:", error);
          }
      }
      if (params.editalId) {
          fetchEdital();
      }
  }, [params.editalId]);
  
  console.log("Current Edital:", currentEdital.serializedEditalHistory);
  
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
          <InsertEditalDocuments />
        </TabsContent>
        <TabsContent value="qualificacaotecnica">
          <InsertQualificacaoTecnicaDocs />
        </TabsContent>
        <TabsContent value="historico">
          <h2 className="text-lg text-center font-bold mb-4">Histórico</h2>
          <div className="border-2 rounded-xl overflow-auto m-4 bg-neutral-300 text-neutral-600 h-full">
            <ul className="m-4">
              {history.map((item, index) => (
                <li key={index} className="m-4">
                  <span> {item.date}</span>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p>{item.status}</p>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="anexos">
          <h2 className="text-lg text-center font-bold mb-4">Anexos</h2>
          {/* //TODO Receber por props */}
          <Attachments />
        </TabsContent>
        <TabsContent value="content" className="py-5">
          <div className="border-2 rounded-xl overflow-auto m-4 bg-neutral-300 text-neutral-600 h-full">
            <h1 className="text-center m-4 text-2xl font-bold">
              {" "}
              Edital : {currentEdital.NomeEdital}{" "}
            </h1>
            <h2 className="text-center text-lg">Data: {formatDate(currentEdital.InicioEdital)}</h2>
            <h1 className="text-center text-md font-semibold my-3">
              Clique no Link abaixo para visualizar as informaçoes atualizadas
              do edital.
            </h1>
            <ul className="my-3">
              <li className="text-center text-lg font-bold ">
                <a href="https://www.egaion.com.br/" target="_blank">
                  Egaion
                </a>
              </li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end p-5">
        <Button
          className="float-end  bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all disabled:cursor-not-allowed disabled:pointer-events-auto disabled:shadow-none"
          disabled={!permissaoDeCadastroEdital}
          onClick={() => {
            console.log(
              "Consultores",
              Consultores,
              "Documentos",
              Documentos,
              "Qualificacao",
              Qualificacao
            );
            router.push(`/${params.editalId}/confirmarDados`);
          }}
        >
          Confirmar Dados de Cadastro
        </Button>
      </div>
    </section>
  );
}
