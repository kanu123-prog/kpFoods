import React from "react";
import Home from "../screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import "bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from "./contextReducer";
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
//we are using react router dom to prevent reloading of page whenver we click on the links inside our application
