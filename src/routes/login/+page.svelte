<script>
	import { signIn } from '@auth/sveltekit/client';

	const login = async () => {
		try {
			await signIn('credentials', {
				email,
				password
			});
		} catch (err) {
			console.log(err);
		}
	};
	let email = '';
	let password = '';
</script>

<div>
	<form on:submit|preventDefault={login}>
		<input bind:value={email} type="email" name="email" />
		<input bind:value={password} type="password" name="password" />
		<button type="submit">Login</button>
	</form>
</div>
