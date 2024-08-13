import { z } from "zod";

export const DocInputSchema = z.object({
  padrao: z.boolean().optional(),
  titulo: z.string(),
  label: z.string(),
  // arquivo: z.instanceof(File),
  arquivo: z.string(),
  onchange: z.function(z.any()),
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
  docAreas: z.array(z.string()),
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

type IEditalCard = z.infer<typeof EditalSchema>;
type IDocCard = z.infer<typeof DocSchema>;
type ITeamMember = z.infer<typeof TeamMember>;
type IDocInput = z.infer<typeof DocInputSchema>;
