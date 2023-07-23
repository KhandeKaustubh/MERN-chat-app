import {
  Avatar,
  Box,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ChatState } from "../../../../src/Context/ChatProvider";
import UserListItem from "../../Authentication/UserAvatara/UserListItem";
import ChatLoading from "../../Authentication/ChatLoading.js";
import Profilemodal from "./Profilemodal";
import { useHistory } from "react-router-dom";
import axios from "axios";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState("");
  const [loadingChat, setLoadingChat] = useState("");
  // const {}=ChatState();\
  const toast = useToast();
  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: `Please Enter something in search`,
        position: "top-left",
        isClosable: true,
        duration: 5000,
        status: "warning",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?Search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: `Error Occured!`,
        description: "Failed to Load the Search Results",
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
        status: "error",
      });
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);
      //  console.log(data);
      //  if(!chats.find((c)=>c._id===data._id))setChats([data,...chats]);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: `Error fetching the chat`,
        description: error.message,
        position: "bottom-left",
        isClosable: true,
        status: "error",
        duration: 5000,
      });
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [placement, setPlacement] = React.useState("right");
  return (
    <>
      <Box
        display="flex"
        bg="White"
        p="5px 10px 5px 10px"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i class="fa fa-search" aria-hidden="true"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton P={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {
                <Avatar
                  cursor="Pointer"
                  size="sm"
                  name={user.name}
                  src={user.pic}
                />
              }
            </MenuButton>
            <MenuList>
              <Profilemodal user={user}>
                <MenuItem>Profile</MenuItem>
              </Profilemodal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                value={search}
                mr={2}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              ></Input>
              <Button onClick={handleSearch}>Go</Button>
              {/* <UserListItem />; */}
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  user={user}
                  handleFunction={() => {
                    accessChat(user._id);
                  }}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
