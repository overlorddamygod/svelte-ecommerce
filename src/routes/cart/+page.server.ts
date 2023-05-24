import prisma from '$lib';

export const load = async ({ locals }) => {
	const session = await locals.getSession();
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

	return {
		cartItems
	};
};
