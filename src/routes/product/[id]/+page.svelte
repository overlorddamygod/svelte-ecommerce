<script lang="ts">
	import type { Product } from "@prisma/client";
	import { Button, P } from "flowbite-svelte";
	import { addToCart } from "../../../store";

    export let data: {
        product: Product
    };
</script>

<svelte:head>
    <title>{data.product.name}</title>
</svelte:head>

<section class="flex flex-col md:flex-row gap-2">
    <div class="flex-1">
        <!-- <img src={data.product.image} alt={data.product.name} /> -->
    </div>
    <div class="flex-1">
        <P class="text-3xl font-bold">{data.product.name}</P>
        <P class="text-xl">{data.product.name}</P>
        <P class="text-2xl font-bold">${data.product.price}</P>
        <Button on:click={() => addToCart(data.product.id)}>Add to Cart</Button>
    </div>
</section>