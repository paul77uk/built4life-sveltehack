import { db } from '$lib/server/db';
import { day, daysToWorkouts, program, week } from '$lib/server/db/schema';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import { asc, eq } from 'drizzle-orm';

export const load = async ({ request }) => {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	); // Boolean: true or false

	if (isAuthenticated) {
		const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

		const programs = await db.query.program.findMany({
			where: eq(program.userId, user.id),
			orderBy: [asc(program.createdAt)],
			with: {
				weeks: {
					orderBy: [asc(week.createdAt)],
					with: {
						days: {
							orderBy: [asc(day.createdAt)],
							with: {
								daysToWorkouts: {
									orderBy: [asc(daysToWorkouts.createdAt)],
									with: {
										workout: true
									}
								}
							}
						}
					}
				}
			}
		});

		return { programs };
	}
};
