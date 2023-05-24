<script lang="ts">
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
	<table>
		<tr>
			<th>Product</th>
			<th>Quantity</th>
			<th>Unit Price</th>
			<th>Total Price</th>
			<th>Actions</th>
		</tr>
		{#each $cart as cartItem}
			<tr>
				<td>{cartItem.product.name}</td>
				<td>
					<!-- <button on:click={()=>cartItem.quantity--}>-</button> -->
					<input
						type="number"
						bind:value={cartItem.quantity}
						on:input={(event) => handleQuantityChange(cartItem.id, event)}
					/>
					<!-- <button on:click={()=>cartItem.quantity++}>+</button> -->
				</td>
				<td>Rs. {cartItem.product.price}</td>
				<td>Rs. {cartItem.quantity * cartItem.product.price}</td>

				<!-- button to increase, decrease and setQuantity -->
				<!-- <button on:click={()=>addToCart(cartItem.product.id, 1)}>+</button> -->

				<td>
					<button on:click={() => removeFromCart(cartItem.id)}>Remove</button>
				</td>
				<!-- <button on:click={()=>addToCart(cartItem.product.id, 0)}>Set Quantity</button> -->

				<!-- <button on:click={()=>addToCart(product)}>Add to Cart</button> -->
			</tr>
		{/each}
	</table>

	<div>Total: {totalPrice}</div>
</section>

<style>
	table {
		width: 100%;
	}
</style>
