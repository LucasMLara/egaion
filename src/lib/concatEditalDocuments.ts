import { Document } from "@/store/EditalRegister";


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