import { programs } from '$lib/programData';
import { db } from '$lib/server/db/index.js';
import { day, daysToWorkouts, program, week, workout } from '$lib/server/db/schema.js';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const isAuthenticated = await kindeAuthClient.isAuthenticated(
			request as unknown as SessionManager
		); // Boolean: true or false

		const currentProgram = programs.filter((program) => program.title === formData.get('title'));

		if (isAuthenticated) {
			const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

			try {
				const programData = await db
					.insert(program)
					.values({
						...currentProgram[0],
						userId: user.id
					})
					.returning();

				// Insert weeks
				for (const weeksArr of currentProgram[0].weeks) {
					const weeksData = await db
						.insert(week)
						.values({
							...weeksArr,
							programId: programData[0].id
						})
						.returning();

					// Insert days
					for (const daysArr of weeksArr.days) {
						const daysData = await db
							.insert(day)
							.values({
								...daysArr,
								weekId: weeksData[0].id
							})
							.returning();

						// insert workout if exist

						for (const workoutArr of daysArr.workouts) {
							const workoutData = await db
								.insert(workout)
								.values({
									...workoutArr,
									userId: user.id
								})
								.returning();

							// join workout with day

							await db
								.insert(daysToWorkouts)
								.values({
									dayId: daysData[0].id as string,
									workoutId: workoutData[0].id as string
								})
								.returning();
						}
					}
				}
			} catch (error) {
				console.error(error);
			}

			redirect(302, '/my-programs');
		}
	}
};
