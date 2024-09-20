import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmile } from 'react-icons/bs';

const ChatInput = ({ handleSendMsg }) => {
  const emojiBtn = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOutside = (e) => {
    if (emojiBtn.current && !emojiBtn.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (emojiBtn.current) {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      // Cleanup the event listener when the component unmounts
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [emojiBtn]);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (event, emoji) => {
    let newMessage = message;
    newMessage += event.emoji;
    setMessage(newMessage);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      handleSendMsg(message);
      setMessage('');
    }
  };

  return (
    <div className="flex h-[10vh] justify-between items-center md:p-5 p-2 my-4 relative">
      {showEmojiPicker && (
        <div ref={emojiBtn} style={{ position: 'absolute', top: '-300px' }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} height={300} width={300} />
        </div>
      )}
      <div className="md:w-[5%]">
        <BsEmojiSmile onClick={handleEmojiPickerHideShow} className="text-zinc-800" size="30" />
      </div>
      <div className="w-[90%] md:min-w-[200px]">
        <form className="flex items-center gap-5 relative overflow-hidden" onSubmit={sendChat}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="md:w-[90%] w-full h-[100%] rounded-full p-3 bg-zinc-800 text-white placeholder:text-sm outline-none"
            type="text"
            placeholder="type your message here"
          />
          <button
            type="submit"
            className="bg-zinc-800 flex justify-center items-center absolute rounded-full h-full w-12 right-0 md:right-[10%]"
          >
            <IoMdSend size="20" className="text-zinc-300" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
