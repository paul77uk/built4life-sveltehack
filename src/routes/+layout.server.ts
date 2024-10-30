
// import { db } from '$lib/server/db';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
// import { eq } from 'drizzle-orm';

export const load = async ({ request }: RequestEvent) => {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	); // Boolean: true or false

	// if (isAuthenticated) {
	// 	const user = await kindeAuthClient.getUser(request as unknown as SessionManager);

	// 	const existingUser = await db
	// 		.select()
	// 		.from(user)
	// 		.where(eq(user.id, user.id))
	// 		.limit(1);

	// 	// sign up
	// 	if (existingUser.length === 0) {
	// 		await db.insert(user).values({
	// 			id: user.id,
	// 			email: user.email!,
	// 			firstName: user.given_name,
	// 			lastName: user.family_name
	// 		});
	// 	}

	// 	// redirect user to home page
	// }
	console.log(isAuthenticated);
	return { isAuthenticated };
};
