import { some } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "store";
import { addProduct } from "store/reducers/cart";
import { toggleFavProduct } from "store/reducers/user";
import type { ProductStoreType, ProductType } from "types";

import toast from 'react-hot-toast';
import { addToWishlist, removeFromWishlist } from 'store/reducers/wishlist';
import productsColors from "../../../utils/data/products-colors";
import productsSizes from "../../../utils/data/products-sizes";
import CheckboxColor from "../../products-filter/form-builder/checkbox-color";

type ProductContent = {
  product: ProductType;
};

const Content = ({ product }: ProductContent) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);
  const [color, setColor] = useState<string>("");
  const [itemSize, setItemSize] = useState<string>("");

  const onColorSet = (e: string) => setColor(e);
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setItemSize(e.target.value);

  const { favProducts } = useSelector((state: RootState) => state.user);
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const isFavourite = some(
    favProducts,
    (productId) => productId === product.id,
  );

  //Check if the product already added in wishlist
  const isInWishilist = some(
    wishlistItems,
    (items) => items.id === product.id,
  );

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id: product.id,
      }),
    );
  };

  //Arrange the Product object to be saved in card and wishlist
  const productToSave: ProductStoreType = {
    id: product.id,
    name: product.name,
    thumb: product.images ? product.images[0] : "",
    price: product.currentPrice,
    count,
    color,
    size: itemSize,
  };

  const addToCart = () => {
    const productStore = {
      count,
      product: productToSave,
    };
    dispatch(addProduct(productStore));
    toast.success('Product added to Cart.');
  };

  //Functionality for add to wishlist
  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ product: productToSave }));
    toast.success('Product added to Wishlist.');
  };
  //Functionality to remove the product from the Wishlist
  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(product.id));
    toast.success('Product removed from Wishlist.');
  };
  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">
          Product ID:
          <br />
          {product.id}
        </h5>
        <span className="product-on-sale">Sale</span>
        <h2 className="product__name">{product.name}</h2>

        <div className="product__prices">
          <h4>${product.currentPrice}</h4>
          {product.discount && <span>${product.price}</span>}
        </div>
      </div>

      <div className="product-content__filters">
        <div className="product-filter-item">
          <h5>Color:</h5>
          <div className="checkbox-color-wrapper">
            {productsColors.map((type) => (
              <CheckboxColor
                key={type.id}
                type="radio"
                name="product-color"
                color={type.color}
                valueName={type.label}
                onChange={onColorSet}
              />
            ))}
          </div>
        </div>
        <div className="product-filter-item">
          <h5>
            Size: <strong>See size table</strong>
          </h5>
          <div className="checkbox-color-wrapper">
            <div className="select-wrapper">
              <select onChange={onSelectChange}>
                <option>Choose size</option>
                {productsSizes.map((type) => (
                  <option key={type.id} value={type.label}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Quantity and Add To Cart Button */}
        <div className="product-filter-item">
          <h5>Quantity:</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button
                type="button"
                onClick={() => setCount(count - 1)}
                className="quantity-button__btn"
              >
                -
              </button>
              <span>{count}</span>
              <button
                type="button"
                onClick={() => setCount(count + 1)}
                className="quantity-button__btn"
              >
                +
              </button>
            </div>

            <button
              type="submit"
              onClick={() => addToCart()}
              className="btn btn--rounded btn--yellow"
            >
              Add to cart
            </button>
          </div>
        </div>
        {/* Add To Wishlist and Toogle Favourite Button */}
        <div className="product-filter-item">
          <div className="quantity-buttons">
            {/* Add to wishlist button */}
            <button
              type="submit"
              onClick={() => {
                isInWishilist ? handleRemoveFromWishlist() : handleAddToWishlist()
              }}
              className="btn btn--rounded btn--yellow"
            >
              {isInWishilist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
            <button
              type="button"
              onClick={toggleFav}
              className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
            >
              <i className="icon-heart" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
