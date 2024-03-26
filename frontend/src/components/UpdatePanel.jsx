import React, { useState } from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function UpdatePanel({closeEvent, update}) {

    const user_id = sessionStorage.getItem("id")
    const navigate = useNavigate()

    const task = {
        title: update.title,
        content: update.content
    }
    const [inputs, setInputs] = useState(task)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]:value})
    }
    
    const handleSubmit =async (e) => {
        e.preventDefault();
        if(user_id){
            await axios.post(`/api/v1/tasks/update/${update._id}`, {title:inputs.title, content:inputs.content, id:user_id})
            .then((res) => {
                toast.success(res.data.message, {position: "top-center"});
                setInputs({title: "", content:""})
                navigate("/todo");
            })
            .catch((error) => console.log(error))
        }else {
            toast.error("Login or Signup to update.")
        }
    }

  return (
    <>
      <div className='absolute top-[2vh] left-[20vw] w-[50vw] h-[60vh] bg-orange-200 border-2 border-gray-300 rounded-md py-3 z-[2]'>
            <div>
                <ToastContainer />
                <div className='flex justify-start pl-5'>
                    <button 
                        className='text-red-500 text-4xl hover:scale-110 transition-all duration-100 border-2 border-gray-400 p-0 rounded-full'
                        onClick={closeEvent}><IoArrowBackCircle /></button>
                </div>
                <div className='my-4 '>
                    <h1 className='text-center font-semibold text-4xl text-orange-600 underline'>Update Your Task</h1>
                </div>
                <div className='update_form_section px-6'>
                    <form 
                        onSubmit={handleSubmit}
                        className='flex flex-col gap-y-3'>
                        <input 
                             className='pl-4 py-2 w-full outline-none rounded-sm text-lg text-gray-900 border-2 border-gray-300' 
                            type="text" 
                            name='title'
                            value={inputs.title}
                            onChange={handleChange}
                        />
                        <textarea
                            className='pl-4 py-2 w-full outline-none rounded-sm text-lg text-gray-900 border-2 border-gray-300'
                            rows="2"
                            type="text"
                            name="content"
                            value={inputs.content}
                            onChange={handleChange}
                        />
                        <button 
                            className='bg-green-600 py-2 px-4 w-44 text-center rounded-md text-lg text-white hover:scale-105 transition-all duration-100 hover:text-xl'
                            type='submit'>
                                Update
                            </button>
                    </form>
                </div>
            </div>
      </div>
    </>
  )
}

export default UpdatePanel
