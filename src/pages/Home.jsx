import "./Home.css"
import { Link } from "react-router-dom"

function Home() {
  return (
    <>
      <div className="home-container">

        <div className="hero-section">
          <h1>Step Into Style</h1>
          <p>
            Discover premium sneakers and stylish footwear designed for
            comfort, performance and everyday lifestyle. Start your collection now.
          </p>

          <Link to="/products">
            <button className="shop-btn">Shop Now</button>
          </Link>
        </div>

        <div className="home-features">

          <div className="feature-card">
            <h2>Premium Quality</h2>
            <p>
              Every pair of shoes in our store is crafted with premium
              materials to deliver durability and maximum comfort.
            </p>
          </div>

          <div className="feature-card">
            <h2>Latest Trends</h2>
            <p>
              Explore trending sneakers and fashion-forward footwear
              inspired by global streetwear culture.
            </p>
          </div>

          <div className="feature-card">
            <h2>Affordable Prices</h2>
            <p>
              Style should never be expensive. We provide the best shoes
              at prices that fit your budget.
            </p>
          </div>

        </div>

      </div>
    </>
  )
}

export default Home