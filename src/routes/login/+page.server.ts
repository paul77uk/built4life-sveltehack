// /** @satisfies {import('./$types').Actions} */

// import { PUBLIC_FRONTEND_URL } from '$env/static/public';
// import { fail, redirect } from '@sveltejs/kit';

// export const actions = {
// 	signInWithPassword: async ({ request, locals: { supabase } }) => {
// 		const formData = await request.formData();

// 		const email = formData.get('email') as string;
// 		const password = formData.get('password') as string;

// 		const returnObject: { success: boolean; errors: string[]; email: string; password: string } = {
// 			success: true,
// 			email,
// 			password,
// 			errors: []
// 		};

// 		// if (firstName.length < 2) {
// 		// 	console.log('name is too short');
// 		// 	return { success: false, message: 'First name must be at least 3 characters' };
// 		// }

// 		if (!email.length) {
// 			console.log('email is required');
// 			returnObject.errors.push('Email is required');
// 		}

// 		if (!password.length) {
// 			console.log('password is required');
// 			returnObject.errors.push('Password is required');
// 		}

// 		if (returnObject.errors.length) {
// 			returnObject.success = false;
// 			return returnObject;
// 		}

// 		const { data, error } = await supabase.auth.signInWithPassword({
// 			email,
// 			password
// 		});

// 		if (error || !data.user) {
// 			returnObject.success = false;
// 			return fail(400, returnObject);
// 		}

// 		redirect(303, '/');
// 	},
// 	googleLogin: async ({ locals: { supabase } }) => {
// 		const { data, error } = await supabase.auth.signInWithOAuth({
// 			provider: 'google',
// 			options: {
// 				redirectTo: `${PUBLIC_FRONTEND_URL}/auth/callback`
// 			}
// 		});

// 		if (error) {
// 			return fail(400, { message: 'Something went wrong with Google login' });
// 		}

// 		throw redirect(303, '/');
// 	}
// };
