import React, { useState } from 'react';
import './Accordion.scss';
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai';
import ChatBot from './ChatBot';
import { getChat } from '../../services/services';

function Accordion(props) {
  const {data} = props
  const [isOpen, setIsOpen] = useState(false);
  let [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [chatWith, setChatWith] = useState(null);
	let [chat, setChat] = useState(false);

  function toggleAccordion() {
    setIsOpen(!isOpen);
  }

  const openChat = (u) => {
    setChatWith(u)
    getChat({uid: user.id, rid: u.id}).then(res=>{
      setChat(res.data)
    });
    // console.log(user)
    // return <ChatBot />
  }

  const addToChat = (chat) => {
    setChat(chat)
  }

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <div className='acc-text d-flex justify-space-between'>
          <h3 className='text-capitalize'>{props.title}</h3>
          {isOpen? <AiOutlineDown/>:<AiOutlineRight/>}
        </div>
        <span className={`accordion-icon ${isOpen ? 'open' : ''}`}></span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          {data.map(user=>
            <div>
              <a onClick={()=>openChat(user)}>{user.fname} {user.lname} {user.type=='manager'?'(Manager)':''}</a>
            </div>
          )}
        </div>
      )}
      {chatWith?<ChatBot addToChat={addToChat} chatWith={chatWith} chat={chat}/>:''}
    </div>
  );
}

export default Accordion;