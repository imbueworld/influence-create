import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import Message from "./Message";
import { v4 as uuidv4 } from "uuid";
import sendIcon from "./send.svg";
export default function ChatContainer({ username, room, handler }) {
  const chatServerURL = "https://imbue-chat-server.herokuapp.com";
  const [messages, setMessage] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const socket = useRef(null);
  const chatroom = useRef(null);
  const feedback = useRef(null);
  const container = useRef(null);
  useEffect(() => {
    async function fetchData() {
      socket.current = await io(chatServerURL);
      //On new message
      socket.current.on("message", (data) => {
        const newMessage = { username: data.username, content: data.message };
        setMessage((messages) => messages.concat(newMessage));
      });

      //Listen on typing
      socket.current.on("typing", (data) => {
        if (data.username === username) return;

        feedback.current.innerHTML =
          "<p><i>" + data.username + " is typing a message...</i></p>";
      });

      socket.current.emit("join", { username, room }, onJoin);
    }
    fetchData();
  }, []);

  useEffect(() => {
    feedback.current.innerHTML = "";
    if (chatroom.current) {
      chatroom.current.scroll({
        top: chatroom.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  function onTypingMessage(e) {
    socket.current.emit("typing");
    setMessageToSend(e.target.value);
  }

  function sendMessage(e) {
    e.preventDefault();
    socket.current.emit("message", { message: messageToSend });
    setMessageToSend("");
  }

  function onJoin(res) {
    if (res && res.error) {
      console.log(res.error);
      return;
    }
    console.log(res);
  }

  function leaveChat() {
    socket.current.emit("leave", room);
    handler(false);
  }

  return (
    <Draggable nodeRef={container}>
      <div
        ref={container}
        className="absolute right-2 bottom-2 p-4 m-5 rounded-xl w-1/3 h-4/5 bg-[#DEFCFC] font-sans grid grid-rows-11"
      >
        <div className="row-start-1 row-end-2">
          <button className="float-right" onClick={leaveChat}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        <section
          ref={chatroom}
          className="row-start-3 row-end-6 my-3 p-3"
          style={{ overflowY: "auto" }}
        >
          {messages.map((m) => (
            <Message key={uuidv4()} message={m} />
          ))}
          <section ref={feedback}></section>
        </section>
        <form
          className="row-start-7 row-end-11 bottom-0 flex flex-row rounded-xl bg-white p-2 "
          onSubmit={sendMessage}
        >
          <input
            type="text"
            autoComplete="false"
            name="message"
            className="w-4/5 pr-2 outline-0"
            value={messageToSend}
            onChange={onTypingMessage}
            id="message"
          ></input>
          <button
            className="bg-[#FFE6EB] p-2 rounded-3xl"
            type="submit"
            onClick={sendMessage}
          >
            <img src={sendIcon} alt="Send" />
          </button>
        </form>
      </div>
    </Draggable>
  );
}
