import { z } from 'zod';
import { createOrgSchema, loginSchema, otpSchema, registerSchema, verifyEmailOtpSchema } from '@/lib/schema/auth.schema';
import { dataInputFormSchema } from '@/lib/schema/data-input-form.schema';

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type VerifyEmailOtpSchema = z.infer<typeof verifyEmailOtpSchema>;
export type CreateOrgSchema = z.infer<typeof createOrgSchema>;
export type DashboardSchema = z.infer<typeof dataInputFormSchema>;
export type OtpSchema = z.infer<typeof otpSchema>;

export type DecodedJWT<T = Record<string, any>> = {
	exp?: number;
	iat?: number;
	sub?: string;
} & T;

export interface VerifyEmailParams {
	state?: 'fresh' | 'resend' | null;
	token?: string;
}
