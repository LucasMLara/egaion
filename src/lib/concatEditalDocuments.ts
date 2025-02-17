import { Document, Qualificacao } from "@/store/EditalRegister";
import { IConsultant } from "@/types/types";
import { formatDocEntry } from "./utils";

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

export async function prepararAreasCredenciada(Areas: Qualificacao[]): Promise<string> {
    let xml = "<NiveisFinais>";

    for (const area of Areas) {
        xml += `
            <SCParametrizacaoEdital>
                <Parametrizacao>${area.name}</Parametrizacao>`;
        for (let i = 1; i <= 7; i++) {
            const nivelId = area.areaId ? area.areaId : "";
            xml += `
                <Nivel${i}Parametrizacao entityName="SCNivel${i}Parametrizacao" ${nivelId ? `businessKey="idSCNivel${i}Parametrizacao='${nivelId}'"` : ""}/>`;
        }

        if (area.naturezaPrestacao.length > 0) {
            xml += `
                <NaturezasPrestacao>`;
            for (const natureza of area.naturezaPrestacao) {
                xml += `
                    <SCNaturezaNivel>
                        <NaturezaPrestacao entityName="SCNaturezaPrestacao" businessKey="Codigo='${natureza.id}'"/>
                    </SCNaturezaNivel>`;
            }
            xml += `
                </NaturezasPrestacao>`;
        }

        //TODO as categorias dos documentos são tags predefinidas que devem ter um FOR por categoria dentro para adicionar os documentos
        const categorizedDocuments: Record<string, Document[]> = {};
        for (const doc of area.AreaDocuments) {
            console.log(doc.category); // TODO CONSOLE LOG PRA MOSTRAR ONDE ESTA A CATEGORIA QUE DEVERÁ SER FILTRADA AO ADICIONAR OS DOCS NAS TAGS

            if (!categorizedDocuments[doc.category || "Uncategorized"]) {
                categorizedDocuments[doc.category || "Uncategorized"] = [];
            }
            categorizedDocuments[doc.category || "Uncategorized"].push(doc);
        }

        for (const [category, documents] of Object.entries(categorizedDocuments)) {
            xml += `
                <${category.replace(/\s+/g, '')}>`;
            for (const doc of documents) {
                if (doc.idSCDocumentacao && doc.blob) {
                    xml += `
                        <File fileName="${doc.title}">${doc.blob}</File>`;
                }
            }
            xml += `
                </${category.replace(/\s+/g, '')}>`;
        }

        xml += `
            </SCParametrizacaoEdital>`;
    }

    xml += "</NiveisFinais>";
    return xml;
}


// export async function prepararAreasCredenciada(Areas: Qualificacao[]): Promise<string> {
//     let xml = "<NiveisFinais>";
//     for (const area of Areas) {
//         xml += `
//             <SCParametrizacaoEdital>
//                 <Parametrizacao>${area.name}</Parametrizacao>`;
//         for (const natureza of area.naturezaPrestacao) {
//             xml += `
//                 <NaturezaPrestacao entityName="SCNaturezaPrestacao" businessKey="idSCNaturezaPrestacao=${natureza.id}"/>`;
//         }
//         `<Nivel${area.areaId}Parametrizacao entityName="SCNivel${area.areaId}Parametrizacao" businessKey="idSCNivel${area.areaId}Parametrizacao=${area.areaId}"/>
//                 <NaturezaPrestacao entityName="SCNaturezaPrestacao" businessKey="idSCNaturezaPrestacao=${area.naturezaPrestacao[0].id}"/>
//                 <Documentos entityName="SCDocumentacao" businessKey="idSCDocumentacao=${area.AreaDocuments[0].idSCDocumentacao}"/>
//             </SCParametrizacaoEdital>
//         `;
//     }
//     xml += "</NiveisFinais>";
//     return xml;
// }

export async function prepararConsultoresCredenciada(consultants: IConsultant[], idSCCredenciada: string): Promise<string> {


    let xml = "<Consultores>";
    for (const consultor of consultants) {
        xml += `
            <SCConsultorEdital>
                <SCTecnico entityName="SCTecnico"/>
                    <Email>${consultor.email.email}</Email>
                    <Whatsapp>${formatDocEntry(consultor.contato)}</Whatsapp>
                    <CPF>${formatDocEntry(consultor.CPF)}</CPF>
                    <Assinante>True</Assinante>
                    <Telefone>${formatDocEntry(consultor.contato)}</Telefone>
                    <SCCredenciada>${idSCCredenciada}</SCCredenciada>
                    <EResponsavelLegal>True</EResponsavelLegal>
                    <Nome>${consultor.nome}</Nome>
                    <DocumentosPessoais>
                        <File fileName="${consultor.consultantCPF.name}">${await getBase64(
            new File([consultor.consultantCPF], consultor.consultantCPF.name)
        )}</File>
                    </DocumentosPessoais>
                    <ComprovanteVinculoPJ>
                        <File fileName="${consultor.comprovanteVinculoCNPJ.name}">${await getBase64(
            new File([consultor.comprovanteVinculoCNPJ], consultor.comprovanteVinculoCNPJ.name)
        )}</File>
                    </ComprovanteVinculoPJ>
                    <CompFormacaoAcademica>
                        <File fileName="${consultor.comprovanteFormacaoAcademica.name}">${await getBase64(
            new File([consultor.comprovanteFormacaoAcademica], consultor.comprovanteFormacaoAcademica.name)
        )}</File>
                    </CompFormacaoAcademica>
                    <RegistroProfissional>
                        <File fileName="${consultor.registroProfissionalClasse.name}">${await getBase64(
            new File([consultor.registroProfissionalClasse], consultor.registroProfissionalClasse.name)
        )}</File>
                    </RegistroProfissional>
                </SCTecnico>
                <NiveisParametrizacao>`;
        for (const nivel of consultor.areaDocuments || []) {
            xml += `
                    <SCConsultorNivel>
                        <Documento>
                        <File fileName="${nivel.files}">${await getBase64(
                new File([nivel.files], nivel.files)
            )}</File>
                        </Documento>
                        <Parametrizacao>${nivel.areaId}</Parametrizacao>
                    </SCConsultorNivel>`;
        }
        xml += `
                </NiveisParametrizacao>
            </SCConsultorEdital>
        `;

    }
    xml += `</Consultores>`;
    return xml;
}

export async function prepararDocumentosCredenciada(
    documents: Document[]
): Promise<string> {
    let xml = "<Documentos>";
    for (const document of documents) {
        xml += `
            <SCDocCredenciadaEdital entityName="SCDocCredenciadaEdital">
            <DadosDocumento entityName="SCDocumentacao" businessKey="idSCDocumentacao=${document.idSCDocumentacao}"/>
                <Arquivo>
                    <File fileName="${document.title}">${await getBase64(
            new File([document.blob], document.title)
        )}</File>
                </Arquivo>
            </SCDocCredenciadaEdital>
        `;
    }
    xml += "</Documentos>";
    return xml;
}