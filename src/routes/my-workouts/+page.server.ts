import { db } from '$lib/server/db';

import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';

import { and, asc, eq, gt, lt, or } from 'drizzle-orm';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail as failed } from '@sveltejs/kit';

import type { WorkoutInsert } from '$lib/types';
import { workouts } from '$lib/workoutData';

import { formSchema } from './schema';
import { notes, workout } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

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
	updatePR: async ({ request }) => {
		const data = await request.formData();

		// console.log(data.get('timePrAttempt'));

		// check if prAttempt greater than current PR
		const currentWorkout = await db.query.workout.findFirst({
			where: eq(workout.id, data.get('id') as string)
		});

		if (!currentWorkout) {
			return fail(400, {
				error: 'Workout not found'
			});
		}

		if (currentWorkout.repsPr !== null) {
			if (parseInt(data.get('prAttempt') as string) <= currentWorkout.repsPr) {
				return fail(400, {
					error: 'Nice try, but failed to beat PR this time'
				});
			}

			try {
				await db
					.update(workout)
					.set({
						repsPr: parseInt(data.get('prAttempt') as string) || 0
					})
					.where(
						and(
							eq(workout.id, data.get('id') as string),
							lt(workout.repsPr, parseInt(data.get('prAttempt') as string) || 0)
						)
					);
			} catch (error) {
				return { error: `${error}Failed to update PR` };
			}
		}

		if (currentWorkout.timePr !== null) {
			if (
				(data.get('timePrAttempt') as string) >= currentWorkout.timePr &&
				currentWorkout.timePr !== '00:00'
			) {
				return fail(400, {
					error: 'Nice try, but failed to beat PR this time'
				});
			}

			if (data.get('timePrAttempt') === '00:00') {
				return fail(400, {
					error: 'Time must be greater than 00:00'
				});
			}

			try {
				await db
					.update(workout)
					.set({
						timePr: data.get('timePrAttempt') as string
					})
					.where(
						and(
							eq(workout.id, data.get('id') as string),
							or(
								eq(workout.timePr, '00:00'),
								gt(workout.timePr, data.get('timePrAttempt') as string)
							)
						)
					);
			} catch (error) {
				return { error: `${error}Failed to update PR` };
			}
		}
	},

	createWorkout: async ({ request }) => {
		const form = await superValidate(request, zod(formSchema));

		console.log('my form', form);

		if (!form.valid) {
			console.log('form not valid');
			return fail(400, {
				form
			});
		}

		const { title, description, exercises, repsPr, timePr, minutes, seconds } = form.data;

		console.log('my formData', form.data);

		const isAuthenticated = await kindeAuthClient.isAuthenticated(
			request as unknown as SessionManager
		); // Boolean: true or false

		if (!isAuthenticated) console.log('not authenticated');

		if (isAuthenticated) {
			console.log('authenticated');
			const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

			console.log('my user', user);

			// check if workout with same title already exists
			const existingWorkout = await db
				.select()
				.from(workout)
				.where(and(eq(workout.title, title as string), eq(workout.userId, user.id)))
				.limit(1);

			const existingLocalWorkout = workouts.find((workout) => workout.title === title);

			if (existingWorkout.length > 0 || existingLocalWorkout) {
				console.log('bug');
				return fail(400, {
					message: `${title} already exists`
				});
			}

			try {
				await db.insert(workout).values({
					title,
					description,
					exercises: exercises?.split('\n'),
					repsPr,
					timePr,
					minutes,
					seconds,
					userId: user.id
				} as WorkoutInsert);
			} catch (error) {
				console.log(`${error} Failed to create workout`);
			}

			return redirect(302, '/my-workouts');
		}
	},

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

	deleteNote: async ({ request }) => {
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
	},

	editNote: async ({ request }) => {
		const form = await request.formData();

		const text = form.get('text') as string;
		const id = form.get('id') as string;

		try {
			await db.update(notes).set({ text }).where(eq(notes.id, id));
		} catch (error) {
			return { error: `${error} Failed to update note` };
		}

		redirect(302, '/my-workouts');
	}
};
