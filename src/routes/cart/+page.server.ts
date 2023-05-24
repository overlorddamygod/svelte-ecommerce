import prisma from "$lib";

export const load = async () => {
    const cartItems = await prisma.cartItem.findMany({
        where: {
            userId: 1
        },
        include: {
            product: true
        }
    });
    
    return {
        cartItems,
    };
}