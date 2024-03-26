import React, { useState } from 'react'
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import UpdatePanel from './UpdatePanel';

function TodoCard({title, content, id, delid, updateId, toBeUpdate, showUpdatePanel}) {

  return (
    <>  
    <div>
        <div className='relative'>
            <div>
                <h1 className='font-semibold text-xl pb-1 text-gray-800 underline'>{title}</h1> 
            </div>
            <div className='text-lg h-[46px] text-gray-800 indent-4'>{content.split("", 30)}</div> 
            <div className='flex justify-around items-bottom'> 
                <div 
                    onClick={(e)=>{
                      toBeUpdate(updateId);
                      showUpdatePanel();
                    }}
                    className='flex items-center rounded-sm text-gray-800 border-2 border-gray-100 px-2 font-semibold hover:border-2 hover:border-gray-300 transition-all duration-100 hover:cursor-pointer hover:scale-[1.02]'>
                        <GrDocumentUpdate /> Update
                </div>
                <div
                    onClick={(e) => delid(id)}
                    className='flex hover:cursor-pointer rounded-sm  border-2 border-gray-100 items-center px-2 font-semibold text-red-600  hover:border-2 hover:border-red-300 transition-all duration-100 hover:scale-[1.02]'>
                        <MdDelete /> Delete
                </div>
            </div>
            
        </div> 
      </div> 
    </>
  )
}

export default TodoCard
