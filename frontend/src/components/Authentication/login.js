import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

const Login = () => {
  const [email, setemail] = useState();
  const [show, setshow] = useState(false);
  const [Pass, SetPassword] = useState();
  const handleClick = () => {
    setshow(!show);
  };
  const submitHandler = () => {};
  return (
    <VStack spacing="5px">
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
            onChange={(e) => {
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
      <Button
        colorScheme="blue"
        w="100%"
        style={{ marginTop: "15px" }}
        onClick={submitHandler}
      >
Login      </Button>
      <Button
        colorScheme="red"
        w="100%"
        style={{ marginTop: "15px" }}
        onClick={()=>{
            SetPassword("123456");
            setemail("guest@example.com");
        }}

      >
Get Guest User Credentials     </Button>
    </VStack>
  );
}

export default Login

