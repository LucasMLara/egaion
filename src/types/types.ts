import { z } from "zod";

export const SignUpSchema = z.object({
  razaoSocial: z.string().min(3, "Campo obrigatório"),
  email: z
    .object({
      email: z.string().email("Email inválido"),
      emailConfirmation: z.string().email("Email inválido"),
    })
    .refine((data) => data.email === data.emailConfirmation, {
      message: "Os emails não são iguais",
      path: ["emailConfirmation"],
    }),
  password: z
    .object({
      password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
      passwordConfirmation: z
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres"),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Suas senhas não coincidem",
      path: ["passwordConfirmation"],
    }),
  CNPJ: z.string().min(14, "O CNPJ deve ter 14 caracteres"),
  telefone: z.string().min(11, "O telefone deve ter 11 caracteres"),
});

export const DocInputSchema = z.object({
  padrao: z.boolean().optional(),
  titulo: z.string(),
  label: z.string(),
  arquivo: z.string(),
  onchange: z.function(),
});

export const DocSchema = z.object({
  docId: z.string(),
  docTitle: z.string(),
  docContent: z.string(),
  docStatus: z.union([
    z.literal("ok"),
    z.literal("pending"),
    z.literal("error"),
    z.literal(null),
  ]),
  docDate: z.string(),
  docDialogTitle: z.string(),
  docDialogDescription: z.string(),
  docDialogContent: z.string(),
});

export const TeamMember = z.object({
  id: z.string(),
  contact: z.number(),
  docNumber: z.string(),
  status: z.union([
    z.literal("OK"),
    z.literal("Documento Pendente"),
    z.literal("Documento Reprovado"),
  ]),
  email: z.string(),
});

export const EditalSchema = z.object({
  status: z.union([
    z.literal("ok"),
    z.literal("pending"),
    z.literal("error"),
    z.literal(null),
  ]),
  editalCardContent: z.string(),
  editalCardTitle: z.string(),
  editalCardDate: z.string(),
  editalDialogTitle: z.string(),
  editalDialogDescription: z.string(),
  editalDialogContent: z.string(),
  editalId: z.string(),
});

export type IEditalCard = z.infer<typeof EditalSchema>;
export type IDocCard = z.infer<typeof DocSchema>;
export type ITeamMember = z.infer<typeof TeamMember>;
export type IDocInput = z.infer<typeof DocInputSchema>;
export type ISignUp = z.infer<typeof SignUpSchema>;
