import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Loader from '../components/Loader';
const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const[loading,setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(undefined); // getting the localstorage value
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('chat-app-user'));
    if (!user) {
      navigate('/login');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);


  useEffect(() => {
    if (currentUser) {
      getContacts();
    }
  }, [currentUser]);


  useEffect(() => {
    const profileCheck =  JSON.parse(localStorage.getItem('chat-app-user'))
    if(!profileCheck.avatarImage){
      navigate("/avatar")
    }
    else{
      navigate("/")
    }
  },[])



 



  async function getContacts() {
    try {
      const res = await axios.get(`/auth/all-user/${currentUser._id}`);
      const result = res.data;
      if (result.success) {
        setContacts(result.allUser);
        setLoading(false)
      }
      else{
        navigate('/avatar')
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      setLoading(true)
    }
    finally{
      setLoading(false)
    }
  }

  const handleChatChange =(chat)=>{
    setCurrentChat(chat)
  }

  return(
    <>
    {
      loading &&<Loader/>
    }
    <Contacts contacts={contacts} currentUser={currentUser} currentChat={currentChat} changechat={handleChatChange}/>
    </>
  )
};

export default Chat;
