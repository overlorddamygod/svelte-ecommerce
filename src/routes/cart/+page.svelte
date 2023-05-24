<script lang="ts">
	// import { ChangeEvent } from 'svelte';
	import cart, { addToCart, updateCartItemQuantity  } from '../../store';
	import type { TCartItem } from '../../types';

	$: totalPrice = $cart.reduce((total, next) => {
		return total + next.quantity * next.product.price;
  	}, 0);

	$: count = $cart.length;
	let debounceTimeout: ReturnType<typeof setTimeout>;

	async function handleQuantityChange(id: number, event: any) {
		const quantity = parseInt(event.target.value, 10);
		if (!isNaN(quantity)) {
			clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(async () => {
			await updateCartItemQuantity(id, quantity);
			}, 300); // Adjust the debounce delay as needed (in milliseconds)
		}
	}

	
	export let data: {
		cartItems: TCartItem[]
	};
	cart.set(data.cartItems)
</script>

<svelte:head>
	<title>Cart</title>
</svelte:head>

<section>
	

	{#each $cart as cartItem}
		<div>
			<h3>{cartItem.product.name}</h3>
			<p>{cartItem.product.price}</p>
			<p>{cartItem.quantity}</p>
            
			<!-- button to increase, decrease and setQuantity -->
			<!-- <button on:click={()=>addToCart(cartItem.product.id, 1)}>+</button> -->
			<!-- <button on:click={()=>addToCart(cartItem.product.id, -1)}>-</button> -->
			<input type="number" bind:value="{cartItem.quantity}" on:change={(event) => handleQuantityChange(cartItem.id, event)}>
			<!-- <button on:click={()=>addToCart(cartItem.product.id, 0)}>Set Quantity</button> -->

			<!-- <button on:click={()=>addToCart(product)}>Add to Cart</button> -->
		</div>
	{/each}
    <div>Total: {totalPrice}</div>
</section>