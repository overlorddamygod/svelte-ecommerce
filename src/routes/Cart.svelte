<script>
	import { onMount } from 'svelte';
	import cart, { fetchCartItems } from '../store';

	onMount(() => {
		fetchCartItems();
	});
</script>

<li>
	<a href="/cart">Cart: {$cart.length} items</a>
</li>
