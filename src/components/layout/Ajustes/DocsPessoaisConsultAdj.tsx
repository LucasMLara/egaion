import { DocumentoConsultor } from "@/types/types";

export default function DocsPessoaisConsultAdj({
  documentosDosConsultoresParaAjustes,
}: {
  documentosDosConsultoresParaAjustes: Record<string, DocumentoConsultor[]>;
}) {
  console.log(
    "documentosDosConsultoresParaAjustes",
    documentosDosConsultoresParaAjustes
  );
  return <div>DocsPessoaisConsultAdj</div>;
}
