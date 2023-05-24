import { writable } from 'svelte/store';
import type { TCartItem } from '../types';
import { goto } from '$app/navigation';

const cart = writable<TCartItem[]>([]);

const addToCart = async (id: number) => {
	try {
		const res = await fetch('/api/cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		});

		const resData = await res.json();

		cart.update((items) => {
			const itemExists = items.find((item) => item.productId === resData.productId);
			
			if (itemExists) {
				return items.map((item) => {
					if (item.productId === resData.productId) {
						return resData;
					}
					return item;
				});
			}
			return [...items, resData];
		});
	} catch (err) {
		alert("ERR"+err.message)
		console.log(err);
		// alert("ERR"+err.message);
	}
};

// Fetch cart items from the server
export async function fetchCartItems() {
	try {
		const response = await fetch('/api/cart', {
			method: 'GET'
		}); // Modify the URL according to your API endpoint
		if (response.ok) {
			const cartItems = await response.json();
			cart.set(cartItems); // Update the cart store with the fetched cart items
		} else {
			// console.log(err);
			alert("ERR")
			// Handle error response
		}
	} catch (err) {
		alert("ERR"+err.message)
		console.log(err);
		// Handle network or request error
	}
}

const updateCartItemQuantity = async (id: number, quantity: number) => {
  console.log("UPDATING")

  try {
		const response = await fetch('/api/cart', {
			method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, quantity })
		}); // Modify the URL according to your API endpoint
		if (response.ok) {
			const updatedItem = await response.json();

      cart.update((items) => {
        return items.map((item) => {
          if (item.id === id) {
            return updatedItem;
          }
          return item;
        });
      })
		} else {
			// console.log(err);
			// Handle error response
		}
	} catch (err) {
		console.log(err);

		// Handle network or request error
	}
}

export default cart;

export { addToCart, updateCartItemQuantity };
