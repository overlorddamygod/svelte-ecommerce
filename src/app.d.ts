// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		declare module 'next-auth' {
			interface User {
				id: number; // Or string
			}
			interface Session {
				expires: string;
				user: User;
			}
		}
	}
}

export {};
