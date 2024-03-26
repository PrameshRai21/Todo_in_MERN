import React, { useState } from 'react'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';

function Signin() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const users = {email: "", password:""}
    const [inputs, setInputs] = useState(users);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post("/api/v1/users/signup", inputs)
        .then((res) => {
            toast.success(res.data.message, {position: "top-center"})
            sessionStorage.setItem("id", res.data.data)
            dispatch(login());
            setInputs(users)
            navigate("/todo")
        })
        .catch((error) => {
            toast.error("Wrong credentials!!!", {position: "top-center"})
        })
    }

  return (
    <>
      <div className="container max-w-[88vw] mx-16">
        <div className="main bg-orange-50 w-full h-[95vh] flex">
            <div className='from_portion w-3/5 h-full grid place-content-center border-r-2 border-gray-300'>
                <form 
                    onSubmit={handleSubmit}
                    className='flex flex-col'>

                    <input 
                        className='py-2 px-4 my-4 w-[40vw] text-lg outline-none rounded-sm border-2 border-gray-300'
                        type="email" 
                        name='email' 
                        placeholder='Enter Your Email' 
                        onChange={handleChange}
                        value={inputs.email}
                        required
                    />

                    <input 
                        className='py-2 px-4 my-4 w-[40vw] text-lg outline-none rounded-sm border-2 border-gray-300'
                        type="password" 
                        name='password' 
                        placeholder='Enter Your Password' 
                        onChange={handleChange}
                        value={inputs.password}
                        required
                    />

                    <button 
                        className='py-2 px-4 my-4 w-[40vw] text-lg outline-none rounded-sm bg-orange-600 text-white hover:scale-105'  
                        type='submit'> 
                            Signin
                    </button>

                </form>
            </div>
            <div className='head_portion w-2/5 h-full grid place-content-center'>
                <h1 className='text-9xl  text-orange-600 text-center'>Sign <br/> In</h1>
            </div>
        </div>
      </div>
    </>
  )
}

export default Signin
