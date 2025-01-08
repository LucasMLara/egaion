import prisma from "@/db";
import { compareSync } from "bcryptjs";

type User = {
  password?: string;
  email: string;
  name: string;
}
export async function findUserByCredentials(email: string, password: string): Promise<User | null> {
  const user = await prisma.sCCredenciada.findFirst({
    where: {
      Email: email
    }
  })

  if (!user) {
    return null;
  }

  const passwordMatch = compareSync(password, user.Senha as string);

  if (passwordMatch) {

    return {
      email: user.Email as string,
      name: user.RazaoSocial as string,
    }
  }

  return null;

}
