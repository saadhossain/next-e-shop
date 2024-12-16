import { useAddToCart } from 'hooks/useAddToCart';
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "store/reducers/wishlist";
import type { ProductStoreType } from "types";

const WishlistProds = ({
  id,
  name,
  thumb,
  price,
  count,
  color,
  size,
}: ProductStoreType) => {
  const dispatch = useDispatch();

  // Function for removeing product from the Wishlist
  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(id))
  };
  const productToSave = {
    id,
    name,
    thumb,
    price,
    count,
    color,
    size,
  }
  //Get the Add to Cart Hook
  const addToCart = useAddToCart();

  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={thumb} alt="" />
          </div>

          <div className="cart-product__content">
            <h3>{name}</h3>
            <p>#{id}</p>
          </div>
        </div>
      </td>
      <td className="cart-item-before" data-label="Color">
        {color}
      </td>
      <td className="cart-item-before" data-label="Size">
        {size}
      </td>
      <td className="cart-item-before" data-label="Quantity">
        <strong>{count}</strong>
      </td>
      <td className="cart-item-before" data-label="Price">${price}</td>
      <td>
        <button
          type="submit"
          onClick={() => addToCart(productToSave, count)}
          className="btn btn--rounded btn--yellow"
          style={{
            width: '140px',
            marginRight: '10px'
          }}
        >
          Add to cart
        </button>
      </td>
      <td className="cart-item-cancel">
        <i className="icon-cancel" onClick={() => handleRemoveFromWishlist()} />
      </td>
    </tr>
  );
};

export default WishlistProds;
