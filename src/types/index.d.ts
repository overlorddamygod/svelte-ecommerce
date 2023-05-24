import type { CartItem, Product } from '@prisma/client';

type TCartItem = CartItem & { product: Product };
export {TCartItem}