import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { users } from "./users";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "E-mail",
          required: true,
        },
        password: {
          type: "password",
          label: "Senha",
          required: true,
        },
      },
      authorize: async (credentials) => {
        const user = users[credentials.email as keyof typeof users];

        if (!user) {
          throw new Error("Usuário não cadastrado");
        }

        if (
          !bcrypt.compareSync(credentials.password as string, user.password)
        ) {
          throw new Error("Senha incorreta");
        }

        return {
          email: credentials.email as string,
        };
      },
    }),
  ],
});
