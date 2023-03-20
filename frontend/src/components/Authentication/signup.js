import React, { useState } from "react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

const Signup = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [show, setshow] = useState(false);
  const [ConfirmPass, SetConfirmPassword] = useState();
  const [Pass, SetPassword] = useState();
  const handleClick = () => {
    setshow(!show);
  };
  const postdetails=()=>{

  };
  const submitHandler=()=>{

  }
  return (
    <VStack spacing="5px">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          placeholder="Enter Your Email Address"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e)=>{
                SetPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => {
              SetConfirmPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          accept="image/*"
          p={1.5}
          onChange={(e) => {
            postdetails(e.target.files[0]);
          }}
        />
      </FormControl>
        <Button colorScheme="blue" w="100%" style={{marginTop:"15px"}}
        onClick={submitHandler}>
          Sign Up
        </Button>
    </VStack>
  );
};

export default Signup;
