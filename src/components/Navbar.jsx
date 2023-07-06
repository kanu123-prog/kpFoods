import React,{useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import Modal from "../Modal";
import Badge from "react-bootstrap/Badge";
import Cart from "../screens/Cart";
export default function Navbar() {
  const [cartview,setcartview]= useState(false)
  const navigate = useNavigate();
  const handlelogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            KappuFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto mb-2">
              <Link className="nav-link active fs-5" aria-current="page" to="/">
                Home
              </Link>
              {(localStorage.getItem("authToken"))?
              <Link className="nav-link active fs-5" aria-current="page" to="/">
                My Orders
              </Link>
              :""}
            </div>
            {(!localStorage.getItem("authToken"))?
            <div>
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/createuser"
                >
                  Signup
                </Link>
              </div>:
              <div>
              <div className="btn bg-white text-success mx-1" onClick={()=>{setcartview(true)}}>
              My Cart {" "}
              <Badge pill bg="danger">3</Badge>
              </div>
              {cartview? <Modal onClose={()=>{setcartview(false)}}><Cart/></Modal>:null }
              <div className="btn bg-white text-danger mx-1 " onClick={handlelogout}>logout</div>
              </div>
              
              }
  
          </div>
        </div>
      </nav>
    </div>
  );
}
