"use client";
import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const loginForm = z.object({
  email: z.string().email(),
  password: z.string().min(7),
});

export const LoginRes = z.object({
  data: z.object({
    account: z.object({
      email: z.string(),
      id: z.string(),
      name: z.string(),
    }),
    expiresAt: z.string(),
    token: z.string(),
  }),
  message: z.string(),
});

export type LoginResType = z.infer<typeof LoginRes>;

export type LoginType = z.infer<typeof loginForm>;
export const registerForm = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(7),
    confirmPassword: z.string().min(7),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerForm>;

export const getMe = z.object({
  data: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
  message: z.string(),
});

export type MeType = z.infer<typeof getMe>;

export const Account = z.object({
  name: z.string(),
  id: z.string(),
  emai: z.string(),
});

export type AccountType = z.infer<typeof Account>;

export const Message = z.object({
  message: z.string(),
});

export type MessageType = z.infer<typeof Message>;
