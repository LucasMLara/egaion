import { Document, Qualificacao } from "@/store/EditalRegister";
import { IConsultant } from "@/types/types";
import { formatDocEntry } from "./utils";

function formatTitle(title: string): string {
  return title
    .replace(/\sde\s/g, "")
    .replace(/[éê]/g, "e")
    .replace(/\s(\w)/g, (_, letter) => letter.toUpperCase());
}
// nova versao para usar depois.
// export function getBase64(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const result = reader.result as string;
//       // DataURL vem tipo: "data:application/pdf;base64,JVBERi0xLjQKJ..."
//       const base64 = result.split(',')[1]; // pega só o que importa
//       resolve(base64);
//     };
//     reader.onerror = (error) => reject(error);
//     reader.readAsDataURL(file);
//   });
// }

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

export async function prepararDocumentosCredenciadaAjustes(
  documents: Document[]
): Promise<string> {
  let xml = "<Documentos>";
  for (const document of documents) {
    console.log(document)
    xml += `
            <SCDocCredenciadaEdital entityName="SCDocCredenciadaEdital">
            <DadosDocumento entityName="SCDocumentacao" businessKey="idSCDocumentacao=${document.id
      }"/>
                <Arquivo>
                    <File fileName="${document.fileName}">${await getBase64(
        new File([document.turnToBase64], document.fileName as string)
      )}</File>
                </Arquivo>
            </SCDocCredenciadaEdital>
        `;
  }
  xml += "</Documentos>";
  return xml;
}


export async function prepararAreasCredenciadaAjustes(
  Areas: Document[]
): Promise<string> {
  console.log(Areas)
  let xml = "<NiveisFinais>";



  xml += `\n</NiveisFinais>`;
  return xml;
}


export async function prepararConsultoresCredenciada(
  consultants: IConsultant[],
  idSCCredenciada: string
): Promise<string> {
  let xml = "<Consultores>";
  for (const consultor of consultants) {
    xml += `
        <SCConsultorEdital>
          <SCTecnico entityName="SCTecnico">
            <Email>${consultor.email.email}</Email>
            <Whatsapp>${formatDocEntry(consultor.contato)}</Whatsapp>
            <CPF>${formatDocEntry(consultor.CPF)}</CPF>
            <Assinante>True</Assinante>
            <Telefone>${formatDocEntry(consultor.contato)}</Telefone>
            <SCCredenciada>${idSCCredenciada}</SCCredenciada>
            <EResponsavelLegal>True</EResponsavelLegal>
            <Nome>${consultor.nome}</Nome>
            <DocumentosPessoais>
              <File fileName="${consultor.consultantCPF.name}">
                ${await getBase64(new File([consultor.consultantCPF], consultor.consultantCPF.name))}
              </File>
            </DocumentosPessoais>
            <ComprovanteVinculoPJ>
              <File fileName="${consultor.comprovanteVinculoCNPJ.name}">
                ${await getBase64(new File([consultor.comprovanteVinculoCNPJ], consultor.comprovanteVinculoCNPJ.name))}
              </File>
            </ComprovanteVinculoPJ>
            <CompFormacaoAcademica>
              <File fileName="${consultor.comprovanteFormacaoAcademica.name}">
                ${await getBase64(new File([consultor.comprovanteFormacaoAcademica], consultor.comprovanteFormacaoAcademica.name))}
              </File>
            </CompFormacaoAcademica>
            <RegistroProfissional>
              <File fileName="${consultor.registroProfissionalClasse.name}">
                ${await getBase64(new File([consultor.registroProfissionalClasse], consultor.registroProfissionalClasse.name))}
              </File>
            </RegistroProfissional>
          </SCTecnico>
          <NiveisParametrizacao>`;

    // ** Group documents by areaId **
    const groupedAreas = new Map<string, { areaName: string; documents: File[] }>();

    for (const nivel of consultor.areaDocuments || []) {
      if (!groupedAreas.has(nivel.areaId)) {
        groupedAreas.set(nivel.areaId, { areaName: nivel.areaName, documents: [] });
      }
      groupedAreas.get(nivel.areaId)?.documents.push(nivel.files);
    }

    // ** Process grouped areas ** (Fix iteration over Map)
    for (const [areaId, { areaName, documents }] of Array.from(groupedAreas.entries())) {
      // Find matching area in consultor.areas
      const area = consultor.areas?.find(a => a.id === areaId);
      const naturezas = area?.naturezas ?? [];

      // Generate XML for `naturezas`
      const naturezasXML = naturezas
        .map(
          (natureza: string) => `
              <SCNaturezaNivel>
                <NaturezaPrestacao entityName="SCNaturezaPrestacao" businessKey="Codigo='${natureza}'"/>
              </SCNaturezaNivel>`
        )
        .join("");

      // Generate XML for all `Documento` inside one `SCConsultorNivel`
      const documentosXML = await Promise.all(
        documents.map(
          async (file: File) => `
              <Documento>
                <File fileName="${file.name}">
                  ${await getBase64(new File([file], file.name))}
                </File>
              </Documento>`
        )
      );

      xml += `
            <SCConsultorNivel>
              ${documentosXML.join("")}
              <Parametrizacao>${areaName}</Parametrizacao>
              <NaturezasPrestacao>
                ${naturezasXML} 
              </NaturezasPrestacao>
            </SCConsultorNivel>`;
    }

    xml += `</NiveisParametrizacao>`;

    if (consultor.localidades && consultor.localidades.length > 0) {
      xml += `<Localidades>`;
      for (const localidade of consultor.localidades) {
        xml += `
            <SCLocalidadeConsult>
              <Localidade entityName="SCLocalidade" businessKey="idSCLocalidade='${localidade.idSCLocalidade}'"/>
              <Prioridade>${localidade.prioridade}</Prioridade>
            </SCLocalidadeConsult>`;
      }
      xml += `</Localidades>`;
    }

    xml += `</SCConsultorEdital>`;
  }
  xml += `</Consultores>`;
  return xml;
}


