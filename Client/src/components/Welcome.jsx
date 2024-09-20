import React from 'react'
import Img from "../assets/undraw_Push_notifications_re_t84m-removebg-preview.png"
const Welcome = ({currentuser}) => {
  return (
    <div>
  <div className="flex justify-center items-center min-h-screen flex-col p-0">
  <img src={Img} alt="" className='w-96' />
       <h1 className='text-2xl font-bold text-zinc-300'>Hello <span className='text-violet-900 capitalize'>{currentuser?.username}</span></h1>
       <p className='font-medium text-zinc-300'>Please select a chat to Staring Messagin </p>
  </div>
    </div>
  )
}

export default Welcome
