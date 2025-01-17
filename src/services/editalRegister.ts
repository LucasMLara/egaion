"use server";
import { formatDocEntry, sanitizeData } from "@/lib/utils";
import { IEditalStore } from "@/store/EditalRegister";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import xmlJs from "xml-js";


type IEdital = Pick<IEditalStore, 'Consultores' | 'Documentos' | 'Qualificacao' | 'consultantAreaDocuments'>;

export default async function EditalRegister(newEdital: IEdital) {
    if (newEdital.Consultores.length === 0 || newEdital.Documentos.length === 0 || newEdital.Qualificacao.length === 0 || newEdital.consultantAreaDocuments.length === 0) {
        throw new Error("Todos os campos devem ser preenchidos corretamente");
    }

    const session = await auth();

    if (!session || !session.user?.idSCCredenciada) {
        return NextResponse.json(
            { error: "Usuario não autenticado" },
            { status: 401 }
        );
    }
    const url = "http://10.9.4.162/ESAmbienteBPMS/webservices/entitymanagersoa.asmx";
    const userId = session.user.idSCCredenciada;
    const { Consultores, Documentos, Qualificacao, consultantAreaDocuments } = newEdital;

    const body = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">\
        <soap:Header/>\
        <soap:Body>\
            <tem:setEvent>\
                <tem:eventInfo>\
                    <BizAgiWSParam>\
                        <domain>domain</domain>\
                        <userName>admon</userName>\
                        <Events>\
                            <Events>\
                                <EventData>\
                                  <radNumber>${Nprocesso}</radNumber>\
                                  <eventName>EvtRevisao</eventName>\
                                </EventData>\
                                <Entities>\
                                    <FAMDemanda key="${idFAMDemanda}">\
                                    <NomeFeiraEventoNegocio>${NomeFeiraEventoNegocio}</NomeFeiraEventoNegocio>\
                                    <Localidade>${Localidade}</Localidade>\
                                    <DataInicio>${DataInicio}</DataInicio>\
                                    <DataFim>${DataFim}</DataFim>\
                                    <HorarioFuncionamento>${HorarioFuncionamento}</HorarioFuncionamento>\
                                    <ValorEntradaVisitantes>${ValorEntradaVisitantes}</ValorEntradaVisitantes>\
                                    <EmpresaRealizadoraFeira>${EmpresaRealizadoraFeira.id}</EmpresaRealizadoraFeira>\
                                    <RepresentanteRealizadora>${RepresentanteRealizadora}</RepresentanteRealizadora>\
                                    <CpfRepresentRealizadora>${CpfRepresentRealizadora}</CpfRepresentRealizadora>\
                                    <EmpresaOrganizadoraFeira>${EmpresaOrganizadoraFeira.id}</EmpresaOrganizadoraFeira>\
                                    <RepresentanteOrganizadora>${RepresentanteOrganizadora}</RepresentanteOrganizadora>\
                                    <CpfRepresentOrganizadora>${CpfRepresentOrganizadora}</CpfRepresentOrganizadora>\
                                    <EmpApoiadorasParceriaEvt>${EmpApoiadorasParceriaEvt}</EmpApoiadorasParceriaEvt>\
                                    <DescritivodoEventoObjetivo>${DescritivodoEventoObjetivo}</DescritivodoEventoObjetivo>\
                                    <ExpectativadePublicoExposi>${ExpectativadePublicoExposi}</ExpectativadePublicoExposi>\
                                    <ExpectativaPublVisitante>${ExpectativaPublVisitante}</ExpectativaPublVisitante>\
                                    <DadosUltimas3Edicoes>${DadosUltimas3Edicoes}</DadosUltimas3Edicoes>\
                                    <PlanoComunicacaoEvento>${PlanoComunicacaoEvento}</PlanoComunicacaoEvento>\
                                    <ValorLocacaoAreaLivre>${ValorLocacaoAreaLivre}</ValorLocacaoAreaLivre>\
                                    <ValorLocacaoAreaMontada>${ValorLocacaoAreaMontada}</ValorLocacaoAreaMontada>\
                                    <EstruturadeMontagemeInsumo>${EstruturadeMontagemeInsumo}</EstruturadeMontagemeInsumo>\
                                    <TaxasAdicionais>${TaxasAdicionais}</TaxasAdicionais>\
                                    <OutrosbeneficiosLocacao>${OutrosbeneficiosLocacao}</OutrosbeneficiosLocacao>\
                                    <InformacoesAdicionais>${InformacoesAdicionais}</InformacoesAdicionais>\
                                    ${PlantaBaixa != null
            ? "<PlantaBaixa><File fileName=\"" + PlantaBaixa.name + "\">" + await getBase64(PlantaBaixa) +
            "<\/File><\/PlantaBaixa>"
            : ""
        }
                                    ${ComprovantedeExclusividade != null
            ? "<ComprovantedeExclusividade><File fileName=\"" + ComprovantedeExclusividade.name + "\">" +
            await getBase64(ComprovantedeExclusividade) +
            "<\/File><\/ComprovantedeExclusividade>"
            : ""
        }
                                    ${ContratosLocacaoEspaco != null
            ? "<ContratosLocacaoEspaco><File fileName=\"" + ContratosLocacaoEspaco.name + "\">" +
            await getBase64(ContratosLocacaoEspaco) +
            "<\/File><\/ContratosLocacaoEspaco>"
            : ""
        }
                                    ${ManualExpositorRegrasExpo != null
            ? "<ManualExpositorRegrasExpo><File fileName=\"" + ManualExpositorRegrasExpo.name + "\">" +
            await getBase64(ManualExpositorRegrasExpo) +
            "<\/File><\/ManualExpositorRegrasExpo>"
            : ""
        }
                                    </FAMDemanda>\
                                </Entities>\
                            </Events>\
                        </Events>\
                    </BizAgiWSParam>\
                </tem:eventInfo>\
            </tem:setEvent>\
        </soap:Body>\
    </soap:Envelope>`;

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type":
                "application/soap+xml;charset=UTF-8;action='http://tempuri.org/setEvent'",
        },
        body,
    };


    try {
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            throw new Error(`Erro na requisição: Status => ${response.status}`);
        }
        const xmlText = await response.text();
        const jsonData = xmlJs.xml2json(xmlText, { compact: true, spaces: 4 });
        const xmlData = JSON.parse(jsonData);
        return xmlData;
    } catch (error) {
        console.error("Error fetching XML data:", error);
        throw new Error("Houve um erro ao se registrar no edital.");
    }

}

function getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === "string") {
                resolve(btoa(reader.result));
            } else {
                reject(new Error("The file could not be read as a string."));
            }
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsBinaryString(file);
    });
}
