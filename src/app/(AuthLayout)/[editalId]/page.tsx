"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { currentDate } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploader from "@/components/myCustomInputs/FileUploader";
import { mockInputsEmpresa, history } from "@/mocks";
import { FileTextIcon, ClipboardIcon, CheckCircleIcon } from "lucide-react";
import CreateConsultant from "@/components/layout/CreateConsultant";
import Attachments from "@/components/layout/Attachments";

export default function page({
  params,
}: {
  params: {
    editalId: string;
  };
}) {
  return (
    <section className="h-full">
      <Tabs defaultValue="content" className="w-auto m-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="content" className="text-center">
            Edital
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-center">
            Documentos
          </TabsTrigger>
          <TabsTrigger value="cadastroConsultor" className="text-center">
            Consultor
          </TabsTrigger>
          <TabsTrigger value="anexos" className="text-center">
            Anexos
          </TabsTrigger>
          <TabsTrigger value="historico" className="text-center">
            Histórico
          </TabsTrigger>
        </TabsList>
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
        <TabsContent value="documents">
          <Tabs
            defaultValue={`${Object.keys(mockInputsEmpresa[0])[0]}`}
            className="w-auto"
          >
            <TabsList className={`grid w-full grid-cols-3`}>
              {mockInputsEmpresa.map((item, index) => {
                const categoryKey = Object.keys(item)[0];
                return (
                  <TabsTrigger
                    key={index}
                    value={categoryKey}
                    className="text-center"
                  >
                    <span className="hidden md:inline">{categoryKey}</span>
                    {categoryKey.match(/jurídica/i) && (
                      <FileTextIcon className="inline md:hidden" />
                    )}
                    {categoryKey.match(/regularidade/i) && (
                      <ClipboardIcon className="inline md:hidden" />
                    )}
                    {categoryKey.match(/atestado/i) && (
                      <CheckCircleIcon className="inline md:hidden" />
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <div>
              {mockInputsEmpresa.map((item, index) => {
                const categoryKey = Object.keys(item)[0];
                const filesArray = item[categoryKey];
                return (
                  <TabsContent key={index} value={categoryKey}>
                    <h2 className="text-lg text-center font-bold mb-4">
                      {categoryKey}
                    </h2>
                    {filesArray.map((fileItem, fileIndex) => {
                      const fileKey = Object.keys(fileItem)[0];
                      const fileLabel = fileItem[fileKey];
                      return (
                        <FileUploader
                          label={fileLabel}
                          titulo={fileKey}
                          key={fileIndex}
                          arquivo=""
                          onchange={() => {}}
                        />
                      );
                    })}
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
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
          <Attachments />
        </TabsContent>
        <TabsContent value="cadastroConsultor">
          <CreateConsultant />
        </TabsContent>
      </Tabs>
      <div className="flex justify-end p-5">
        <Button className="float-end  bg-gradient-primary">Cadastrar</Button>
      </div>
    </section>
  );
}
