/** @satisfies {import('./$types').Actions} */

// import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema } from './registerSchema';
import { redirect } from '@sveltejs/kit';


export const load = async () => {
	const form = await superValidate(zod(registerSchema));
	return form;
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		// const formData = await request.formData();
		const form = await superValidate(request, zod(registerSchema));
		if (!form.valid) {
			console.log('form is not valid');
			return fail(400, { form });
		}

		const { firstName, lastName, email, password, passwordConfirm } = form.data;

		// const firstName = formData.get('firstName') as string;
		// const lastName = formData.get('lastName') as string;
		// const email = formData.get('email') as string;
		// const password = formData.get('password') as string;
		// const passwordConfirm = formData.get('passwordConfirm') as string;

		// const returnObject: {
		// 	success: boolean;
		// 	errors: string[];
		// 	firstName: string;
		// 	lastName: string;
		// 	email: string;
		// 	password: string;
		// 	passwordConfirm: string;
		// } = {
		// 	success: true,
		// 	email,
		// 	firstName,
		// 	lastName,
		// 	password,
		// 	passwordConfirm,
		// 	errors: []
		// };

		// // if (firstName.length < 2) {
		// // 	console.log('name is too short');
		// // 	return { success: false, message: 'First name must be at least 3 characters' };
		// // }

		// if (firstName.length < 2) {
		// 	console.log('name is too short');
		// 	returnObject.errors.push('First name must be at least 3 characters');
		// }

		// if (lastName.length < 2) {
		// 	console.log('name is too short');
		// 	returnObject.errors.push('Last name must be at least 3 characters');
		// }

		// if (!email.length) {
		// 	console.log('email is required');
		// 	returnObject.errors.push('Email is required');
		// }

		// if (!password.length) {
		// 	console.log('password is required');
		// 	returnObject.errors.push('Password is required');
		// }

		// if (password !== passwordConfirm) {
		// 	console.log('passwords do not match');
		// 	returnObject.errors.push('Passwords do not match');
		// }

		// if (returnObject.errors.length) {
		// 	returnObject.success = false;
		// 	return returnObject;
		// }

		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});

		if (error || !data.user) {
			console.log('error', error);
			// returnObject.success = false;
			return fail(400, { form });
		}

		// invalidate('supabase:auth');

		redirect(303, '/');
	}
};
