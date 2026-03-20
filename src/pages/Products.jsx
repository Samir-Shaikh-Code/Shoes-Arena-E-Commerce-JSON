import { useContext, useEffect, useState } from "react";
import "./Products.css";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [addedId, setAddedId] = useState(null);

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {

    if (!user) {
      alert("Please login first");
      navigate("/login")
      return;
    }

    addToCart(product);

    setAddedId(product.id);

    setTimeout(() => {
      setAddedId(null);
    }, 1000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Products</h1>

      <div className="products-container">
        <div className="products-row">
          {products.map((product) => (
            <div key={product.id} className="products-col">
              <img
                src={product.img}
                alt={product.name}
                width={300}
                height={300}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <h4>₹{product.price}</h4>

              <button
                className="addCart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <div
                className={`item-added ${addedId === product.id ? "show" : ""}`}
              >
                Item added to cart ✅
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
