"use server";
import { signIn as _signIn } from "@/auth";
import { AuthError } from "next-auth";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

type FormState = {
  error: {
    message: string;
    id: string;
  } | null;
};

export default async function signIn(_: FormState, formData: FormData) {
  try {
    await _signIn("credentials", {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: {
          message:
            error.cause?.err?.message || "Ocorreu um erro na autenticação",
          id: nanoid(10),
        },
      };
    }

    if (isRedirectError(error)) {
      return { error: null };
    }

    return {
      error: {
        message: "Um erro desconhecido ocorreu",
        id: nanoid(10),
      },
    };
  }

  redirect("/home");
}
