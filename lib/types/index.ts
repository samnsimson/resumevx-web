import { z } from 'zod';
import { createOrgSchema, loginSchema, registerSchema, verifyEmailOtpSchema } from '@/lib/schema/auth.schema';
import { workspaceSchema } from '@/lib/schema/workspace.schema';

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type VerifyEmailOtpSchema = z.infer<typeof verifyEmailOtpSchema>;
export type CreateOrgSchema = z.infer<typeof createOrgSchema>;
export type MySpaceSchema = z.infer<typeof workspaceSchema>;
