export type CartItemType = {
  id: string;
  cartId: string;
  productId: string;
  name: string;
  image: string | null;
  quantity: number;
  price: number;
};
