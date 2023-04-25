import React, { useEffect, useRef, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { getChat, sendMessage } from "../../services/services";
import { io } from "socket.io-client";
import "./chatbot.scss";
const SOCKET_SERVER_URL = "http://localhost:4000";
function ChatBot(props) {
  const navigate = useNavigate();
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  var connection = new WebSocket('ws://localhost:8080');
  let [show, setShow] = useState(false);
  let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  let [message, setMessage] = useState("");
  // let [chat, setChat] = useState(false);
  let { chatWith, chat, addToChat } = props;
  useEffect(() => {
    // getChat({uid: user.id, rid: chatWith.id}).then(res=>{
    //  setChat(res.data)
    // });
    if (user) {
      //   socket.current = io("http://localhost:8001");
      //   socket.current.emit("add-user", user.id);
	  console.log("connecting....");
	  connection.onopen = () => {
		console.log("opening connection");
	  }
	  connection.onerror = (error) => {
		console.log("error connection " + JSON.stringify(error));
	  }
	  connection.onmessage = (message) => {
		console.log("message!" + JSON.parse(message.data));
	  }
    }
  }, []);

  const sendChat = () => {
    let data = {
      message: message,
      user_id: user.id,
      chat_user_id: chatWith.id,
    };
    // socket.current.emit("send-msg", {
    //   to: chatWith.id,
    //   from: user.id,
    //   message: message,
    // });

	connection.send(
		{
			  to: chatWith.id,
			  from: user.id,
			  message: message,
			}
	)
    const chats = [...chat];
    sendMessage(data).then((res) => {
      if (res.status == 200) {
        // res.message.fromSelf = true
        chats.push(res.message);
        console.log("sender", chats);
        addToChat(chats);
        // getChat({uid: user.id, rid: chatWith.id}).then(res=>{
        // 	addToChat(res.data)
        // });
      }
    });
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log("msg is " + msg);
        getChat({ uid: user.id, rid: chatWith.id }).then((res) => {
          addToChat(res.data);
          console.log(res.data);
          let last_msg = res.data[res.data.length - 1];
          // console.log(last_msg)
          // setArrivalMessage({message: last_msg.message , user:user, chat_user: chatWith});
        });
      });
    }
  }, []);

  useEffect(() => {
    let chats = chat;
    // if(arrivalMessage){
    // 	chats.push(arrivalMessage)
    // }
    // console.log(chats)
    arrivalMessage && addToChat(chats);
  }, [arrivalMessage]);

  // const chat = [{user:"a", text:"Hey!"}, {user:"a", text:"How can I help you today?"}, {user:"b", text:"I have an enquiry."},  {user:"b", text:"How do I pay my rent online?"},{user:"a", text:"You can pay it through the website or through cheque."}, {user:"b", text:"Thank you?"}, {user:"b", text:"I'll pay through cheque."}];

  return (
    <div className="chatbot" socket={socket}>
      <div className="chatbot-nav">
        <p>{chatWith.fname}</p>
        <a className="toggle-btn" onClick={() => setShow(!show)}>
          {show ? "x" : "-"}
        </a>
        {/* {show?<a>x</a>:<a>-</a>} */}
      </div>
      {show ? (
        <div className="chatbot-container">
          <div className="chatbot-middle">
            {chat && chat.length > 0
              ? chat.map((chat) =>
                  chat.user.id == user.id ? (
                    <div className="chat user-chat">Me: {chat.message}</div>
                  ) : (
                    // chat.chat_user.id==user.id ?
                    <div className="chat manager-chat">{chat.message}</div>
                  )
                )
              : ""}
          </div>
          <div className="chatbot-bottom">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <a onClick={sendChat} className="custom-btn">
              SEND
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ChatBot;
