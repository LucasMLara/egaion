"use server";
import { auth } from "@/auth";
import { IEditalStore } from "@/store/EditalRegister";
import { NextResponse } from "next/server";
import xmlJs from "xml-js";

type IEdital = Pick<IEditalStore, 'Consultores' | 'Documentos' | 'Qualificacao'>;

export default async function EditalRegister(newEdital: IEdital) {
    if (!newEdital.Consultores?.length || !newEdital.Documentos?.length || !newEdital.Qualificacao?.length) {
        throw new Error("Todos os campos devem ser preenchidos corretamente");
    }

    const session = await auth();
    if (!session?.user?.idSCCredenciada) {
        return NextResponse.json(
            { error: "Usuario não autenticado" },
            { status: 401 }
        );
    }

    const url = "http://10.9.4.162/ESAmbienteBPMS/webservices/entitymanagersoa.asmx";

    const jsonToXml = (json: Partial<IEdital>) =>
        xmlJs.json2xml(JSON.stringify(json), { compact: true, spaces: 4 });
    const consultoresXml = jsonToXml({ Consultores: newEdital.Consultores });
    const documentosXml = jsonToXml({ Documentos: newEdital.Documentos });
    const qualificacaoXml = jsonToXml({ Qualificacao: newEdital.Qualificacao });

    const body = `  
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
            <soap:Header/>
            <soap:Body>
                <tem:setEvent>
                    <tem:eventInfo>
                        <BizAgiWSParam>
                            <domain>domain</domain>
                            <userName>admon</userName>
                            <Events>
                                <Events>
                                    <EventData>
                                        <radNumber>${1 || "defaultRadNumber"}</radNumber>
                                        <eventName>EvtRevisao</eventName>
                                    </EventData>
                                    <Entities>
                                        <FAMDemanda>
                                            <Consultores>${consultoresXml}</Consultores>
                                            <Documentos>${documentosXml}</Documentos>
                                            <Qualificacao>${qualificacaoXml}</Qualificacao>
                                        </FAMDemanda>
                                    </Entities>
                                </Events>
                            </Events>
                        </BizAgiWSParam>
                    </tem:eventInfo>
                </tem:setEvent>
            </soap:Body>
        </soap:Envelope>
    `;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/xml",
        },
        body,
    });

    if (!response.ok) {
        throw new Error("Failed to send SOAP request");
    }

    return NextResponse.json({ success: true });
}
