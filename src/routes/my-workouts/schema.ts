import { z } from 'zod';

export const formSchema = z.object({
	title: z.string().min(1),
	description: z.string().nullable(),
	exercises: z.array(z.string()).nullable(),
	pr: z.number().nullable(),
	minutes: z.number().nullable(),
	seconds: z.number().nullable()
});

export type FormSchema = typeof formSchema;
