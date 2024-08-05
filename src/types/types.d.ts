import { z } from "zod";

export const DocSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export const IEditalCard = z.object({
  status: z.union([
    z.literal("ok"),
    z.literal("pending"),
    z.literal("error"),
    z.literal(null),
  ]),
  areas: z.array(z.string()),
  editalCardContent: z.string(),
  editalCardTitle: z.string(),
  editalCardDate: z.string(),
  editalDialogTitle: z.string(),
  editalDialogDescription: z.string(),
  editalDialogContent: z.string(),
  editalId: z.string(),
});

type IEditalCard = z.infer<typeof IEditalCard>;
type User = z.infer<typeof DocSchema>;
