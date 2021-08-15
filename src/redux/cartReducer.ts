import { UserInteraction } from '../services/interactionsInterface'
import { CartState, ProductAdded } from '../models/productAddedModel'
import { Product } from '../models/productModel'
import { INCREMENT_PRODUCT, DECREMENT_PRODUCT, REMOVE_PRODUCT } from '../services/interactions'
import { Reducer } from 'redux'

//The initial state of the cart
const initialState: CartState = {
    products: [],
    total: 0
}

export default function cartReducer(state = initialState, action: any): CartState {

    const { products, total } = state;
    const { chosenProduct, type } = action;

    switch (type) {
        case INCREMENT_PRODUCT:

            const incrementedProduct: ProductAdded = {
                name: chosenProduct.product.name,
                price: chosenProduct.product.price,
                quantity: 1,
                image: chosenProduct.product.image
            }

            let newProducts: ProductAdded[] = state.products;

            //check if any
            if (products.some(product => product.name == incrementedProduct.name)) {
                products.find(product => product.name == incrementedProduct.name)!.quantity += 1
            }
            else {
                newProducts = products.concat(incrementedProduct)
            }

            const newTotal = total + incrementedProduct.price;

            return {
                ...state,
                products: newProducts,
                total: +(Math.round(newTotal * 100) / 100).toFixed(2)
            }
        case DECREMENT_PRODUCT:

            const decrementedProduct: ProductAdded = {
                name: chosenProduct.product.name,
                price: chosenProduct.product.price,
                quantity: chosenProduct.product.quantity,
                image: chosenProduct.product.image
            }

            let newDecrementedTotal = total;

            if (decrementedProduct!.quantity > 1) {
                products.find(product => product.name == decrementedProduct.name)!.quantity -= 1
                newDecrementedTotal = total - decrementedProduct.price
            }

            return {
                ...state,
                total: +(Math.round(newDecrementedTotal * 100) / 100).toFixed(2)
            }

        case REMOVE_PRODUCT:

            const removedProduct: ProductAdded = {
                name: chosenProduct.product.name,
                price: chosenProduct.product.price,
                quantity: chosenProduct.product.quantity,
                image: chosenProduct.product.image
            }

            const productFound = products.find(product => product.name == removedProduct.name);
            const productsFiltered = products.filter(product => product !== productFound);
            const newFilteredTotal = total - removedProduct.quantity * removedProduct.price;

            return {
                ...state,
                products: productsFiltered,
                total: +(Math.round(newFilteredTotal * 100) / 100).toFixed(2)
            }
        default:
            return state;
    }
}