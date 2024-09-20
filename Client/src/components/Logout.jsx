import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from "react-icons/bi";
const Logout = () => {
    const navigate = useNavigate();

    function handleClick(){
        localStorage.clear();
        navigate("/login");
    }

  return (
    <div>
        
      <BiPowerOff onClick={handleClick} title='logout' className=' bg-zinc-300 p-1 rounded-full hover:bg-violet-500 hover:ring-2 '  size={'1.5em'} />
    </div>
  )
}

export default Logout
