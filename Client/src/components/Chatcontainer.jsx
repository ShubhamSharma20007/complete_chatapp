import React from "react";
import ChatInput from "./ChatInput";
import { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import axios from "../../utils/axios";
import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";

const Chatcontainer = ({ currentChat, currentUser, socket }) => {
  const {contetxsocket,contextsetSocket} = useContext(SocketContext);
  console.log(contetxsocket,1212)
 const  scrollRef = React.useRef(null)
  const [messages, setMessages] = React.useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    handlegetMessage();
  }, [currentChat]);


  const handlegetMessage = async () => {
    try {
      const response = await axios.post("/message/get-message", {
        from: currentUser?._id,
        to: currentChat?._id,
      });
      setMessages(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMsg = async (msg) => {
    try {
      await axios.post("/message/add-message", {
        from: currentUser?._id,
        to: currentChat?._id,
        message: msg,
      });
      socket.current.emit("send-msg", {
        to: currentChat?._id,
        from: currentUser?._id,
        message: msg,
      });
      const msgs = [...messages, { fromSelf: true, message: msg }];
      contextsetSocket(msgs)
      setMessages(msgs);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        
        setArrivalMessage({
          fromSelf: false,
          message: msg,
        });
      });
    }
  }, [messages]);
  
  
  

  useEffect(() => {
   arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
   
  },[arrivalMessage])

  useEffect(()=>{
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight

  },[messages])
  return (
    <div>
      <div className="w-full   flex mb-4 bg-[#fcf7f733]  rounded-sm p-3 items-center justify-start gap-10 px-5">
        <div
          className="w-8 h-8 "
          dangerouslySetInnerHTML={{ __html: currentChat?.avatarImage }}
        ></div>
        <h1 className="font-semibold text-md capitalize">
          {currentChat.username}
        </h1>
      </div>
      {/* <Message /> */}
      <div className="w-full h-[75vh]  p-5 overflow-auto " ref={scrollRef} key={uuidv4()}>
        {messages &&
          messages.map((message, index) => (
            <>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content">
                  <p className="text-sm bg-zinc-300 rounded-lg  inline-block px-5  py-2 font-semibold my-3">
                    {message.message}
                  </p>
                </div>
              </div>
            </>
          ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default Chatcontainer;
