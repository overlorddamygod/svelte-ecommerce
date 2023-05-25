<script lang="ts">
	import type { Product } from '@prisma/client';
	import { Badge, Button, Card, P, Rating } from 'flowbite-svelte';
	export let product: Product;
	export let addToCart: (id: number) => void;
</script>

<Card padding="none">
	<a href="/">
		<img
			class="p-8 rounded-t-lg"
			src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bfa1a280-2009-4234-a615-1a92bccbb4f2/liverpool-fc-2023-24-stadium-home-dri-fit-football-shirt-gh1m0T.png"
			alt={product.name}
		/>
	</a>
	<div class="px-5 pb-5">
		<a href="/">
			<h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
				{product.name}
			</h5>
		</a>
		<Rating rating={4} size={18} class="mt-2.5 mb-5">
			<Badge slot="text" class="ml-3">4</Badge>
		</Rating>
		<div class="flex justify-between items-center">
			<span class="md:text-3xl font-bold text-gray-900 dark:text-white">Rs.{product.price}</span>
			<Button on:click={() => addToCart(product.id)}>Add to Cart</Button>
		</div>
	</div>
</Card>
