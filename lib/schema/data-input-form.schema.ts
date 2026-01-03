import z from 'zod';

export const dataInputFormSchema = z.object({
	jobDescription: z.string().min(1, { message: 'Job description is required' }),
	input: z.string().min(1, { message: 'Input is required' }),
});
