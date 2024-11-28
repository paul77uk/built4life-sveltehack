import { db } from '$lib/server/db';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import { asc, eq } from 'drizzle-orm';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail as failed } from '@sveltejs/kit';
import { workouts } from '$lib/workoutData';
import { formSchema } from './schema';
import { notes, workout } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { updatePR } from './actions/update-pr';
import { createWorkout } from './actions/create-workout';
import { editNote } from './actions/edit-note';
import { deleteNote } from './actions/delete-note';

export const load = async ({ request }) => {
	// const query = url.searchParams.get('query') || ''

	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	); // Boolean: true or false

	if (isAuthenticated) {
		const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

		const workouts = await db.query.workout.findMany({
			where: eq(workout.userId, user.id),
			orderBy: [asc(workout.createdAt)],
			with: {
				notes: {
					orderBy: [asc(notes.createdAt)]
				}
			}
		});

		// const filteredWorkouts = query
		// 	? workouts.filter(({ title }) =>
		// 			title.toLowerCase().includes(query.toLowerCase()),
		// 		)
		// 	: workouts
		const form = await superValidate(zod(formSchema));

		return { workouts, form };
	}
};

export const actions = {
	updatePR,
	createWorkout,

	deleteWorkout: async ({ request }) => {
		const data = await request.formData();

		const isAuthenticated = await kindeAuthClient.isAuthenticated(
			request as unknown as SessionManager
		); // Boolean: true or false

		if (!isAuthenticated) console.log('not authenticated');

		if (isAuthenticated) {
			const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

			const currentWorkout = await db.query.workout.findFirst({
				where: eq(workout.id, data.get('id') as string)
			});

			if (!currentWorkout) {
				return fail(400, {
					error: 'Workout not found'
				});
			}

			if (currentWorkout.userId !== user.id) {
				return fail(403, {
					error: 'Unauthorized'
				});
			}

			try {
				await db.delete(workout).where(eq(workout.id, data.get('id') as string));
			} catch (error) {
				return { error: `${error} Failed to delete workout` };
			}

			// redirect(302, '/my-workouts');
			// return { success: true, message: `${currentWorkout.title} deleted successfully` };
		}
	},
	updateWorkout: async ({ request }) => {
		const form = await request.formData();

		console.log('my form', form);

		// if (!form.valid) {
		// 	return fail(400, {
		// 		form
		// 	});
		// }

		// const { id, title, description, exercises, repsPr, timePr, minutes, seconds } = form.data;

		const id = form.get('id') as string;
		const title = form.get('title') as string;
		const description = form.get('description') as string;
		const exercises = form.get('exercises') as string;
		const repsPr = form.get('repsPr') ? parseInt(form.get('repsPr') as string) : null;
		const timePr = form.get('timePr') ? (form.get('timePr') as string) : null;

		console.log(exercises);

		const exerciseArray = exercises.split('\n');

		console.log(exerciseArray);

		const isAuthenticated = await kindeAuthClient.isAuthenticated(
			request as unknown as SessionManager
		); // Boolean: true or false

		if (!isAuthenticated) console.log('not authenticated');

		if (isAuthenticated) {
			const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

			const currentWorkout = await db.query.workout.findFirst({
				where: eq(workout.id, id as string)
			});

			// duplcated workout title with static workout data
			const existingLocalWorkout = workouts.find((workout) => workout.title === title);

			if (existingLocalWorkout) {
				// return failed(400, {
				// 	error: `${title} already exists`
				// });
				console.log('workout already exists');
				redirect(302, '/my-workouts?error=true');

				// throw new Error(`${title} already exists`);
			}

			if (!currentWorkout) {
				return fail(400, {
					error: 'Workout not found'
				});
			}

			if (currentWorkout.userId !== user.id) {
				return fail(403, {
					error: 'Unauthorized'
				});
			}

			try {
				await db
					.update(workout)
					.set({
						title,
						description,
						exercises: exerciseArray,
						repsPr,
						timePr
						// minutes,
						// seconds
					})
					.where(eq(workout.id, id as string));
			} catch (error) {
				console.log(`${error} Failed to update workout`);
				return failed(422, {
					title,
					error: `${error} Failed to update workout`
				});
			}

			console.log('workout updated successfully');
			redirect(302, '/my-workouts');
		}
	},

	createNote: async ({ request }) => {
		const form = await request.formData();

		const text = form.get('text') as string;
		const workoutId = form.get('id') as string;

		try {
			await db.insert(notes).values({
				text,
				workoutId
			});
		} catch (error) {
			console.log(`${error} Failed to create note`);
		}

		return redirect(302, '/my-workouts');
	},

	deleteNote,
	editNote
};
