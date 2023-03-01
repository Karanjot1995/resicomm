import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './chatbot.scss';

function ChatBot({isLoggedIn}) {
  const navigate = useNavigate();

  let [show, setShow] = useState(false);
	// const chat = {
	// 	"a":"Hey!",
	// 	"a":"How are you?",
	// 	"b":"Pretty good. Wbu?",
	// }
	const chat = [{user:"a", text:"Hey!"}, {user:"a", text:"How can I help you today?"}, {user:"b", text:"I have an enquiry."},  {user:"b", text:"How do I pay my rent online?"}];

	return (
		<div className="chatbot">
			<div className="chatbot-nav">
				<p>Chat</p>
				<a className="toggle-btn" onClick={()=>setShow(!show)}>{show?'x':'-'}</a>
				{/* {show?<a>x</a>:<a>-</a>} */}
			</div>
			{show?
			<div className="chatbot-container">
				<div className="chatbot-middle">
					{chat.map(chat=>
						chat.user=='a'? 
						<div className="chat manager-chat">Manager: {chat.text}</div>
						: 
						<div className="chat user-chat">Me: {chat.text}</div>
					)}
				</div>
				<div className="chatbot-bottom">
					<input/>
					<a className="custom-btn">SEND</a>
				</div>
			</div>
			:''
			}
			
		</div>
	);
}
 
export default ChatBot;