"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { currentDate } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { history } from "@/mocks";
import Attachments from "@/components/layout/Attachments";
import InsertEditalDocuments from "@/components/layout/InsertEditalDocuments";
import { useEditalStore } from "@/store/EditalRegister";
import { useRouter } from "next/navigation";
import InsertQualificacaoTecnicaDocs from "@/components/layout/InsertQualificacaoTecnicaDocs";
import ConsultantsArea from "@/components/layout/ConsultantsArea";
import { FileText, File, UserCheck, Paperclip, History } from "lucide-react";

export default function EditalId({
  params,
}: {
  params: {
    editalId: string;
  };
}) {
  const router = useRouter();
  const { Qualificacao, Consultores } = useEditalStore();
  return (
    <section className="h-full">
      <Tabs defaultValue="consultants" className="w-auto m-4">
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
            <span className="hidden lg:inline">Qualificaçoes Técnicas</span>
            <UserCheck className="inline lg:hidden w-6 h-6" />
          </TabsTrigger>
          <TabsTrigger value="consultants" className="text-center">
            <span className="hidden lg:inline">Consultores</span>
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
          <Attachments />
        </TabsContent>
        <TabsContent value="content" className="py-5">
          <div className="border-2 rounded-xl overflow-auto m-4 bg-neutral-300 text-neutral-600 h-full">
            <h1 className="text-center m-4 text-2xl font-bold">
              {" "}
              Edital : {params.editalId}{" "}
            </h1>
            <h2 className="text-center text-lg">Data: {currentDate}</h2>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
            <p className="text-center m-4">
              {" "}
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem
              ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem ipsun
              lorem ipsun lorem ipsun{" "}
            </p>
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end p-5">
        <Button
          className="float-end  bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all disabled:cursor-not-allowed disabled:pointer-events-auto disabled:shadow-none"
          // disabled={permissaoDeEnvio}
          onClick={() => {
            router.push(`/${params.editalId}/confirmarDados`);
          }}
        >
          Confirmar Dados de Cadastro
        </Button>
      </div>
    </section>
  );
}
