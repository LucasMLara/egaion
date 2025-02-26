"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEditalStore } from "@/store/EditalRegister";
import { useSession } from "next-auth/react";
import {
  prepararDocumentosCredenciada,
  prepararConsultoresCredenciada,
  prepararAreasCredenciada,
} from "@/lib/concatEditalDocuments";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";


export default function ConfirmaDados() {
  const [loading, setLoading] = useState(false)
  
  const router = useRouter();
  const { Consultores, Qualificacao, Documentos, currentEditalId } = useEditalStore();

  const { data } = useSession()

  const idScCredenciada = data?.user.idSCCredenciada
  
  async function enviarDadosEdital() {
    const url = "http://192.168.2.149/EGAION/webservices/workflowenginesoa.asmx";
    const body = `
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
          <soap:Header/>
            <soap:Body>
                <tem:createCases>
                  <tem:casesInfo>
                    <BizAgiWSParam>
                        <Cases>
                          <Case>
                        <Process>CadastrarCredenciadaNoEdit</Process>
                                  <Entities>
                                      <SCCredenciadasEdital>
                                        <StatusCadastro entityName="SCStatusCredEdital" businessKey="Codigo='3'"/>
                                            <SCEdital businessKey="idSCEdital='${currentEditalId}'"/>
                                            <Credenciada entityName="SCCredenciada" businessKey="idSCCredenciada='${idScCredenciada}'"/>
                                              ${await prepararDocumentosCredenciada(Documentos)}
                                            ${await prepararAreasCredenciada(Qualificacao)}
                                                ${await prepararConsultoresCredenciada(Consultores, idScCredenciada)}
                                      </SCCredenciadasEdital>
                            </Entities>
                            </Case>
                          </Cases>
                        </BizAgiWSParam>
                      </tem:casesInfo>
                    </tem:createCases>
            </soap:Body>
  </soap:Envelope>
    `;

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type":
          'application/soap+xml;charset=UTF-8;action="http://tempuri.org/createCases"',
        "Accept-Encoding": "gzip,deflate",
      },
      body,
    };

    try{
      setLoading(true)
      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
        throw new Error("Erro ao se Registrar no Edital.");
      }
      toast.success('Registro no Edital Bem sucedido!')
      router.push('/')
      setLoading(false)
    }catch(e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("An unknown error occurred.");
      }
      console.error(e)
      setLoading(false)
    }
}
  return (
    <div className="rounded w-full md:w-4/6 bg-neutral-500 flex flex-col items-center content-center md:mx-auto mt-14 p-5">
      <h3 className="scroll-m-20 text-2xl font-bold tracking-tight mb-5">
        Atenção:
      </h3>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Antes de prosseguir, por favor, verifique todos os dados inseridos.
        Certifique-se de que todas as informações estão corretas, pois após a
        confirmação, não será possível alterá-las.
      </h4>
      <div className="flex flex-wrap m-4 p-4 justify-evenly w-full">
        <Button onClick={() => router.back()} variant="ghost">
          Voltar
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">Cadastrar</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tem Certeza?</DialogTitle>
              <DialogDescription>
                Após confirmar, você não poderá alterar os dados cadastrados.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={ () => enviarDadosEdital()}
                disabled={loading}
                className="bg-gradient-primary"

              >
                {loading ? <LoaderIcon className="animate-spin" /> : "Confirmar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
