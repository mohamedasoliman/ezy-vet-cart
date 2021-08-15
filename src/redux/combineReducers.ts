import {combineReducers} from 'redux';
import cartReducer from './cartReducer';
import { CartState } from '../models/productAddedModel';

const rootReducer = combineReducers<CartState>({
    cart: cartReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

