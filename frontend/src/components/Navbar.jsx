import { FaAddressBook } from "react-icons/fa";
import React from 'react';
import {Link, useNavigate}  from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice"


function Navbar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    
    const handleLogout = () => {
        sessionStorage.clear("id")
        dispatch(logout())
        navigate("/")
    }

  return (
    <>
      <div className='container bg-orange-50 h-16 max-w-[88vw] mx-16 flex items-center border-b-2 border-gray-200'>
        <div className='logo w-1/3 flex pl-4'>
            <div className="flex text-3xl items-center text-orange-600">
                <div className="mx-2"><FaAddressBook /> </div>
                <div className="font-bold">todo</div>
            </div>
        </div>
        <div className='menu w-2/3'>
            <div className="flex w-auto justify-end pr-10 gap-8 text-lg font-medium text-gray-800 items-center">
                <div className="hover:cursor-pointer hover:scale-105">
                   <Link to="/"> Home</Link>
                </div>
                <div className="hover:cursor-pointer hover:scale-105">
                    <Link to="/about"> About Us</Link>
                </div>
                <div className="hover:cursor-pointer hover:scale-105">
                    <Link to="/todo">Todos</Link>
                </div>
                {!isLoggedIn && 
                    <>
                        <div className="hover:cursor-pointer">
                            <button 
                                className="text-white bg-orange-600 py-1 px-2 rounded-md 
                                hover:scale-105">
                                <Link to="/signup">Signup</Link>
                            </button>
                        </div>
                        <div 
                            className="hover:cursor-pointer">
                            <button 
                                className="text-white bg-orange-600 py-1 px-2 rounded-md hover:scale-105">
                                <Link to="/signin">Signin</Link>
                            </button>
                        </div>
                    </>
                }
                {isLoggedIn && 
                    <>
                        <div className="hover:cursor-pointer">
                            <button 
                                onClick={handleLogout}
                                className="text-white bg-orange-600 py-1 px-2 rounded-md      hover:scale-105">
                                Logout
                            </button>
                        </div>
                    </>
                }
            </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
