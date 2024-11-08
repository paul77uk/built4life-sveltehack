import { z } from 'zod';

export const formSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1),
	description: z.string().nullable(),
	exercises: z.string().nullable(),
	repsPr: z.number().nullable(),
	timePr: z.string().nullable(),
	minutes: z.number().nullable(),
	seconds: z.number().nullable()
});

export type FormSchema = typeof formSchema;
