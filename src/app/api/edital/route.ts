"use server";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { Document, IEditalStore } from "@/store/EditalRegister";
import xmlJs from "xml-js";

type IEdital = Pick<IEditalStore, "Consultores" | "Documentos" | "Qualificacao">;
//TODO  CONTINUAR AQUI
export async function POST(req: Request) {
    const newEdital: IEdital = await req.json();

    if (!newEdital.Consultores?.length || !newEdital.Documentos?.length || !newEdital.Qualificacao?.length) {
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

    const url = "http://10.9.4.162/ESAmbienteBPMS/webservices/entitymanagersoa.asmx";

    const jsonToXml = (json: Partial<IEdital>) =>
        xmlJs.json2xml(JSON.stringify(json), { compact: true, spaces: 4 });
    const consultoresXml = jsonToXml({ Consultores: newEdital.Consultores });
    const documentosXml = prepararDocumentosCredenciada(newEdital.Documentos);
    const qualificacaoXml = jsonToXml({ Qualificacao: newEdital.Qualificacao });

    const body = `  
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
            <soap:Header/>
            <soap:Body>
                <tem:saveEntity>
                    <tem:entityInfo>
                        <BizAgiWSParam>
                            <Entities>
                                <FAMDemanda>
                                    <Consultores>${consultoresXml}</Consultores>
                                    <Documentos>${documentosXml}</Documentos>
                                    <Qualificacao>${qualificacaoXml}</Qualificacao>
                                </FAMDemanda>
                            </Entities>
                        </BizAgiWSParam>
                    </tem:entityInfo>
                </tem:saveEntity>
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

function prepararDocumentosCredenciada(documents: Document[]): string {
    let xml = "<DocumentosCredenciado>";
    for (const document of documents) {
        xml += `
            <Documento>
                <Categoria>${document.category}</Categoria>
                <Arquivo>
                    <File fileName="${document.title}">${document.blob}</File>
                </Arquivo>
            </Documento>
        `;
    }
    xml += "</DocumentosCredenciado>";
    return xml;
}
