import React, { useState, useEffect } from 'react'
import TodoCard from './TodoCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import UpdatePanel from './UpdatePanel';

let updateData = [];

function Todo() {

  let user_id = sessionStorage.getItem("id")

  const [inputs, setInputs] = useState({title: '', content: ''})
  const [showTextarea, setShowTextArea] = useState(false)
  const [array, setArray] = useState([])

  const handleShowTextArea = () => {
    setShowTextArea(true)
  }

  const handleChange = (e) => {
      const {name, value} = e.target;
      setInputs({...inputs, [name]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(inputs.title !== "" && inputs.content !== ""){
      if(user_id){
        await axios.post("/api/v1/tasks/addTodo", {title:inputs.title, content:inputs.content, id:user_id})
        .then((res) => {
          console.log(res);
        })
        setInputs({title: "", content: ""}) 
        toast.success("Your todo is added successfully.", {position: "top-center"})
      }
      else {
        setArray([...array, inputs])
        setInputs({title: "", content: ""}) 
        toast.error("Your todo is added but not saved.", {position: "top-center"})
      }
    }else {
      toast.error("Title and Content cannot be empty.", {position: "top-center"})
    }
    
  }

  const del = async (todo_id) => {
    // array.splice(id, "1")
    // setArray([...array])
    if(user_id){
      await axios.delete(`/api/v1/tasks/delete/${todo_id}`, {data: {id: user_id}})
      .then((res) => {
        toast.success(res.data.message, {position: "top-center"})
      })
    }else {
     toast.error("Login to delete task.", {position: "top-center"}) 
    }
    
  }

  const update = (value) => {
    updateData = array[value];
  }

  const [showUpdate, setShowUpdate] = useState(false)
  const closeUpdatePanel = () => {
      setShowUpdate(false)
  }

  const showUpdatePanel = () => {
    setShowUpdate(true)
  }

  //render on adding todo
  useEffect(() => {
    if(user_id){
      const fetch = async () => {
        await axios.get(`/api/v1/tasks/getTask/${user_id}`)
        .then((res) => {
          setArray(res.data.data)
        })
        .catch((error) => console.log(error))
      }
  
      fetch();
    }
  }, [handleSubmit])

  return (
    <>
      <div className="container max-w-[88vw] mx-16 relative">
        <ToastContainer autoClose={2000}/>
        <div className="main bg-orange-50 w-full h-[95vh] flex flex-col">
           <div className='w-full flex justify-center mt-4'>
              <div className='addTodo_section'>
                  <form className='flex flex-col w-[30vw]' onSubmit={handleSubmit} >
                      <input 
                          className='pl-4 py-2 w-full outline-none rounded-sm text-lg text-gray-900 border-2 border-gray-300' 
                          onFocus={handleShowTextArea} 
                          onChange={handleChange} 
                          value={inputs.title}
                          type="text" 
                          name="title" 
                          placeholder='TITLE'
                      />

                      {showTextarea && (
                        <textarea 
                            className='pl-4 py-2 w-full outline-none rounded-sm text-lg text-gray-900 border-2 border-gray-300' 
                            onChange={handleChange} 
                            value={inputs.content}
                            name="content" 
                            id="textarea" 
                            rows="2" 
                            placeholder='CONTENT'>
                        </textarea>
                      )}
                      
                      <div className='flex justify-end'>
                        <button 
                            className='bg-orange-600 text-lg py-1 px-5 text-white rounded-md mt-2'
                            type="submit" >
                            Add
                        </button>
                      </div>
                  </form>
              </div>
           </div>
           <div>
              <div className='displayTodo_section w-full flex justify-center '>
                <div className='w-[90%] flex flex-row flex-wrap gap-5 mt-7 px-5 justify-start'>
                    {array &&
                          array.map((item, index) => (
                            <div key={index} 
                              className='w-[24vw] h-32 p-3 bg-gray-100 rounded-md border-2 border-orange-200'>
                                <TodoCard 
                                  title={item.title} 
                                  content={item.content} 
                                  id={item._id} 
                                  delid={del}
                                  updateId ={index}
                                  toBeUpdate={update}
                                  showUpdatePanel={showUpdatePanel}
                                />
                            </div>
                          ))
                      }
                </div> 
              </div>
           </div>
        </div>
        <div className='Update_block'>
                {showUpdate &&
                  <div>
                    <UpdatePanel closeEvent={closeUpdatePanel} update={updateData}/>
                  </div>
                }
        </div>  
      </div>
    </>
  )
}

export default Todo
