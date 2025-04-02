import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z.string().min(1, "Campo obrigatório").email("Email inválido"),
});

const MAX_UPLOAD_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpg", "image/jpeg"];

export const fileSchema = z
  .instanceof(File, {
    message: "Campo Obrigatório",
  })
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE;
  }, "Seu arquivo precisa ser de no máximo 10MB")
  .refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file.type);
  }, "Insira somente arquivos em PDF, JPEG ou JPG");

export const DocSchema = z.object({
  areaId: z.string().optional(),
  editalDocs: z.array(
    z.record(
      z.string(),
      z.array(
        z.record(
          z.string(),
          z.object({
            file: fileSchema,
          })
        )
      )
    )
  ),
});

export const consultantSchema = z.object({
  areaDocuments: z
    .array(
      z.object({
        areaId: z.string(),
        areaName: z.string(),
        files: fileSchema,
      })
    )
    .optional(),
  areas: z.array(z.object({
    label: z.string(),
    id: z.string(),
    naturezas: z.array(z.string()),
  })).optional(),
  id: z.string(),
  nome: z.string().min(1, "Nome é obrigatório"),
  localidades: z.array(z.object({ idSCLocalidade: z.string(), prioridade: z.string() })).optional(),
  CPF: z
    .string()
    .refine(
      (doc) => {
        const replaceDoc = doc.replace(/\D/g, "");
        return replaceDoc.length === 11;
      },
      { message: "CPF deve ter 11 caracteres" }
    )
    .refine(
      (doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return !!+replacedDoc;
      },
      {
        message: "CPF deve conter apenas números",
      }
    ),
  email: z
    .object({
      email: z.string().email("Email inválido"),
      emailConfirmation: z.string().email("Email inválido"),
    })
    .refine((data) => data.email === data.emailConfirmation, {
      message: "Os emails não são iguais",
      path: ["emailConfirmation"],
    }),
  contato: z
    .string()
    .refine(
      (doc) => {
        const replaceDoc = doc.replace(/\D/g, "");
        return replaceDoc.length === 11;
      },
      { message: "O telefone deve ter 11 caracteres" }
    )
    .refine(
      (doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return !!+replacedDoc;
      },
      {
        message: "O telefone deve conter apenas números",
      }
    ),
  consultantCPF: fileSchema,
  comprovanteVinculoCNPJ: fileSchema,
  comprovanteFormacaoAcademica: fileSchema,
  registroProfissionalClasse: fileSchema,
});

export const fileInputSchema = z.object({
  arquivosTecnicos: z.array(
    z.object({
      naturezas: z.array(z.string()).min(1, "Selecione pelo menos uma natureza"),
      areaId: z.string(),
      areaName: z.string(),
      files: z
        .array(z.instanceof(File))
        .min(1, "Insira pelo menos um documento técnico"),
    })
  ),
});

export const MultipleFormSchema = z.object({
  options: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Selecione pelo menos um item.",
  }),
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
  CNPJ: z
    .string()
    .refine(
      (doc) => {
        const replaceDoc = doc.replace(/\D/g, "");
        return replaceDoc.length === 14;
      },
      { message: "CNPJ deve ter 14 caracteres" }
    )
    .refine(
      (doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return !!+replacedDoc;
      },
      {
        message: "CNPJ deve conter apenas números",
      }
    ),
  telefone: z
    .string()
    .refine(
      (doc) => {
        const replaceDoc = doc.replace(/\D/g, "");
        return replaceDoc.length === 11;
      },
      { message: "O telefone deve ter 11 caracteres" }
    )
    .refine(
      (doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return !!+replacedDoc;
      },
      {
        message: "O telefone deve conter apenas números",
      }
    ),
});

export const DocInputSchema = z.object({
  padrao: z.boolean().optional(),
  titulo: z.string(),
  label: z.string(),
  arquivo: z.string(),
  onchange: z.function(),
  accept: z.string().optional(),
});

export const EditalSchema = z.object({
  status: z.union([
    z.literal("ok"),
    z.literal("pending"),
    z.literal("error"),
    z.literal(null),
  ]),
  editalType: z.string().optional(),
  editalCardContent: z.string(),
  editalCardTitle: z.string(),
  editalCardDate: z.string(),
  editalDialogTitle: z.string(),
  editalDialogDescription: z.string(),
  editalDialogContent: z.string(),
  editalId: z.string(),
});

export const PasswordRecoverySchema = z.object({
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
});

export type ConsultantRowDisplay = {
  CPF: string;
  id: string;
  email: string;
  nome: string;
  contato: string;
  areas?: { id: string; label: string }[];
};

export const MockDocCardSchema = z.object({
  docFile: z.string(),
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

export const AreaDocSchema = z.object({
  areaId: z.string().optional(),
  mockInputFiles: z.array(
    z.record(
      z.string(),
      z.array(
        z.record(
          z.string(),
          z.object({
            file: z
              .array(fileSchema)
              .min(1, "É necessário carregar pelo menos um arquivo"),
          })
        )
      )
    )
  ),
});

export type HistoryItem = {
  DataCriacao: string;
  Descricao: string;
  Responsavel: string;
  idHistorico: string;
};

export type AttachmentItem = {
  Arquivo: string;
  DadosPadrao: null;
  DataCriacao: string;
  Descricao: string;
  Responsavel: string;
  SCEdital: string;
  idAnexo: string;
};

export type RequiredDocuments = {
  [key: string]: {
    [key: string]: string;
  }[];
};
export type IAreaDocSchema = z.infer<typeof AreaDocSchema>;
export type FileInputForm = z.infer<typeof fileInputSchema>;
export type IPassWordRecovery = z.infer<typeof PasswordRecoverySchema>;
export type IEditalCard = z.infer<typeof EditalSchema>;
export type IDocCard = z.infer<typeof MockDocCardSchema>;
export type IDocInput = z.infer<typeof DocInputSchema>;
export type ISignUp = z.infer<typeof SignUpSchema>;
export type IForgetPassword = z.infer<typeof forgetPasswordSchema>;
export type IConsultant = z.infer<typeof consultantSchema>;
export type IFile = z.infer<typeof fileSchema>;
export type IEditalDoc = z.infer<typeof DocSchema>;
export type IMultipleForm = z.infer<typeof MultipleFormSchema>;

export type MultipleCheckBoxOptions = {
  label: string;
  value: string;
  id: string;
  naturezas?: string[];
};
