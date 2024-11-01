import { db } from '$lib/server/db';

import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';

import { and, asc, eq, gt, lt, or } from 'drizzle-orm';
import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import type { WorkoutInsert } from '$lib/types';
import { workouts } from '$lib/workoutData';

import { formSchema } from './schema';
import { workout } from '$lib/server/db/schema';

export const load = async ({ request }) => {
	// const query = url.searchParams.get('query') || ''

	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	); // Boolean: true or false

	if (isAuthenticated) {
		const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

		const workouts = await db.query.workout.findMany({
			where: eq(workout.userId, user.id),
			orderBy: [asc(workout.createdAt)]
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

	createWorkout: async (request) => {
		const form = await superValidate(request, zod(formSchema));

		console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { title, description, exercises, pr, minutes, seconds } = form.data;

		console.log(form.data);

		const isAuthenticated = await kindeAuthClient.isAuthenticated(
			request as unknown as SessionManager
		); // Boolean: true or false

		if (!isAuthenticated) console.log('not authenticated');

		if (isAuthenticated) {
			console.log('authenticated');
			const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

			// check if workout with same title already exists
			const existingWorkout = await db
				.select()
				.from(workout)
				.where(and(eq(workout.title, title as string), eq(workout.userId, user.id)))
				.limit(1);

			const existingLocalWorkout = workouts.find((workout) => workout.title === title);

			if (existingWorkout.length > 0 || existingLocalWorkout) {
				console.log('bug');
				return setError(form, 'title', 'Workout with this title already exists');
			}

			try {
				await db.insert(workout).values({
					title,
					description,
					exercises,
					pr,
					minutes,
					seconds,
					userId: user.id
				} as WorkoutInsert);
			} catch (error) {
				console.log(`${error} Failed to create workout`);
			}

			return message(form, 'Workout created successfully');
		}
	}
};
