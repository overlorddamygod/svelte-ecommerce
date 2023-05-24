import prisma from '$lib';
import { error, json } from '@sveltejs/kit';

export const GET = async (req) => {
    // console.log(await req.locals.getSession())
    const session = await req.locals.getSession()
    console.log(session)
    // session?.user.

    const cartItems = await prisma.cartItem.findMany({
        where: {
            userId: 1
        },
        include: {
            product: true
        }
    });

    return json(cartItems);
}

export async function POST({request}) {
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

    // search if the product is already in the cart
    const cartItemExists = await prisma.cartItem.findFirst({
        where: {

            productId: product.id,
            userId: 1
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
                    id: 1
                }
            }
        },
        include: {
            product: true
        }
    })

    return json(cartItem, {
        status: 201
    });
}

export const PUT = async ({request}) => {
    const { id, quantity } = await request.json();

    if (!id) {
        throw error(400, 'No id provided');
    }

    // check if id exist
    let cartItem = await prisma.cartItem.findUnique({
        where: {
            id
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
}