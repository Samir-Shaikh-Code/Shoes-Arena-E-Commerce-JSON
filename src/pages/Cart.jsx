import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, checkOut, clearCart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="page-center">
        <h2>Your Cart is Empty</h2>
      </div>
    );
  }

  const totalItems = cart.reduce(
  (total, item) => total + item.quantity, 0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )

  return (
    <>
      <h1>Your cart</h1>

      <div className="products-container">
        <div className="products-row">
          {cart.map((items) => (
            <div key={items.id} className="products-col">
              <img src={items.img} alt={items.name} width={300} height={300} />
              <h3>{items.name}</h3>
              <p>{items.description}</p>
              <h4>₹{items.price}</h4>

              <div className="qty-box">
                <button className="decreaseButton" onClick={() => decreaseQty(items)}>-</button>
                <span>{items.quantity}</span>
                <button onClick={() => increaseQty(items)}>+</button>
              </div>

              <p>Subtotal : ₹{items.price * items.quantity}</p>

              <button className="addCart-btn remove-btn" onClick={() => removeFromCart(items.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total Items : <b>{totalItems}</b></p>
        <p>Total Price: <strong>₹{totalPrice}</strong></p>
        <button className="checkout-btn" onClick={checkOut}>Checkout</button>
        <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
      </div>
    </>
  );
}

export default Cart;
