import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Authentication/miscellaneous/SideDrawer";
import MyChats from "../components/Authentication/MyChats";
import ChatBox from "../components/Authentication/ChatBox";

const Chatpage = () => {
  // useEffect(()=>{
   const { user } = ChatState();
   const[fetchAgain,setFetchAgain]=useState(false);
  // },[])
  return (
  <div style={{ width: "100%" }}>
    {user && <SideDrawer/>}
    <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
    {user && <MyChats fetchAgain={fetchAgain}/>}
    {user &&<ChatBox/>}
    </Box>
  </div>
  );
};

export default Chatpage;
