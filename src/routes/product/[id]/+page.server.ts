import prisma from '$lib';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    // eslint-disable-next-line
    const id = +params.id;
    console.log("ID", id);

    const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true }
    })

    console.log(product)

    if (product) {
        return {
            product
        }
    }

    throw error(404, 'Not found');
}