import React, { useState, useEffect, useRef } from "react";
import { useDispatchCart,useCart } from "./contextReducer";

export default function Card(props) {
 
let dispatch = useDispatchCart();
let data = useCart()
const priceRef = useRef()
  let options = props.options|| {}; ;
  let priceOptions = Object.keys(options);
  const [qty, setqty]=useState(1);
  const [size, setsize] = useState("")
  const handleAddtoCart=async()=>{
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
    await console.log(data)
  }
  let finalPrice = qty * parseInt(options[size]);
  useEffect(()=>{
    setsize(priceRef.current.value)
  })
  return (
    <div>
      <div className="card m-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..."  style={{"height":"120px", "objectFit":"fill"}}/>
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
          {/* used to create the dropdown quantity picker */}
            <select className="m-2  h-100  bg-success rounded" onChange={(e)=>setqty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setsize(e.target.value)}>
                {priceOptions.map((data)=>{
                  return <option key ={data} value={data}>{data}</option>
                })}
            </select>
            <div className="d-inline fs-5">Rs{finalPrice}/-</div>
          </div>
          <hr />
          <button className="btn btn-success justify-center ms-2" onClick={handleAddtoCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
