"use server";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import {
  prepararDocumentosCredenciada,
  prepararConsultoresCredenciada,
  prepararAreasCredenciada,
} from "@/lib/concatEditalDocuments";
import { IConsultant } from "@/types/types";
import { Document, Qualificacao } from "@/store/EditalRegister";

type EditalRegisterParams = {
  Documentos: Document[];
  Qualificacao: Qualificacao[];
  Consultores: IConsultant[];
  currentEditalId: string;
};

export default async function EditalRegister({
  Documentos,
  Qualificacao,
  Consultores,
  currentEditalId,
}: EditalRegisterParams) {
  const session = await auth();
  if (!session?.user?.idSCCredenciada) {
    return NextResponse.json(
      { error: "Usuario não autenticado" },
      { status: 401 }
    );
  }

  const url = "http://192.168.2.149/EGAION/webservices/workflowenginesoa.asmx";

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
                                            <Credenciada entityName="SCCredenciada" businessKey="idSCCredenciada='${
                                              session?.user?.idSCCredenciada
                                            }'"/>
                                              ${prepararDocumentosCredenciada(
                                                Documentos
                                              )}
                                            ${prepararAreasCredenciada(
                                              Qualificacao
                                            )}
                                                ${prepararConsultoresCredenciada(
                                                  Consultores,
                                                  session?.user?.idSCCredenciada
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
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error("Failed to send SOAP request");
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to register on edital data" },
      { status: 500 }
    );
  }
}
