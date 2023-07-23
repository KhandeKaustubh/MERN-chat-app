import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
const UserListItem = ({ user, handleFunction }) => {
  // const { user }=ChatState();
  // console.log({user});
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        color: "white",
        bg: "#38B2AC",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      px={3}
      py={2}
      mb={2}
      color="black"
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      ></Avatar>
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
