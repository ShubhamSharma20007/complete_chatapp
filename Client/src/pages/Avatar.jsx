import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Loader from '../components/Loader';
const Avatar = () => {
  const navigate = useNavigate();
  const AvatarAPI = 'https://api.multiavatar.com';
  const [avatars, setAvatars] = React.useState([]);
  const [selectAvatar,setSelectAvatar] = React.useState()
  const [loading, setLoading] = React.useState(true);
 async function setProfilePicture(){
     if(selectAvatar === undefined){
      toast.error('Please select an avatar')
     }
     else{
      try {
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
        const {_id} = await user;
        const res = await axios.put(`/auth/setavatar/${_id}`,{
          avatar:selectAvatar
        })
        const data = await res.data;
        if(data.success){
          user.isAvatarImageSet = true;
          user.avatarImage = selectAvatar;
          localStorage.setItem('chat-app-user', JSON.stringify(user));
          toast.success('Avatar set successfully')
          setTimeout(()=>{
            navigate('/')
          },2000)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
     }
  }

  async function AvatarAPICall() {
    try {
      const data = [];
      for (var i = 0; i < 4; i++) {
        const svgResponse = await axios.get(`${AvatarAPI}/${(Math.random() * 1000).toFixed(0)}`,{
          responseType:'text'
        })
        data.push(svgResponse.data);

     await  new Promise((res)=> setTimeout(res,1000))
      }
      setAvatars(data);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching avatars:', error);
      setLoading(true); 
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    AvatarAPICall();
  }, []);

useEffect(()=>{
if(!localStorage.getItem('chat-app-user')){
  navigate('/login')
}
},[])

  return (
    <div>
      {
        loading && <Loader />
      }
     <div className='w-full h-screen bg-zinc-300'>
     <div className="flex justify-center items-center h-full gap-5 flex-col"> 
     <h1 className='md:text-3xl text-2xl mb-16 font-bold tracking-wide md:text-start text-center'>Pick an avatar as your profile picture</h1>
     <div className="wrapper flex  md:gap-5 gap-2">
     {avatars.map((svgString, index) => (
        <div key={index} onClick={(e)=>setSelectAvatar(svgString)} dangerouslySetInnerHTML={{ __html: svgString }} className='md:w-28 md:h-28 w-20 h-20  bg-white rounded-full hover:ring-4  hover:p-1 ring-violet-700  ' />
      ))}
     </div>

     <button  onClick={setProfilePicture} className='h-12 bg-violet-800 hover:bg-violet-900  rounded-md text-white md:mt-16  mt-10 px-2' type="button">SET AS PROFILE PICTURE</button>
     </div>
     </div>
    </div>
  );
};

export default Avatar;
