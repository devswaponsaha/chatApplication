/* eslint-disable no-unused-vars */
import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await getRequest(`${baseUrl}user`);
      if (response.error) {
        return console.log(response);
      }
      const pChats = response.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u._id) {
          return false;
        }
        if (userChats) {
          isChatCreated = userChats?.some(
            (chat) => chat.member[0] === u._id || chat.member[1] === u._id
          );
        }
        return !isChatCreated;
      });
      setPotentialChats(pChats);
    };
    getUser();
  }, [user, userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user) {
        // eslint-disable-next-line react/prop-types
        if (user?._id) {
          // eslint-disable-next-line react/prop-types
          setIsUserLoading(true);
          setUserChatsError(null);
          // eslint-disable-next-line react/prop-types
          const response = await getRequest(`${baseUrl}chat/${user?._id}`);
          setIsUserLoading(false);
          if (response.error) {
            return setUserChatsError(response);
          }
          setUserChats(response);
        }
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
        setMessagesError(null);
      const response = await getRequest(`${baseUrl}message/${currentChat?._id}`);
      setIsMessagesLoading(false);
      if (response.error) {
        return setMessagesError(response);
      }
      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}chat`,
      JSON.stringify({ firstId, secondId })
    );
    if (response.error) {
      return console.log(response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserLoading,
        userChatsError,
        potentialChats,
        createChat,
              updateCurrentChat,
              messages,
              isMessagesLoading,
                messagesError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
