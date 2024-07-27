import React, { useEffect, useState, useRef } from "react";
import "../assets/style/Chat.css";
import Layout from "./layout/Layout";
import { usersList } from "../services/api";
import { useSelector } from "react-redux";
import MessageInput from "./Chat/MessageInput";
import ChatWindow from "./Chat/ChatWindow";
import UserList from "./Chat/UserList";

function Chat() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { access, user } = useSelector((state) => state.auth);
  const chatSocketRef = useRef(null);
  const chatWindowRef = useRef(null);

  const fetchUsers = async () => {
    try {
      const response = await usersList(access);
      setUsers(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [access]);

  useEffect(() => {
    if (selectedUser) {
      // Establish WebSocket connection
      const chatSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${selectedUser.id}/`,
        [access]
      );

      chatSocket.onopen = () => {
        console.log("WebSocket connection opened");
      };

      chatSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "past_messages") {
          setMessages(data.messages);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: data.sender,
              message: data.message,
              receiver: data.receiver,
            },
          ]);
        }
      };

      chatSocket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      chatSocket.onerror = (error) => {
        console.error("WebSocket error: ", error);
      };

      chatSocketRef.current = chatSocket;

      return () => {
        chatSocket.close();
      };
    }
  }, [selectedUser, access]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatSocketRef.current && currentMessage.trim() !== "") {
      chatSocketRef.current.send(
        JSON.stringify({
          message: currentMessage,
          receiver: selectedUser.username,
        })
      );

      setCurrentMessage("");
    }
  };

  return (
    <Layout>
      <div className="container-fluid mt-2 row mx-auto">
        <UserList
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <ChatWindow
          messages={messages}
          user={user}
          chatWindowRef={chatWindowRef}
        >
          <MessageInput
            handleSendMessage={handleSendMessage}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
          />
        </ChatWindow>
      </div>
    </Layout>
  );
}

export default Chat;
