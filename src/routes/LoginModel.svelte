<script>
	import { signIn } from '@auth/sveltekit/client';
	import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
	let formModal = false;

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

<Button on:click={() => (formModal = true)}>Login</Button>

<Modal id="form-modal" bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="#" on:submit|preventDefault={login}>
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
		<Label class="space-y-2">
			<span>Email</span>
			<Input
				type="email"
				name="email"
				placeholder="name@company.com"
				required
				value={email}
				on:change={(e) => {
					// console.log(e)
					email = e.target.value;
				}}
			/>
		</Label>
		<Label class="space-y-2">
			<span>Your password</span>
			<Input
				type="password"
				name="password"
				placeholder="•••••"
				required
				value={password}
				on:change={(e) => {
					// console.log(e)
					password = e.target.value;
				}}
			/>
		</Label>
		<div class="flex items-start">
			<Checkbox>Remember me</Checkbox>
			<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
				>Lost password?</a
			>
		</div>
		<Button type="submit" class="w-full1">Login to your account</Button>
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			Not registered? <a href="/" class="text-blue-700 hover:underline dark:text-blue-500"
				>Create account</a
			>
		</div>
	</form>
</Modal>
