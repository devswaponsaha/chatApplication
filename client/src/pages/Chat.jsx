import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/Chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import { PotentialChats } from "../components/Chat/PotentialChats";
import ChatBox from "../components/Chat/ChatBox";

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserLoading, userChatsError, updateCurrentChat } =
      useContext(ChatContext);
  return (
    <>
          <Container>
              <PotentialChats/>
              {userChats?.length < 1 ? null : (
                  <Stack direction="horizontal" gap={4} className="align-items-start">
                      <Stack className="messages-box flex-grow-0 pe-3">
                          {isUserLoading && <p>Loading...</p>}
                          {userChats?.map((chat, index) => {
                              return (
                                  <div key={index} onClick={()=>updateCurrentChat(chat)}>
                                      <UserChat chat={chat} user={user} />
                                  </div>
                              )
                          })}
                      </Stack>
                      <ChatBox/>
                  </Stack>
          )}
      </Container>
    </>
  );
};

export default Chat;