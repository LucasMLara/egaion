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

export const generateEmpresaDocsSchema = (docs: { Nome: string; Aprovado: boolean }[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  docs
    .filter((doc) => doc.Aprovado === false)
    .forEach((doc) => {
      shape[doc.Nome] = fileSchema;
    });

  return z.object(shape);
};

export interface DocumentoEmpresaAjuste {
  idSCCredenciada: string;
  RazaoSocial: string;
  Parametrizacao: string;
  NomeInput: string;
}

export const generateEmpresaAreaDocsSchema = (docs: DocumentoEmpresaAjuste[]) => {
  const campos: Record<string, any> = {};

  docs.forEach((doc) => {
    const key = `${doc.Parametrizacao} - ${doc.NomeInput}`;
    campos[key] = z
      .array(z.instanceof(File))
      .min(1, { message: "Insira pelo menos um arquivo" })
      .superRefine((files, ctx) => {
        files.forEach((file, index) => {
          if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Arquivos devem ser PDF ou imagem (JPEG/PNG)",
              path: [index],
            });
          }

          if (file.size > MAX_UPLOAD_SIZE) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Arquivos devem ter no máximo 10MB",
              path: [index],
            });
          }
        });
      });
  });

  return z.object(campos);
};

type Parametrizacao = string;
type ConsultorEmailOuNome = string;

type DocumentosPorArea = Record<Parametrizacao, unknown[]>;
type TodosDocumentosPorConsultor = Record<ConsultorEmailOuNome, DocumentosPorArea>;

export const generateConsultorAreaDocsSchema = (
  dados: TodosDocumentosPorConsultor
) => {
  const campos: Record<string, any> = {};

  Object.entries(dados).forEach(([consultor, setores]) => {
    Object.keys(setores).forEach((parametrizacao) => {
      const key = `${consultor} - ${parametrizacao}`;
      campos[key] = z
        .array(z.instanceof(File))
        .min(1, { message: "Insira pelo menos um arquivo" })
        .superRefine((files, ctx) => {
          files.forEach((file, index) => {
            if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Arquivos devem ser PDF ou imagem (JPEG/PNG)",
                path: [index],
              });
            }

            if (file.size > MAX_UPLOAD_SIZE) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Arquivos devem ter no máximo 10MB",
                path: [index],
              });
            }
          });
        });
    });
  });

  return z.object(campos);
};






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
  justificativa: z.string().optional(),
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
export type ISignUp = z.infer<typeof SignUpSchema>;
export type IForgetPassword = z.infer<typeof forgetPasswordSchema>;
export type IConsultant = z.infer<typeof consultantSchema>;
export type IFile = z.infer<typeof fileSchema>;
export type IEditalDoc = z.infer<typeof DocSchema>;
export type IMultipleForm = z.infer<typeof MultipleFormSchema>;
export type IGenerateEmpresaDocs = z.infer<ReturnType<typeof generateEmpresaDocsSchema>>;
export type IGenerateEmpresaAreaDocs = z.infer<ReturnType<typeof generateEmpresaAreaDocsSchema>>;

export type MultipleCheckBoxOptions = {
  label: string;
  value: string;
  id: string;
  naturezas?: string[];
};



export interface DocumentoSimples {
  Nome: string;
}

export interface DocumentoConsultor {
  NomeInput: string;
  Nome: string;
  CPF: string;
}
export type GrupoConsultor = {
  nome: string;
  cpf: string;
  documentos: DocumentoConsultor[];
};

export const schemaDocsPessoais = z.object({
  documentos: z.record(z.string(), z.instanceof(File).refine(file => file.size > 0, {
    message: "Arquivo obrigatório",
  }))
});

export type IDocumentoConsultor = z.infer<typeof schemaDocsPessoais>;

export interface DocumentoQualificacao {
  NomeInput: string;
  Parametrizacao: string;
}

export interface DocumentoConsultorPorArea {
  idSCCredenciadasEdital: string;
  idSCEdital: string;
  NomeEdital: string;
  idSCCredenciada: string;
  RazaoSocial: string;
  idSCConsultorEdital: string;
  idSCTecnico: string;
  Nome: string;
  CPF: string;
  Parametrizacao: string;
  Aprovado: boolean;
  NomeInput: string;
}


export type DocumentosAgrupadosPorConsultorEArea = Record<
  string,
  Record<string, DocumentoConsultorPorArea[]>
>;


export const adjustmentsSchema = z.object({
  // 1. Documento único por campo
  documentosDaEmpresa: z.record(
    z
      .instanceof(File)
      .refine((file) => file instanceof File, {
        message: "Arquivo obrigatório",
      })
  ),

  // 2. Um arquivo único por campo de cada consultor
  documentosPessoaisConsultores: z.record(
    z.record(
      z
        .instanceof(File)
        .refine((file) => file instanceof File, {
          message: "Arquivo obrigatório",
        })
    )
  ),

  // 3. Vários arquivos por campo por parametrização
  documentosQualificacaoTecnicaEmpresa: z.record(
    z.record(
      z
        .array(
          z
            .instanceof(File)
            .refine((file) => file instanceof File, {
              message: "Arquivo obrigatório",
            })
        )
        .min(1, "Envie pelo menos um arquivo")
    )
  ),

  // 4. Vários arquivos por campo de cada consultor por parametrização (quando Aprovado === false)
  documentosDosConsultoresPorArea: z.record(
    z.record(
      z.record(
        z
          .array(
            z
              .instanceof(File)
              .refine((file) => file instanceof File, {
                message: "Arquivo obrigatório",
              })
          )
          .min(1, "Envie pelo menos um arquivo")
      )
    )
  ),
});

export type IAdjustments = z.infer<typeof adjustmentsSchema>;