import React from "react";
import {ModalBody,ModalCloseButton,ModalContent,ModalHeader,ModalFooter,Button,Modal,ModalOverlay, IconButton, useDisclosure, Image, Text, Avatar } from "@chakra-ui/react";
const Profilemodal = ({user,children}) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={""}></IconButton>
      )}

      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDir="column"
          >
            {/* <Image src={user.pic}
           alt={user.name}
           boxSize="150px"
           /> */}
            {/* {user._id === "6433df011a39254453916496" && (
              <>
                <Avatar
                  src={user.pic}
                  // name={user.name}
                  boxSize="150px"
                  boxRadious="full"
                />
              </>
            )} */}
            {user._id === "6433df011a39254453916496" ? (
              <Avatar
                src={user.pic}
                // name={user.name}
                boxSize="150px"
                boxRadious="full"
              />
            ) : (
              <Avatar
                src={user.pic}
                name={user.name}
                boxSize="150px"
                boxRadious="full"
              />
            )}
            <Text
              fontFamily="Work sans"
              fontSize={{ base: "28px", md: "30px" }}
            >
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profilemodal;
