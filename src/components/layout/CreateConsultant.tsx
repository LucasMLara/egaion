import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { mockInputsConsultor } from "@/mocks";

export default function CreateConsultant() {
  return (
    <section className="my-6">
      <h1 className="text-2xl font-bold text-neutral-700 text-center">
        Detalhes
      </h1>
      <form className="flex flex-col m-9 gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 my-2 flex-grow">
            <Label htmlFor="nome">Nome</Label>
            <Input
              className="transition-all w-full"
              id="nome"
              type="nome"
              required
              name="nome"
            />
          </div>
          <div className="flex flex-col gap-2 my-2 flex-grow">
            <Label htmlFor="CPF">CPF</Label>
            <Input
              className="transition-all w-full"
              id="CPF"
              type="CPF"
              name="CPF"
            />
          </div>
          <div className="flex flex-col gap-2 my-2 flex-grow">
            <Label htmlFor="email">Email</Label>
            <Input
              className="transition-all w-full"
              id="email"
              type="email"
              name="email"
              placeholder="egaion@pentago.com.br"
            />
          </div>
          <div className="flex flex-col gap-2 my-2 flex-grow">
            <Label htmlFor="confirmEmail">Confirmar E-mail</Label>
            <Input
              className="transition-all w-full"
              id="confirmEmail"
              type="confirmEmail"
              name="confirmEmail"
              placeholder="egaion@pentago.com.br"
            />
          </div>

          <div className="flex flex-col gap-2 my-2 flex-grow">
            <Label htmlFor="contato">Telefone</Label>
            <Input
              className="transition-all w-full"
              id="contato"
              type="text"
              name="contato"
            />
          </div>
        </div>
        <div className="flex flex-wrap m-3 p-3 gap-3">
          {mockInputsConsultor[0].documentoConsultor.map((input, index) => {
            const key = Object.keys(input)[0];
            const value = Object.values(input)[0];
            return (
              <div key={index} className="flex flex-col gap-2 my-2 flex-grow">
                <Label htmlFor={key}>{value}</Label>
                <Input
                  className="transition-all w-full"
                  id={key}
                  type="file"
                  name={key}
                />
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-end mt-4">
          <Button
            type="submit"
            className="bg-gradient-primary hover:shadow-lg hover:shadow-gray-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-auto disabled:shadow-none w-64"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </section>
  );
}
