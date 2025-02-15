"use server";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { IEditalStore } from "@/store/EditalRegister";
import xmlJs from "xml-js";
import { prepararDocumentosCredenciada } from "@/lib/concatEditalDocuments"
import { useEditalStore } from "@/store/EditalRegister";
type IEdital = Pick<
  IEditalStore,
  "Consultores" | "Documentos" | "Qualificacao"
>;



export async function POST(req: Request) {
  const { Documentos } = useEditalStore()
  const newEdital: IEdital = await req.json();

  if (
    !newEdital.Consultores?.length ||
    !newEdital.Documentos?.length ||
    !newEdital.Qualificacao?.length
  ) {
    return NextResponse.json(
      { error: "Todos os campos devem ser preenchidos corretamente" },
      { status: 400 }
    );
  }

  const session = await auth();
  if (!session?.user?.idSCCredenciada) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  const url =
    "http://10.9.4.162/ESAmbienteBPMS/webservices/workflowenginesoa.asmx";

  const jsonToXml = (json: Partial<IEdital>) =>
    xmlJs.json2xml(JSON.stringify(json), { compact: true, spaces: 4 });
  const consultoresXml = jsonToXml({ Consultores: newEdital.Consultores });
  const documentosXml = prepararDocumentosCredenciada(newEdital.Documentos);
  const qualificacaoXml = jsonToXml({ Qualificacao: newEdital.Qualificacao });

  const body = `  
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
            <soap:Header/>
            <soap:Body>
                <tem:createCases>
                    <tem:entityInfo>
                        <BizAgiWSParam>
                            <Entities>
                                <FAMDemanda>
                                    <Consultores>
                                      ${consultoresXml}
                                    </Consultores>
                                    ${prepararDocumentosCredenciada(Documentos)}
                                    <Documentos>${documentosXml}</Documentos>
                                    <Qualificacao>${qualificacaoXml}</Qualificacao>
                                </FAMDemanda>
                            </Entities>
                        </BizAgiWSParam>
                    </tem:entityInfo>
                </tem:createCases>
            </soap:Body>
        </soap:Envelope>
    `;

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "text/xml",
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
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to register on edital data" },
      { status: 500 }
    );
  }
}
