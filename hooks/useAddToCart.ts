import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import type { ProductStoreType } from "types";
import { addProduct } from "../store/reducers/cart";

export const useAddToCart = () => {
    const dispatch = useDispatch();
    const addToCart = (productToSave: ProductStoreType, count: number) => {
        const productStore = {
            count,
            product: productToSave,
        };
        dispatch(addProduct(productStore));
        toast.success('Product added to Cart.');
    }
    return addToCart
}