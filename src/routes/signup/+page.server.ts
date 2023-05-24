import prisma from '$lib';
import { error } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('username') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!name || !email || !password) {
			throw error(400, 'Missing name, email or password');
		}

		try {
			const userExists = await prisma.user.findFirst({
				where: {
					email
				}
			});

			if (userExists) {
				throw error(400, 'Email already in use');
			}

			const hashedPassword = await bcrypt.hash(password, 12);

			const user = await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword
				}
			});

			return { success: true };
		} catch (e) {
			console.log(e);
			throw error(500, 'Something went wrong');
		}
	}
};
