import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {getSender} from "../../config/ChatLogics";
import ChatLoading from "./ChatLoading";

const MyChats = ({ fetchAgain }) => {
  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();
  const toast = useToast();
  const [loggedUser, setLoggedUser] = useState();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: `Error Occured!`,
        description: "Failed to Load the chats",
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
        status: "error",
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  return (
    <Box
      bg="White"
      flexDir="column"
      p={3}
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      w={{ base: "100%", md: "31%" }}
      alignItems="center"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        My Chats
        <Button
          display="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        overflowY="hidden"
        w="100%"
        h="100%"
        borderRadius="lg"
        bg="#F8F8F8"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                cursor="pointer"
                onClick={() => setSelectedChat(chat)}
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                {/* getSender(loggedUser,chat.users) */}
                <Text>
                  {chat.isGroupChat
                    ? chat.chatName
                    : getSender(loggedUser, chat.users)}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
