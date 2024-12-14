import { day, daysToWorkouts, program, week, workout } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import { and, eq } from 'drizzle-orm';

export const load = async ({ request }) => {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	); // Boolean: true or false

	if (isAuthenticated) {
		const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

		const workouts = await db.query.workout.findMany({
			where: eq(workout.userId, user.id)
		});

		return { workouts };
	}
};

export const actions = {
	insertProgram: async ({ request }) => {
		const data = await request.formData();

		console.log(data.get('title') as string);

		const isAuthenticated = await kindeAuthClient.isAuthenticated(
			request as unknown as SessionManager
		); // Boolean: true or false

		if (isAuthenticated) {
			const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

			const programData = await db
				.insert(program)
				.values({
					title: data.get('title') as string,
					userId: user.id
				})
				.returning();

			const numOfWeeks = parseInt(data.get('numOfWeeks') as string) || 1;

			for (let i = 0; i < numOfWeeks; i++) {
				const weekData = await db
					.insert(week)
					.values({
						title: `Week ${i + 1}`,
						programId: programData[0].id
					})
					.returning();

				// Insert days
				for (let j = 0; j < 7; j++) {
					await db.insert(day).values({
						title: `Day ${j + 1}`,
						weekId: weekData[0].id
					});
				}
			}
		}
	},
	insertWorkout: async ({ request }) => {
		const data = await request.formData();

		console.log(data);

		// const isAuthenticated = await kindeAuthClient.isAuthenticated(
		// 	request as unknown as SessionManager
		// ); // Boolean: true or false

		// if (isAuthenticated) {
		// 	const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

		// const existingWorkout = await db
		// 	.select()
		// 	.from(workout)
		// 	.where(and(eq(workout.title, data.get('workoutTitle') as string), eq(workout.userId, user.id)));

		await db
			.insert(daysToWorkouts)
			.values({
				dayId: data.get('dayId') as string,
				workoutId: data.get('workoutId') as string
			})
			.returning();

		//TODO: display error that workout with that name already exists

		// }
	},
	deleteDayWorkout: async ({ request }) => {
		const data = await request.formData();

		await db
			.delete(daysToWorkouts)
			.where(
				and(
					eq(daysToWorkouts.dayId, data.get('dayId') as string),
					eq(daysToWorkouts.workoutId, data.get('workoutId') as string)
				)
			);
	}
};
