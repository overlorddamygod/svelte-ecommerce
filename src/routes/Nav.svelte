<script>
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider,
		Input
	} from 'flowbite-svelte';
	import LoginModel from './LoginModel.svelte';
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img
			src="https://flowbite.com/docs/images/logo.svg"
			class="mr-3 h-6 sm:h-9"
			alt="Flowbite Logo"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Ecommerce</span
		>
	</NavBrand>
	<NavUl {hidden}>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/cart">Cart</NavLi>
	</NavUl>
	<div class="hidden relative md:block" {hidden}>
		<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 dark:text-white"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/></svg
			>
		</div>
		<Input id="search-navbar" class="pl-10" placeholder="Search..." />
	</div>
	{#if $page.data.session?.user}
		<div class="flex items-center md:order-2">
			<Avatar id="avatar-menu" src="https://flowbite-svelte.com/images/profile-picture-3.webp" />
			<NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1" />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm"> {$page.data.session.user.name} </span>
				<span class="block truncate text-sm font-medium"> {$page.data.session.user.email} </span>
			</DropdownHeader>
			<DropdownItem>Dashboard</DropdownItem>
			<DropdownItem>Settings</DropdownItem>
			<DropdownItem>Earnings</DropdownItem>
			<DropdownDivider />
			<DropdownItem on:click={signOut}>Sign out</DropdownItem>
		</Dropdown>
	{:else}
		<LoginModel />
	{/if}
</Navbar>
