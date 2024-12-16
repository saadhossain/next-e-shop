type CheckoutStatusProps = {
  step: string;
};

const CheckoutStatus = ({ step }: CheckoutStatusProps) => {
  return (
    <div className="checkout-status">
      <ul className="checkout-steps">
        <li className={`${step === "wishlist" ? "active" : "done"}`}>
          <i className="icon-heart" />
        </li>
        <li className={`${step === "cart" ? "active" : "done"}`}>
          <i className="icon-cart" />
        </li>
      </ul>
    </div>
  );
};

export default CheckoutStatus;
