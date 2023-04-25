import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  WEBSOCKET_URL,
  getChat,
  getChatHistory,
  getUsers,
  sendMessage,
} from "../../services/services";
import Accordion from "./Accordion";
import Loader from "../loader/Loader";
import "./chatbot.scss";
import { Avatar, TimeAgo } from "../../utils/utils";

function SideNav(props) {
  const navigate = useNavigate();
  const { isCollapsed } = props;
  let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [websocket, setWebsocket] = useState(null);
  // var connection = new WebSocket(WEBSOCKET_URL + "?user_id=" + user.id);
  let [users, setUsers] = useState(null);
  let [managers, setManagers] = useState(null);
  let [residents, setResidents] = useState(null);
  let [visitors, setVisitors] = useState(null);
  let [historyObj, setHistoryObj] = useState(null);
  let [history, setHistory] = useState(null);
  let [loading, setLoading] = useState(true);
  let [selectedItem, setSelectedItem] = useState(null);
  let [personalChatHistory, setPersonalChatHistory] = useState([]);
  let [message, setMessage] = useState("");
  const [waitingToReconnect, setWaitingToReconnect] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const clientRef = useRef(null);
  const messagesEndRef = useRef(null);
  // useEffect(() => {
  //   initData();

  //   // return () => {
  //   //   if (websocket) {
  //   //     console.log("closing connection");
  //   //     websocket.close();
  //   //   }
  //   // };
  // }, []);

  useEffect(() => {
    scrollToBottom();
  }, [personalChatHistory]);

  useEffect(() => {
    initData();
    if (waitingToReconnect) {
      return;
    }

    // Only set up the websocket once
    if (!clientRef.current) {
      const client = new WebSocket(WEBSOCKET_URL + "?user_id=" + user.id);
      clientRef.current = client;

      window.client = client;

      client.onerror = (e) => console.error(e);

      client.onopen = () => {
        setIsOpen(true);
        console.log("ws opened");
        client.send("ping");
      };

      client.onclose = () => {
        if (clientRef.current) {
          // Connection failed
          console.log("ws closed by server");
        } else {
          // Cleanup initiated from app side, can return here, to not attempt a reconnect
          console.log("ws closed by app component unmount");
          return;
        }

        if (waitingToReconnect) {
          return;
        }

        // Parse event code and log
        setIsOpen(false);
        console.log("ws closed");

        // Setting this will trigger a re-run of the effect,
        // cleaning up the current websocket, but not setting
        // up a new one right away
        setWaitingToReconnect(true);

        // This will trigger another re-run, and because it is false,
        // the socket will be set up again
        setTimeout(() => setWaitingToReconnect(null), 5000);
      };

      client.onmessage = (message) => {
        console.log("receiveddd " + message.data);
        if (message.data == "pong" || message.data == "ping") {
        } else {
          const object = JSON.parse(message.data);
          console.log("received " + JSON.stringify(object));
          appendMessage(object);
        }
      };

      return () => {
        console.log("Cleanup");
        // Dereference, so it will set up next time
        clientRef.current = null;

        client.close();
      };
    }
  }, [waitingToReconnect]);

  const initData = () => {
    // if (user) {
    //   initSocket();
    // }

    getChatHistory({ uid: user.id }).then((res) => {
      let arr = [];
      let obj = {};
      res.data.map((item) => {
        let other_id =
          item.chat_user_id == user.id ? item.user_id : item.chat_user_id;
        if (obj.hasOwnProperty(other_id)) {
        } else {
          arr.push(other_id);
          obj[other_id] = item;
        }
      });
      setHistory(arr);
      setHistoryObj(obj);
      setLoading(false);
    });
  };

  const initSocket = () => {
    const ws = new WebSocket(WEBSOCKET_URL + "?user_id=" + user.id);
    if (websocket) {
      console.log("connecting....");
      websocket.onopen = () => {
        setWebsocket(ws);
        console.log("opening connection");
      };
      websocket.onerror = (error) => {
        console.log("error connection " + JSON.stringify(error));
        websocket.close();
        setWebsocket(null);
      };
      websocket.onmessage = (message) => {
        const object = JSON.parse(message.data);
        console.log("received " + JSON.stringify(object));
        appendMessage(object);
      };
    }
  };

  const sendChat = (message, other_id) => {
    let data = {
      message: message,
      user_id: user.id,
      chat_user_id: other_id,
    };

    sendMessage(data).then((res) => {
      if (res.status == 200) {
        console.log("Sent Message: ", JSON.stringify(res.message));
        clientRef.current.send(JSON.stringify(res.message));
      }
    });
  };

  const appendMessage = (obj) => {
    let chats = personalChatHistory;
    // console.log("personalChatHistory.length is " + personalChatHistory.length);
    chats.push(obj);
    // console.log("chats.length is " + chats.length);
    setPersonalChatHistory(null);
    setPersonalChatHistory(chats);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const reconnect = () => {};

  function handleWebSocketStatus() {
    if (websocket) {
      switch (websocket.readyState) {
        case WebSocket.CONNECTING:
          console.log("WebSocket is connecting");
          break;
        case WebSocket.OPEN:
          console.log("WebSocket is open");
          break;
        case WebSocket.CLOSING:
          console.log("WebSocket is closing");
          break;
        case WebSocket.CLOSED:
          console.log("WebSocket is closed");
          break;
        default:
          console.log("WebSocket status is unknown");
          break;
      }
    }
  }

  const getPersonalChatHistory = (other_id) => {
    console.log("getting personal chat history");
    getChat({ uid: user.id, rid: other_id }).then((res) => {
      setPersonalChatHistory(res.data);
      // addToChat(res.data);
      // console.log(res.data);
      // let last_msg = res.data[res.data.length - 1];
      // console.log(last_msg)
      // setArrivalMessage({message: last_msg.message , user:user, chat_user: chatWith});
    });
  };

  const getAllChatView = () => {
    return (
      <ul className="d-flex column pt-3">
        {!loading &&
          history.map((item, index) => {
            let obj = historyObj[item];
            let name = "";
            let other_id = "";
            if (obj.chat_user.id != user.id) {
              other_id = obj.chat_user.id;
              name = obj.chat_user.fname + " " + obj.chat_user.lname;
            } else {
              other_id = obj.user.id;
              name = obj.user.fname + " " + obj.user.lname;
            }
            let timestamp = new Date(obj.created_at + "Z").getTime();
            return (
              <li
                className="w-100 mt-1 mb-1"
                key={obj.other_id}
                onClick={() => {
                  setSelectedItem(obj);
                  getPersonalChatHistory(other_id);
                }}
              >
                <div className="d-flex row text-left">
                  <Avatar name={name} />
                  <div className="ps-3 d-flex column">
                    <b className="w-100"> {name}</b>
                    <TimeAgo
                      timestamp={timestamp}
                      style="color-orange font-12 w-100"
                    />
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    );
  };

  const getPersonalChatView = () => {
    let obj = selectedItem;
    let otherName = "";
    let myName = "";
    let other_id = "";
    if (obj.chat_user.id != user.id) {
      otherName = obj.chat_user.fname + " " + obj.chat_user.lname;
      other_id = obj.chat_user.id;
      myName = obj.user.fname + " " + obj.user.lname;
    } else {
      other_id = obj.user.id;
      myName = obj.chat_user.fname + " " + obj.chat_user.lname;
      otherName = obj.user.fname + " " + obj.user.lname;
    }
    return (
      <div className="mt-3 d-flex column justify-content-between">
        <div className="d-flex row  w-100">
          <i
            className="fa fa-chevron-left color-white"
            aria-hidden="true"
            onClick={() => setSelectedItem(null)}
          ></i>
          <p className="w-100 ps-3 font-18 color-white"> {otherName}</p>
        </div>

        <div className="chatbot-middle mt-2">
          {personalChatHistory && personalChatHistory.length > 0
            ? personalChatHistory.map((chat) => {
                return chat.user.id == user.id ? (
                  <div className="d-flex w-100 row chat user-chat-wrapper mb-2">
                    <div className="user-chat-box align-self-center h-100 p-2 me-1 ms-4">
                      {chat.message}{" "}
                    </div>
                    <Avatar name={myName} />
                  </div>
                ) : (
                  <div className="d-flex w-100 row chat manager-chat-wrapper mb-2">
                    <Avatar name={otherName} />
                    <div className="ms-1 manager-chat-box align-self-center h-100 p-2">
                      {chat.message}
                    </div>
                  </div>
                );
              })
            : ""}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-bottom">
          <input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <a
            onClick={() => {
              sendChat(message, other_id);
              setMessage("");
            }}
            className="text-center ms-1 p-1"
          >
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className=" p-3 sidenav">
      <div className="sideHeader d-flex justify-content-between mt-1">
        <p className="font-22"> Chats </p>
      </div>
      <div className="sideBody">
        {loading && <Loader />}
        {!selectedItem ? getAllChatView() : getPersonalChatView()}
      </div>
    </div>
  );

  // if(users){
  //   return (
  //     <div className="sidenav">
  //       <div className="sidenav-content">
  //         <div>
  //           {Object.keys(managers).length>0 ? Object.keys(managers).map((category,index)=>
  //             <div>
  //               <Accordion
  //                 key={index}
  //                 title={`${category} Manager`}
  //                 data={managers[category]}

  //               />
  //               {/* <h3 className="text-capitalize">{category} Manager</h3>
  //               {managers[category].map(m=>
  //                 <div>{m.fname}</div>
  //               )} */}
  //             </div>
  //           ):''}
  //           <div>
  //             <Accordion
  //               title={`Residents`}
  //               data={residents}
  //             />

  //             {/* <h3>Residents</h3>
  //             {residents.length ? residents.map(resident=>
  //               <div>
  //                 {resident.fname}
  //               </div>
  //             ):''} */}
  //           </div>
  //           <div>
  //             <Accordion
  //               title={`Visitors`}
  //               data={visitors}
  //             />
  //           </div>

  //         </div>
  //       </div>
  //     </div>
  //   );
  // }else{
  //   return <div className="p-3 sidenav">Loading...</div>
  // }
}

export default SideNav;
