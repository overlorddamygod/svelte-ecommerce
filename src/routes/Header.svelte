<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import loggedIn from '../store/user';
	import Cart from './Cart.svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import {
		Dropdown,
		DropdownItem,
		DropdownDivider,
		DropdownHeader,
		Button,
		Chevron
	} from 'flowbite-svelte';

	const login = async () => {
		// signIn()
		// signin credentials
		try {
			await signIn('credentials', {
				email: '',
				password: ''
			});
		} catch (err) {
			console.log(err);
		}
	};
</script>

<header>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
				<a href="/sverdle">Sverdle</a>
			</li>
			{#if $page.data.session?.user}
				<Cart />

				<div>
					<Button><Chevron>{$page.data.session.user.name}</Chevron></Button>
					<Dropdown>
						<!-- <DropdownItem>Dashboard</DropdownItem>
					<DropdownItem>Settings</DropdownItem>
					<DropdownItem>Earnings</DropdownItem> -->
						<DropdownItem on:click={signOut}>Sign out</DropdownItem>
					</Dropdown>
				</div>
			{:else}
				<button on:click={login}>Log In</button>
			{/if}
		</ul>
	</nav>
</header>
