<script lang="ts">

	import type { Product } from '@prisma/client';
	import { addToCart } from '../store';

	export let data: {
		products: Product[]
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	

	{#each data.products as product}
		<div>
			<h3>{product.name}</h3>
			<p>{product.price}</p>
			<button on:click={()=>addToCart(product.id)}>Add to Cart</button>
		</div>
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
