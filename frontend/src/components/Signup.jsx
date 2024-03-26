import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Signup() {

  const navigate = useNavigate();
  const users = {email: "", username: "", password: ""}
  const [inputs, setInputs] = useState(users)

  //handling inputs
  const handleChange = (e) => {
      const {name, value} = e.target;
      setInputs({...inputs, [name]: value})
  }

  //controlling form
  const handleSubmit = async(e) => {
    e.preventDefault()
    await axios.post("/api/v1/users/registerUser", inputs)
    .then((res) => {
      toast.success(res.data.message, {position: "top-center"});
      setInputs(users);
      navigate("/signin")
    })
    .catch((error) => {
        toast.error("User with given username or password already exist", {position: "top-center"})
        console.log(error.message);
    })

  }

  return (
    <>
      <div className="container max-w-[88vw] mx-16">
        <ToastContainer autoClose={1000} />
        <div className="main bg-orange-50 w-full h-[95vh] flex">
            <div className='from_portion w-3/5 h-full grid place-content-center border-r-2 border-gray-300'>
                <form 
                    onSubmit={handleSubmit}
                    className='flex flex-col'>
                    <input 
                        className='py-2 px-4 my-4 w-[40vw] text-lg outline-none rounded-sm border-2 border-gray-300'
                        type="email" 
                        name='email' 
                        onChange={handleChange}
                        value={inputs.email}
                        placeholder='Enter Your Email' 
                        required/>

                    <input 
                        className='py-2 px-4 my-4 w-[40vw] text-lg outline-none rounded-sm border-2 border-gray-300'
                        type="text" 
                        name='username'
                        onChange={handleChange} 
                        value={inputs.username}
                        placeholder='Enter Your Username' 
                        required/>

                    <input 
                        className='py-2 px-4 my-4 w-[40vw] text-lg outline-none rounded-sm border-2 border-gray-300'
                        type="password" 
                        name='password' 
                        onChange={handleChange}
                        value={inputs.password}
                        placeholder='Enter Your Password' 
                        required/>

                    <button 
                        className='py-2 px-4 my-4 w-[40vw] text-lg outline-none rounded-sm bg-orange-600 text-white hover:scale-105'  
                        type='submit'
                    > 
                          Signup
                    </button>

                </form>
            </div>
            <div className='head_portion w-2/5 h-full grid place-content-center'>
                <h1 className='text-9xl  text-orange-600 text-center'>Sign <br/> Up</h1>
            </div>
        </div>
      </div>
    </>
  )
}

export default Signup
