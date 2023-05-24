import prisma from "$lib";

// disable prerender
export const prerender = false;

export const load = async () => {
    const products = await prisma.product.findMany();
    
    return {
        products,
    };
}