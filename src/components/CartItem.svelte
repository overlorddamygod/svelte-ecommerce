<script lang="ts">
	import { Button, NumberInput, P, TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import type { TCartItem } from '../types';
	import { removeFromCart, updateCartItemQuantity } from '../store';

	let debounceTimeout: ReturnType<typeof setTimeout>;
	let inputElement: HTMLInputElement;

	const isNumValid = (val: number) => {
		return !!val && val >= 1;
	};

	async function handleQuantityChange(id: number, event: any) {
		const quantity = parseInt(event.target.value, 10);
		if (!isNaN(quantity)) {
			clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(async () => {
				await updateCartItemQuantity(id, quantity);
			}, 300);
		}
	}
	export let cartItem: TCartItem;
</script>

<div class="flex border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700 px-5 py-2">
	<div class="flex-1">
		<P class="md:text-2xl" size="xl">{cartItem.product.name}</P>
		<div class="dark:text-gray-300">Rs. {cartItem.product.price}</div>
	</div>
	<div class="flex items-center">
		<div class="inline-flex rounded-md shadow-sm px-4" role="group">
			<button
				type="button"
				class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
				on:click={() => {
					if (cartItem.quantity > 1) {
						inputElement.value = (parseInt(inputElement.value) - 1).toString();
						// handleQuantityChange(cartItem.id, {target: inputElement})
						inputElement.dispatchEvent(new Event('input'));
					}
				}}
			>
				-
			</button>
			<input
				type="number"
				class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white focus:outline-none w-20"
				bind:this={inputElement}
				bind:value={cartItem.quantity}
				on:change={() => {
					if (!isNumValid(cartItem.quantity)) {
						inputElement.value = '1';
						inputElement.dispatchEvent(new Event('input'));
					}
				}}
				on:input={(event) => handleQuantityChange(cartItem.id, event)}
			/>
			<button
				type="button"
				class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
				on:click={() => {
					inputElement.value = (parseInt(inputElement.value) + 1).toString();
					inputElement.dispatchEvent(new Event('input'));
				}}
			>
				+
			</button>
		</div>

		<button
			class="px-2 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
			on:click={() => removeFromCart(cartItem.id)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="17px"
				height="17px"
				class="dark:fill-white"
				><path
					d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"
				/></svg
			>
		</button>
	</div>
</div>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}

	input:focus {
		outline: none;
	}
</style>
