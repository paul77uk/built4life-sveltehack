import { db } from '$lib/server/db';
import { workout } from '$lib/server/db/schema';

import type { WorkoutInsert } from '$lib/types/index.js';
import { workouts } from '$lib/workoutData.js';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import { fail, redirect } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';
// import { message } from 'sveltekit-superforms';
// // import { fail, setError, superValidate } from 'sveltekit-superforms';
// import { zod } from 'sveltekit-superforms/adapters';

// import type { Workout } from '$lib/types/index.js'
type ReturnObject = {
	success: boolean;
	title: string;
	// description?: string;
	// exercises?: string[];
	// pr?: number;
	// minutes?: number;
	// seconds?: number;
	message?: string;
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		// if (!form.valid) {
		// 	return fail(400, { form });
		// }

		// const { title, description, exercises, pr, minutes, seconds } = form;

		const isAuthenticated = await kindeAuthClient.isAuthenticated(
			request as unknown as SessionManager
		); // Boolean: true or false

		if (isAuthenticated) {
			const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

			console.log('I am authenticated');
			// console.log('pr',formData.get('pr'));

			// console.log(user.id)

			const title = formData.get('title') as string;
			// const description = formData.get('description') as string;
			// const exercises = formData.getAll('exercises') as string[];
			// const pr =
			// 	typeof parseInt(formData.get('pr') as string) === 'number'
			// 		? parseInt(formData.get('pr') as string)
			// 		: undefined;
			// const minutes = parseInt(formData.get('minutes') as string);
			// const seconds = parseInt(formData.get('seconds') as string);

			// console.log('pr', pr);

			const returnObject: ReturnObject = {
				success: true,
				title,
				// description,
				// exercises,
				// pr,
				// minutes,
				// seconds,
				message: 'Workout created successfully'
			};

			// check if workout with same title already exists
			const existingWorkout = await db
				.select()
				.from(workout)
				.where(and(eq(workout.title, returnObject.title), eq(workout.userId, user.id)))
				.limit(1);

			if (existingWorkout.length > 0) {
				return fail(400, {
					...returnObject,
					message: `${returnObject.title} already exists`,
					success: false
				});
			}

			const currentWorkout = workouts.find((workout) => workout.title === title);

			try {
				await db.insert(workout).values({
					...currentWorkout,
					userId: user.id
				} as WorkoutInsert);
			} catch (error) {
				console.log(`${error} Failed to create workout`);
			}

			redirect(302, `/my-workouts?redirected=1&title=${title}`);
		}
	}
};
