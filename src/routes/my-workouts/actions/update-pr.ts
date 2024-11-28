import { db } from '$lib/server/db';
import { workout } from '$lib/server/db/schema';
import { fail, type RequestEvent } from '@sveltejs/kit';
import { and, eq, gt, lt, or } from 'drizzle-orm';

export const updatePR = async ({ request }: RequestEvent) => {
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
						or(eq(workout.timePr, '00:00'), gt(workout.timePr, data.get('timePrAttempt') as string))
					)
				);
		} catch (error) {
			return { error: `${error}Failed to update PR` };
		}
	}
};
