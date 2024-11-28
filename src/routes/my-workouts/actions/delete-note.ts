import { db } from '$lib/server/db';
import { notes, workout } from '$lib/server/db/schema';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const deleteNote = async ({ request }: RequestEvent) => {
	const data = await request.formData();

	const currentNote = await db.query.notes.findFirst({
		where: eq(notes.id, data.get('id') as string)
	});

	if (!currentNote) {
		return fail(400, {
			error: 'Note not found'
		});
	}

	const currentWorkout = await db.query.workout.findFirst({
		where: eq(workout.id, currentNote.workoutId)
	});

	if (!currentWorkout) {
		return fail(400, {
			error: 'Workout not found'
		});
	}

	try {
		await db.delete(notes).where(eq(notes.id, data.get('id') as string));
	} catch (error) {
		return { error: `${error} Failed to delete note` };
	}

	redirect(302, '/my-workouts');
};
