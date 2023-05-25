<script lang="ts">
	import {
		Button,
		P,
		Table,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import cart, { removeFromCart, updateCartItemQuantity } from '../../store';
	import type { TCartItem } from '../../types';
	import CartItem from '../CartItem.svelte';

	$: totalPrice = $cart.reduce((total, next) => {
		return total + next.quantity * next.product.price;
	}, 0);

	export let data: {
		cartItems: TCartItem[];
	};
	cart.set(data.cartItems);
</script>

<svelte:head>
	<title>Cart</title>
</svelte:head>

<section class="flex flex-col md:flex-row gap-2">
	<div class="flex-1">
		{#each $cart as cartItem}
			<CartItem {cartItem} />
		{/each}
	</div>
	<div class="p-3 bg-white dark:bg-gray-800 dark:border-gray-700">
		<P size="2xl">Total: {totalPrice}</P>
		<Button size="lg">Checkout</Button>
	</div>
</section>
