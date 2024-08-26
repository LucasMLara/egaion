import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useEditalStore } from "@/store/EditalRegister";

type ConsultantCard = {
  id: string;
  name: string;
  email: string;
  telefone: string;
};
export default function ConsultantCard({
  email,
  id,
  name,
  telefone,
}: ConsultantCard) {
  const { removerConsultor } = useEditalStore();
  return (
    <Card className={`size-52 hover:shadow-xl transition-all`}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{email}</CardDescription>
        <CardDescription>{telefone}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          className="bg-gradient-primary w-full"
          onClick={() => removerConsultor(id)}
        >
          Remover Consultor
        </Button>
      </CardFooter>
    </Card>
  );
}
