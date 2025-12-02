import z from "zod";

export const registerDto = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});

export type registerDto = z.infer<typeof registerDto>;

export const loginDto = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type loginDto = z.infer<typeof loginDto>;
