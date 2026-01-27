import { z } from "zod";
import { registerRequestSchema } from "./validationSchemes";

export type RegisterRequest = z.infer<typeof registerRequestSchema>;

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  lastname: string;
  username: string;
}
