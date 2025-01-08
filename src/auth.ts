import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentials } from "./users";
import { z } from "zod";

const hour = 60 * 60;

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    maxAge: 24 * hour,
  },
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
        const schema = z.object({
          email: z
            .string()
            .min(1, "Email é obrigatório")
            .email("Email inválido"),
          password: z.string(),
        });

        const { error: schemaError } = schema.safeParse(credentials);

        if (schemaError) {
          throw new Error(schemaError.errors[0].message);
        }

        const user = await findUserByCredentials(credentials.email as string, credentials.password as string);

        if (!user) {
          throw new Error("Suas credenciais estão incorretas");
        }

        return user;
      },
    }),
  ],
});
