import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

  const user_id = sessionStorage.getItem("id")
  const navigate = useNavigate()

  const handleClick = () => {
    if(user_id) {
      navigate("/todo")
    }else {
      toast.error("Login to create todo.", {position: "top-center"})
    }
    
  }

  return (
    <>
      <div className='container max-w-[88vw] mx-16'>
        <ToastContainer autoClose={800}/>
        <div className='bg-orange-50 w-full h-[95vh] grid place-content-center'>
            <div className='h-auto w-auto'>
                <h1 className='text-6xl text-center font-semibold'>Organize your <br/> work and life, finally</h1>
                <p className='text-center text-lg mt-3'>Become focused, organized and calm <br/>
                 with <span className='font-bold text-xl'>#1</span> todo App. Become Smart</p>
                 <div className='text-center'>
                    <button 
                      onClick={handleClick}
                      className='bg-orange-600 text-white text-base font-semibold py-2 px-4 rounded-md mt-3 hover:scale-105'>Make todo list</button>
                 </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Home
