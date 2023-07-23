import React from "react";
import { useContext, useEffect, useState, createContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [chats, setChats] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) history.push("/");
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
  return (
    <ChatContext.Provider
      value={{ user, setUser, chats, setChats, selectedChat, setSelectedChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState=()=>{
return useContext(ChatContext);
};
export default ChatProvider;