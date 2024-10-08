import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { users } from "./users";
import bcrypt from "bcryptjs";
import { z } from "zod";

const hour = 60 * 60;

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    maxAge: 24 * hour, // 24 hours
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

        const user = users[credentials.email as keyof typeof users];

        if (
          !user ||
          !bcrypt.compareSync(credentials.password as string, user.password)
        ) {
          throw new Error("Suas credenciais estão incorretas");
        }

        return {
          email: credentials.email as string,
        };
      },
    }),
    Google,
  ],
});
