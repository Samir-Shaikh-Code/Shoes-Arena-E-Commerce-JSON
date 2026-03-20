import { createContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }

    const res = await fetch(`http://localhost:5000/cart?userId=${user.id}`);
    const data = await res.json();
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const clearCart = async () => {
    for (let item of cart) {
      await fetch(`http://localhost:5000/cart/${item.id}`, {
        method: "DELETE",
      });
    }
    fetchCart();
  };

  const addToCart = async (product) => {
    // const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    const res = await fetch(`http://localhost:5000/cart?userId=${user.id}`);
    const cartItem = await res.json();

    const existingProduct = cartItem.find(
      (item) => item.productId === product.id,
    );

    if (existingProduct) {
      await fetch(`http://localhost:5000/cart/${existingProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: existingProduct.quantity + 1 }),
      });
    } else {
      await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          img: product.img,
          quantity: 1,
          userId: user.id,
        }),
      });
    }
    fetchCart();
  };

  const removeFromCart = async (id) => {
    await fetch(`http://localhost:5000/cart/${id}`, {
      method: "DELETE",
    });
    fetchCart();
  };

  const increaseQty = async (item) => {
    await fetch(`http://localhost:5000/cart/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: item.quantity + 1,
      }),
    });
    fetchCart();
  };

  const decreaseQty = async (item) => {
    if (item.quantity === 1) {
      await fetch(`http://localhost:5000/cart/${item.id}`, {
        method: "DELETE",
      });
    } else {
      await fetch(`http://localhost:5000/cart/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: item.quantity - 1,
        }),
      });
    }
    fetchCart();
  };

  const checkOut = () => {
    alert("Payment gateway coming soon.....!");
  };
  return (
    <>
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          removeFromCart,
          increaseQty,
          decreaseQty,
          checkOut,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}

export default CartProvider;
