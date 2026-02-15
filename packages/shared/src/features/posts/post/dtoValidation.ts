import { z } from "zod";
import { PostDBSchema } from "./databaseValidation";

export const PostFlowDTOSchema = PostDBSchema.transform((post) => ({
  ...post,
  createdAt: post.createdAt.toISOString(),
}));

export const PostFlowDTOArraySchema = z.array(PostFlowDTOSchema);

export type PostFlowDTO = z.infer<typeof PostFlowDTOSchema>;
