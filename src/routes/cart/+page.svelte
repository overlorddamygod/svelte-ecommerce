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

	$: totalPrice = $cart.reduce((total, next) => {
		return total + next.quantity * next.product.price;
	}, 0);

	let debounceTimeout: ReturnType<typeof setTimeout>;

	async function handleQuantityChange(id: number, event: any) {
		const quantity = parseInt(event.target.value, 10);
		if (!isNaN(quantity)) {
			clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(async () => {
				await updateCartItemQuantity(id, quantity);
			}, 300);
		}
	}

	export let data: {
		cartItems: TCartItem[];
	};
	cart.set(data.cartItems);
</script>

<svelte:head>
	<title>Cart</title>
</svelte:head>

<section>
	<Table>
		<TableHead>
			<TableHeadCell>Product name</TableHeadCell>
			<TableHeadCell>Quantity</TableHeadCell>
			<TableHeadCell>Unit Price</TableHeadCell>
			<TableHeadCell>Total Price</TableHeadCell>
			<TableHeadCell>Actions</TableHeadCell>
		</TableHead>

		{#each $cart as cartItem}
			<TableBodyRow>
				<TableBodyCell>{cartItem.product.name}</TableBodyCell>
				<TableBodyCell
					><input
						type="number"
						class="text-black"
						bind:value={cartItem.quantity}
						on:input={(event) => handleQuantityChange(cartItem.id, event)}
					/></TableBodyCell
				>
				<TableBodyCell>Rs. {cartItem.product.price}</TableBodyCell>
				<TableBodyCell>Rs. {cartItem.quantity * cartItem.product.price}</TableBodyCell>
				<TableBodyCell
					><button on:click={() => removeFromCart(cartItem.id)}>Remove</button></TableBodyCell
				>
			</TableBodyRow>
		{/each}
	</Table>

	<P>Total: {totalPrice}</P>
	<Button>Checkout</Button>
</section>
