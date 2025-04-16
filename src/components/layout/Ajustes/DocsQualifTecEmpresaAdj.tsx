import {
  DocumentoEmpresaAjuste,
  generateEmpresaAreaDocsSchema,
} from "@/types/types";
import { useForm } from "react-hook-form";
import { object, z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditalStore } from "@/store/EditalRegister";
import { useMemo } from "react";

function agruparPorParametrizacaoEDocumento(
  docs: DocumentoEmpresaAjuste[]
): Record<string, DocumentoEmpresaAjuste[]> {
  return docs.reduce((acc, doc) => {
    const key = `${doc.Parametrizacao}|||${doc.NomeInput}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(doc);
    return acc;
  }, {} as Record<string, DocumentoEmpresaAjuste[]>);
}

interface Props {
  DocumentosQualificacaoEmpresaAjustesProp: Record<
    string,
    DocumentoEmpresaAjuste[]
  >;
}

export default function DocsQualifTecEmpresaAdj({
  DocumentosQualificacaoEmpresaAjustesProp,
}: Props) {
  const {
    cadastrarDocumentosQualificacaoEmpresaAjustes,
    removerDocumentosQualificacaoEmpresaAjustes,
    DocumentosQualificacaoEmpresaAjustes,
  } = useEditalStore();

  console.log(DocumentosQualificacaoEmpresaAjustesProp);

  const x = Object.values(DocumentosQualificacaoEmpresaAjustesProp).flat();

  const schema = generateEmpresaAreaDocsSchema(x);

  type FormSchema = z.infer<typeof schema>;

  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <div className="space-y-6">
      {Object.entries(DocumentosQualificacaoEmpresaAjustesProp).map(
        ([area, docs]) => {
          return (
            <div key={area}>
              {area}
              <div>
                {docs.map((doc) => (
                  <>
                    <Label>{doc.NomeInput}</Label>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,image/jpeg,image/jpg"
                      key={doc.NomeInput}
                      {...register(doc.NomeInput as keyof FormSchema)}
                      onChange={async (e) => {
                        const filesArray = Array.from(e.target.files || []);
                        setValue(doc.NomeInput as any, filesArray);
                        const isValid = await trigger(doc.NomeInput as any);

                        if (isValid) {
                          const documentosConvertidos = filesArray.map(
                            (file) => ({
                              title: doc.NomeInput,
                              blob: URL.createObjectURL(file),
                              id: doc.idSCCredenciada,
                              turnToBase64: file,
                            })
                          );

                          documentosConvertidos.forEach((doc) =>
                            cadastrarDocumentosQualificacaoEmpresaAjustes(doc)
                          );
                        }
                      }}
                    />
                  </>
                ))}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
