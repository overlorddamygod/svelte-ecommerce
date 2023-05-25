<script lang="ts">
	import { Button, Search } from 'flowbite-svelte';
	import ProductCard from '../ProductCard.svelte';
	import type { Product } from '@prisma/client';
	import { page } from '$app/stores';

	$: q = $page.url.searchParams.get('q') || '';

	export let data: {
		result: Product[];
	};
</script>

<form method="get">
	<Search name="q" value={q}>
		<Button>Search</Button>
	</Search>
</form>

<section class="grid gap-4 grid-cols-2 md:grid-cols-3">
	{#each data.result as product}
		<ProductCard {product} addToCart={() => {}} />
	{/each}
</section>
