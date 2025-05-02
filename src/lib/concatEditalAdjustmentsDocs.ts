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
  const agrupadoPorArea = Areas.reduce<Record<string, Document[]>>((acc, doc) => {
    const area = doc.areaName || "Desconhecida";
    if (!acc[area]) acc[area] = [];
    acc[area].push(doc);
    return acc;
  }, {});

  let xml = "<NiveisFinais>";

  for (const areaName in agrupadoPorArea) {
    const docsDaArea = agrupadoPorArea[areaName];

    xml += `\n  <SCParametrizacaoEdital>`;
    xml += `\n    <Parametrizacao>${areaName}</Parametrizacao>`;
    const agrupadoPorModalidade = docsDaArea.reduce<Record<string, Document[]>>((acc, doc) => {
      const modalidade = doc.modalidade || "Desconhecida";
      if (!acc[modalidade]) acc[modalidade] = [];
      acc[modalidade].push(doc);
      return acc;
    }, {});

    for (const modalidade in agrupadoPorModalidade) {
      const docsDaModalidade = agrupadoPorModalidade[modalidade];
      xml += `\n    <${modalidade}>`;

      for (const doc of docsDaModalidade) {
        xml += `\n      <File fileName="${doc.fileName}">${await getBase64(
          new File([doc.turnToBase64], doc.title)
        )}</File>`;
      }

      xml += `\n    </${modalidade}>`;
    }

    xml += `\n  </SCParametrizacaoEdital>`;
  }

  xml += `\n </NiveisFinais>`;

  return xml;
}


export async function prepararConsultoresCredenciadaAjustes(
  DocsPessoais: Document[],
  DocsPorArea: Document[]
): Promise<string> {
  // Função auxiliar para extrair o ID do consultor (limpa espaços)
  const getConsultorId = (doc: Document) => doc.idSCTecnico?.trim();

  // Agrupar documentos pessoais por consultorId
  const docsPessoaisPorConsultor: Record<string, Document[]> = {};
  for (const doc of DocsPessoais) {
    const consultorId = getConsultorId(doc);
    if (!consultorId) continue;
    if (!docsPessoaisPorConsultor[consultorId]) {
      docsPessoaisPorConsultor[consultorId] = [];
    }
    docsPessoaisPorConsultor[consultorId].push(doc);
  }

  // Agrupar documentos por área por consultorId
  const docsPorAreaPorConsultor: Record<string, Record<string, Document[]>> = {};
  for (const doc of DocsPorArea) {
    const consultorId = getConsultorId(doc);
    const area = doc.areaName?.trim();
    if (!consultorId || !area) continue;
    if (!docsPorAreaPorConsultor[consultorId]) {
      docsPorAreaPorConsultor[consultorId] = {};
    }
    if (!docsPorAreaPorConsultor[consultorId][area]) {
      docsPorAreaPorConsultor[consultorId][area] = [];
    }
    docsPorAreaPorConsultor[consultorId][area].push(doc);
  }

  let xml = `<Consultores>`;

  const todosConsultores = new Set([
    ...Object.keys(docsPessoaisPorConsultor),
    ...Object.keys(docsPorAreaPorConsultor)
  ]);

  for (const consultorId of todosConsultores) {
    xml += `
      <SCConsultorEdital>
        <SCTecnico entityName="SCTecnico" businessKey="idSCTecnico='${consultorId}'">`;

    const docsPessoais = docsPessoaisPorConsultor[consultorId] ?? [];
    for (const doc of docsPessoais) {
      const tipo = doc.tipo ?? "DocumentosPessoais";
      const fileName = doc.fileName ?? "SemNome.pdf";
      xml += `
          <${tipo}>
            <File fileName="${fileName}">mock64</File>
          </${tipo}>`;
    }

    xml += `
        </SCTecnico>
        <NiveisParametrizacao>`;

    const docsAreaPorParam = docsPorAreaPorConsultor[consultorId] ?? {};
    for (const [parametrizacao, docs] of Object.entries(docsAreaPorParam)) {
      xml += `
          <SCConsultorNivel>
            <Parametrizacao>${parametrizacao}</Parametrizacao>
            <Documento>`;
      for (const doc of docs) {
        const fileName = doc.fileName ?? "SemNome.pdf";
        xml += `
              <File fileName="${fileName}">mock64</File>`;
      }
      xml += `
            </Documento>
          </SCConsultorNivel>`;
    }

    xml += `
        </NiveisParametrizacao>
      </SCConsultorEdital>`;
  }

  xml += `
  </Consultores>`;

  return xml;
}
