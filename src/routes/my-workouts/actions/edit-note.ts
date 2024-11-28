import { db } from "$lib/server/db";
import { notes } from "$lib/server/db/schema";
import { redirect, type RequestEvent } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const editNote = async ({ request } : RequestEvent) => {
	const form = await request.formData();

	const text = form.get('text') as string;
	const id = form.get('id') as string;

	try {
		await db.update(notes).set({ text }).where(eq(notes.id, id));
	} catch (error) {
		return { error: `${error} Failed to update note` };
	}

	redirect(302, '/my-workouts');
};
