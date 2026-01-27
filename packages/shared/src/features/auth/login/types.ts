import { z } from "zod";
import { loginRequestSchema } from "./validationSchemes";

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    lastname: string;
    username: string;
    roleId?: string;
  };
}
