import { redirect, type RequestEvent } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from '../schema';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import { workout } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { workouts } from '$lib/workoutData';
import { db } from '$lib/server/db';
import type { WorkoutInsert } from '$lib/types';

export const createWorkout = async ({ request }: RequestEvent) => {
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
  }