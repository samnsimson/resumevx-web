import z from 'zod';

export const loginSchema = z.object({
	username: z.string().min(1, 'Username is required'),
	password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	username: z.string().min(1, { message: 'Username is required' }),
	email: z.email({ message: 'Invalid email address' }),
	password: z.string().min(1, { message: 'Password is required' }),
});

export const verifyEmailOtpSchema = z.object({
	otp: z.array(z.string().min(1)).min(1, { message: 'Pin is required' }).length(6, { message: 'Pin must be 6 digits long' }),
});

export const createOrgSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
});
