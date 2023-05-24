import prisma from '$lib';
import { error, json } from '@sveltejs/kit';

export const GET = async (req) => {
	const session = await req.locals.getSession();
	// eslint-disable-next-line
	const userId = +session!.user.id;

	const cartItems = await prisma.cartItem.findMany({
		where: {
			userId
		},
		include: {
			product: true
		}
	});

	return json(cartItems);
};

export async function POST({ request, locals }) {
	const { id } = await request.json();

	if (!id) {
		throw error(400, 'No id provided');
	}

	const product = await prisma.product.findUnique({
		where: {
			id
		}
	});

	if (!product) {
		throw error(404, 'No product found');
	}

	const session = await locals.getSession();
	// eslint-disable-next-line
	const userId = +session!.user.id;

	// search if the product is already in the cart
	const cartItemExists = await prisma.cartItem.findFirst({
		where: {
			productId: product.id,
			userId
		}
	});

	if (cartItemExists) {
		// update quantity
		const cartItem = await prisma.cartItem.update({
			where: {
				id: cartItemExists.id
			},
			data: {
				quantity: cartItemExists.quantity + 1
			},
			include: {
				product: true
			}
		});

		return json(cartItem, {
			status: 201
		});
	}

	// add product to cartitem
	const cartItem = await prisma.cartItem.create({
		data: {
			product: {
				connect: {
					id: product.id
				}
			},
			quantity: 1,
			user: {
				connect: {
					id: userId
				}
			}
		},
		include: {
			product: true
		}
	});

	return json(cartItem, {
		status: 201
	});
}

export const PUT = async ({ request, locals }) => {
	const { id, quantity } = await request.json();

	if (!id) {
		throw error(400, 'No id provided');
	}

	const session = await locals.getSession();
	// eslint-disable-next-line
	const userId = +session!.user.id;

	// check if id exist
	let cartItem = await prisma.cartItem.findFirst({
		where: {
			id,
			userId
		}
	});

	if (!cartItem) {
		throw error(404, 'No cart item found');
	}

	cartItem = await prisma.cartItem.update({
		where: {
			id
		},
		data: {
			quantity
		},
		include: {
			product: true
		}
	});

	return json(cartItem);
};

export const DELETE = async ({ request, locals }) => {
	const { id } = await request.json();

	if (!id) {
		throw error(400, 'No id provided');
	}

	const session = await locals.getSession();
	// eslint-disable-next-line
	const userId = +session!.user.id;

	// check if id exist
	let cartItem = await prisma.cartItem.findFirst({
		where: {
			id,
			userId
		}
	});

	if (!cartItem) {
		throw error(404, 'No cart item found');
	}

	cartItem = await prisma.cartItem.delete({
		where: {
			id
		},
		include: {
			product: true
		}
	});

	return json(cartItem);
};
