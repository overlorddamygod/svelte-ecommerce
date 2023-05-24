import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import CredentialsProvider from '@auth/core/providers/credentials';
import { json, redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import prisma from '$lib';
import bcrypt from 'bcrypt';

const authorization: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api/cart')) {
		const session = await event.locals.getSession();
		if (!session) {
			// unauthorized json response
			return json(
				{
					error: 'Unauthorized'
				},
				{
					status: 401
				}
			);
		}
	}

	if (event.url.pathname.startsWith('/cart')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/login');
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
};

export const handle = sequence(
	SvelteKitAuth({
		providers: [
			CredentialsProvider({
				// The name to display on the sign in form (e.g. "Sign in with...")
				name: 'Credentials',
				// `credentials` is used to generate a form on the sign in page.
				// You can specify which fields should be submitted, by adding keys to the `credentials` object.
				// e.g. domain, username, password, 2FA token, etc.
				// You can pass any HTML attribute to the <input> tag through the object.
				credentials: {
					email: { label: 'Email', type: 'text', placeholder: 'email' },
					password: { label: 'Password', type: 'password' }
				},
				authorize: async (credentials, req) => {
					console.log('HERE', 'SAD', credentials);

					const user = await prisma.user.findFirst({
						where: {
							email: credentials.email as string
						}
					});

					if (!user) {
						return null;
					}

					const passwordValid = await bcrypt.compare(credentials.password as string, user.password);

					if (!passwordValid) {
						return null;
					}

					return user;
				}
			})
		],
		// set id in session
		callbacks: {
			jwt: async ({ token, user }) => {
				if (user) {
					token.id = user.id;
				}
				return token;
			},
			session: ({ session, user, token }) => {
				// console.log("SAD",session, user, token)
				if (session.user) {
					session.user.id = token.id as number;
				}
				return session;
			}
		}
	}),
	authorization
);
