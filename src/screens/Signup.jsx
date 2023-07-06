import React ,{useState} from 'react'
import { Link } from 'react-router-dom'


export default function Signup() {
    const[credentials , setcredentials]=useState({name:"",email:"",password:"",geolocation:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response= await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'content-type':'application/json; charset=utf-8'
            },
            body:JSON.stringify({name:credentials.name , email: credentials.email, password: credentials.password, location:credentials.geolocation})

        })
        
        const json =await response.json();
        console.log(json);

        if(!json.success){
            alert("enter valid credentials")
        }
    }
    const handleChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <div>
    <div className='container'>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name="name" value={credentials.name} onChange={handleChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email-Address</label>
    <input type="email" className="form-control" name="email" value={credentials.email} onChange={handleChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="location" className="form-label">Location</label>
    <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={handleChange}/>
  </div>
  <button type="submit" className="btn btn-success m-2">Submit</button>
  <Link to="/login" className='btn btn-danger m-2'>Already a User?</Link>
</form></div>
        
    </div>
  )
}
