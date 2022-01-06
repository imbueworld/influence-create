import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
// import $ from "jquery";
export default function ChatContainer({ username, room }) {
  const chatServerURL = "https://imbue-chat-server.herokuapp.com";
  const [messages, setMessage] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const socket = useRef(null);
  const feedback = $("feedback");
  useEffect(() => {
    async function fetchData() {
      socket.current = await io(chatServerURL);
      //On new message
      socket.current.on("message", (data) => {
        feedback.html("");
        const newMessage = { username: data.username, content: data.message };
        // messages.push(newMessage);
        setMessage((messages) => messages.concat(newMessage));
      });

      //Listen on typing
      socket.current.on("typing", (data) => {
        feedback.html(
          "<p><i>" + data.username + " is typing a message...</i></p>"
        );
      });

      socket.current.emit("join", { username, room }, onJoin);
      console.log("object");
    }
    fetchData();
  }, []);
  useEffect(() => {
    const chatroom = document.getElementById("chatroom");
    if (chatroom) {
      chatroom.scroll({ top: chatroom.scrollHeight, behavior: "smooth" });
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
    console.log(res);
  }

  function leaveChat() {}

  return (
    <div className="absolute right-3 top-40 p-8 rounded-xl w-1/3 h-1/2 bg-[#DEFCFC] font-sans">
      <button className="absolute right-5" onClick={leaveChat}>
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
            stroke-width="2"
          />
        </svg>
      </button>
      <section
        id="chatroom"
        className="h-4/5 mt-8 mb-3 p-3"
        style={{ overflowY: "auto" }}
      >
        {messages.map((m) => (
          <Message key={m._id} message={m} />
        ))}
        <section id="feedback"></section>
      </section>
      <form className="my-4 mx-4" onSubmit={sendMessage}>
        <input
          type="text"
          autoComplete="false"
          name="message"
          className="rounded-xl w-4/5 h-10"
          value={messageToSend}
          onChange={onTypingMessage}
          id="message"
        ></input>
        <input
          className="-translate-x-[130%]"
          type="submit"
          onClick={sendMessage}
          value="SEND"
        />
      </form>
    </div>
  );
}
