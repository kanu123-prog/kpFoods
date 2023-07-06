import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const[credentials , setcredentials]= useState({email:"",password:""})
  let navigate= useNavigate();
  const handleSubmit=async(e)=>{
      e.preventDefault();
      const response= await fetch("http://localhost:5000/api/loginuser",{
          method:'POST',
          headers:{
              'content-type':'application/json; charset=utf-8'
          },
          body:JSON.stringify({email: credentials.email, password: credentials.password})

      })
      
      const json =await response.json();
      console.log(json);

      if(!json.success){
          alert("enter valid credentials")
      }
      if(json.success){
        localStorage.setItem("authToken",json.authToken)
        navigate("/")
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
    <label htmlFor="email" className="form-label">Email-Address</label>
    <input type="email" className="form-control" name="email" value={credentials.email} onChange={handleChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleChange}/>
  </div>
  <button type="submit" className="btn btn-success m-2">Submit</button>
  <Link to="/createuser" className='btn btn-danger m-2'>I'm a new User?</Link>
</form></div>
    </div>
  )
}
