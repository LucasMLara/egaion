import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z.string().min(1, "Campo obrigatório").email("Email inválido"),
});

const MAX_UPLOAD_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpg", "image/jpeg"];

export const consultantSchema = z.object({
  id: z.string(),
  nome: z.string().min(1, "Nome é obrigatório"),
  CPF: z.string().min(11, "CPF deve ter no mínimo 11 caracteres"),
  email: z
    .object({
      email: z.string().email("Email inválido"),
      emailConfirmation: z.string().email("Email inválido"),
    })
    .refine((data) => data.email === data.emailConfirmation, {
      message: "Os emails não são iguais",
      path: ["emailConfirmation"],
    }),
  contato: z.string().min(10, "Telefone deve ter no mínimo 10 caracteres"),
  consultantCPF: z
    .instanceof(File, {
      message: "Campo Obrigatório",
    })
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "Seu arquivo precisa ser de no máximo 3MB")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "Insira somente arquivos em PDF, JPEG ou JPG"),
  comprovanteVinculoCNPJ: z
    .instanceof(File, {
      message: "Campo Obrigatório",
    })
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "Seu arquivo precisa ser de no máximo 3MB")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "Insira somente arquivos em PDF, JPEG ou JPG"),
  comprovanteFormacaoAcademica: z
    .instanceof(File, {
      message: "Campo Obrigatório",
    })
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "Seu arquivo precisa ser de no máximo 3MB")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "Insira somente arquivos em PDF, JPEG ou JPG"),
  registroProfissionalClasse: z
    .instanceof(File, {
      message: "Campo Obrigatório",
    })
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "Seu arquivo precisa ser de no máximo 3MB")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "Insira somente arquivos em PDF, JPEG ou JPG"),
});

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

export type ConsultantRowDisplay = {
  CPF: string;
  id: string;
  email: string;
  nome: string;
  contato: string;
};

export type IEditalCard = z.infer<typeof EditalSchema>;
export type IDocCard = z.infer<typeof DocSchema>;
export type IDocInput = z.infer<typeof DocInputSchema>;
export type ISignUp = z.infer<typeof SignUpSchema>;
export type IForgetPassword = z.infer<typeof forgetPasswordSchema>;
export type IConsultant = z.infer<typeof consultantSchema>;
