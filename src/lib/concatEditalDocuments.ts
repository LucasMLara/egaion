import { Document, Qualificacao } from "@/store/EditalRegister";
import { IConsultant } from "@/types/types";
import { formatDocEntry } from "./utils";

function formatTitle(title: string): string {
  return title
    .replace(/\sde\s/g, "")
    .replace(/[éê]/g, "e")
    .replace(/\s(\w)/g, (_, letter) => letter.toUpperCase());
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

export async function prepararAreasCredenciada(
  Areas: Qualificacao[]
): Promise<string> {
  let xml = "<NiveisFinais>";

  for (const area of Areas) {
    const nivelParametrizacaoEdital = area.subLevels.length + 1;
    xml += `\n    <SCParametrizacaoEdital>`;

    if (area.areaId) {
      xml += `\n        <Nivel${nivelParametrizacaoEdital}Parametrizacao entityName="SCNivel${nivelParametrizacaoEdital}Parametrizacao" businessKey="idSCNivel${nivelParametrizacaoEdital}Parametrizacao='${area.areaId}'"/>`;
    }

    xml += `\n        <Parametrizacao>${area.name}</Parametrizacao>`;

    if (Array.isArray(area.subLevels) && area.subLevels.length > 0) {
      xml += generateNivelXML(area.subLevels, 2);
    }

    if (
      Array.isArray(area.naturezaPrestacao) &&
      area.naturezaPrestacao.length > 0
    ) {
      xml += `\n        <NaturezasPrestacao>`;
      for (const natureza of area.naturezaPrestacao) {
        xml += `\n            <SCNaturezaNivel>\n                <NaturezaPrestacao entityName="SCNaturezaPrestacao" businessKey="Codigo='${natureza.id}'"/>\n            </SCNaturezaNivel>`;
      }
      xml += `\n        </NaturezasPrestacao>`;
    }

    const categories = ["AtestadoCapacidadeTecnica", "RelatoExperiencia"];
    const categorizedDocuments: Record<string, Document[]> = {
      AtestadoCapacidadeTecnica: [],
      RelatoExperiencia: [],
    };

    for (const doc of area.AreaDocuments || []) {
      const docCategory = doc.category
        ? formatTitle(doc.category)
        : "undefined";
      if (docCategory && categories.includes(docCategory)) {
        categorizedDocuments[docCategory].push(doc);
      }
    }

    for (const category of categories) {
      if (categorizedDocuments[category].length > 0) {
        xml += `\n        <${category}>`;

        for (const doc of categorizedDocuments[category]) {
          if (doc.title && doc.blob) {
            xml += `\n            <File fileName="${
              doc.title
            }">${await getBase64(
              new File([doc.turnToBase64], doc.title)
            )}</File>`;
          }
        }

        xml += `\n        </${category}>`;
      }
    }

    xml += `\n    </SCParametrizacaoEdital>`;
  }

  xml += `\n</NiveisFinais>`;
  return xml;
}

function generateNivelXML(levels: any[], depth: number): string {
  if (!Array.isArray(levels) || levels.length === 0) return "";

  let xml = "";

  for (const level of levels) {
    if (!level.areaId) continue;

    xml += `\n        <Nivel${depth}Parametrizacao entityName="SCNivel${depth}Parametrizacao" businessKey="idSCNivel${depth}Parametrizacao='${level.areaId}'"/>`;

    if (Array.isArray(level.subLevels) && level.subLevels.length > 0) {
      xml += generateNivelXML(level.subLevels, depth + 1);
    }
  }

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
                        <File fileName="${
                          consultor.consultantCPF.name
                        }">${await getBase64(
      new File([consultor.consultantCPF], consultor.consultantCPF.name)
    )}</File>
                    </DocumentosPessoais>
                    <ComprovanteVinculoPJ>
                        <File fileName="${
                          consultor.comprovanteVinculoCNPJ.name
                        }">${await getBase64(
      new File(
        [consultor.comprovanteVinculoCNPJ],
        consultor.comprovanteVinculoCNPJ.name
      )
    )}</File>
                    </ComprovanteVinculoPJ>
                    <CompFormacaoAcademica>
                        <File fileName="${
                          consultor.comprovanteFormacaoAcademica.name
                        }">${await getBase64(
      new File(
        [consultor.comprovanteFormacaoAcademica],
        consultor.comprovanteFormacaoAcademica.name
      )
    )}</File>
                    </CompFormacaoAcademica>
                    <RegistroProfissional>
                        <File fileName="${
                          consultor.registroProfissionalClasse.name
                        }">${await getBase64(
      new File(
        [consultor.registroProfissionalClasse],
        consultor.registroProfissionalClasse.name
      )
    )}</File>
                    </RegistroProfissional>
                </SCTecnico>
                <NiveisParametrizacao>`;
    for (const nivel of consultor.areaDocuments || []) {
      xml += `
                    <SCConsultorNivel>
                        <Documento>
                        <File fileName="${nivel.files.name}">${await getBase64(
        new File([nivel.files], nivel.areaId)
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
            <DadosDocumento entityName="SCDocumentacao" businessKey="idSCDocumentacao=${
              document.idSCDocumentacao
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
