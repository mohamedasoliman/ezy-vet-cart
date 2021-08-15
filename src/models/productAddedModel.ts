//A model for the products added by the user to the cart
export type ProductAdded = 
{
    name: string,
    price: number,
    quantity: number
    image: string
}

export type Cart = {
    [key: string]: ProductAdded;
}

export interface CartState {
    products: ProductAdded[];
    total: number;
}