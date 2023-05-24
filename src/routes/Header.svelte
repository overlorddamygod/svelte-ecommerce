<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import loggedIn from '../store/user';
	import Cart from './Cart.svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';

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
				<li>
					<a>Logged in as {$page.data.session.user.name}</a>
				</li>
				<li>
					<button on:click={signOut}>Log Out</button>
				</li>
			{:else}
				<button on:click={login}>Log In</button>
			{/if}
		</ul>
	</nav>
</header>

<style>
	/* li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	} */
</style>
