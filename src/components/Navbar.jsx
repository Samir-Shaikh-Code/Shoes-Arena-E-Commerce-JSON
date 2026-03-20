import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import "./Navbar.css"
import { CartContext } from "../context/CartContext";

function Navbar() {

  const {user, logout} = useContext(AuthContext);
  const {cart} = useContext(CartContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you want to logout?")

    if(confirmLogout){
      logout();
      navigate("/");
    }
  }

  return (
    <>
        <nav className="container navcontainer">

          <div className="row navrow">

            <div className="col logo"><h1>Shoes Arena</h1></div>

            <div className="col links links1">

              <ul>
                <li><Link to="/">Home</Link>
                <div className="links-hover-div"></div>
                </li>
                
                <li><Link to="/about">About</Link>
                <div className="links-hover-div"></div>
                </li>

                <li><Link to="/products">Products</Link>
                <div className="links-hover-div"></div>
                </li>

                {user && <li>
                <Link to="/cart">Cart ({cart.reduce((total,item) => total + item.quantity,0)})</Link>
                <div className="links-hover-div"></div>
                </li> }
                
              </ul>
              
            </div>

            <div className="col links links2">

              <ul>
                
                {user ? (<><li><button className="logout-button" onClick={handleLogout}>Logout</button></li></>) : 
                      (<><li><Link to="/login">Login</Link>
                          <div className="links-hover-div"></div>
                          </li>
                         <li><Link to="/register">Register</Link>
                         <div className="links-hover-div"></div> 
                         </li>
                       </>)}
              </ul>
              
            </div>

          </div>
            
        </nav>
    </>
  )
}

export default Navbar;