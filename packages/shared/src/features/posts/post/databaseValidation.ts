import { z } from "zod";

const BasePostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  categoryId: z.string().nullable(),
  score: z.number(),
  upvotes: z.number(),
  downvotes: z.number(),
  createdAt: z.date(),
  author: z.object({
    id: z.string(),
    name: z.string().nullable(),
    lastname: z.string().nullable(),
    username: z.string(),
  }),
  images: z.array(
    z.object({
      id: z.string(),
      fullpath: z.string(),
    }),
  ),
  category: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
});

export type PostDB = z.infer<typeof BasePostSchema> & {
  counterPosts: PostDB[];
};

export const PostDBSchema: z.ZodType<PostDB> = BasePostSchema.extend({
  counterPosts: z.lazy(() => PostDBSchema.array()).default([]),
});
