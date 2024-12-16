import { useDispatch } from "react-redux";
import { removeFromWishlist } from "store/reducers/wishlist";
import type { ProductStoreType } from "types";

const WishlistProds = ({
  thumb,
  name,
  id,
  color,
  size,
  count,
  price,
}: ProductStoreType) => {
  const dispatch = useDispatch();

  // Function for removeing product from the Wishlist
  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(id))
  };

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
      <td>
        <strong>{count}</strong>
      </td>
      <td>${price}</td>
      <td style={{
        width: '200px'
      }}>
        <button
          type="submit"
          // onClick={() => addToCart()}
          className="btn btn--rounded btn--yellow"
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
