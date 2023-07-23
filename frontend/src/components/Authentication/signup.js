import React, { useState } from "react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
const asyncHandler = require("express-async-handler");

const Signup = function () {
  // const xyz="jai shree Ram";
  // const t="fv";
  // history.push("/chats");
  //   const { data } = axios.post(
  //   "/api/user",
  //     xyz,
  //     t,
  // );
  const toast = useToast();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [show, setshow] = useState(false);
  const [ConfirmPass, SetConfirmPassword] = useState();
  const [Pass, SetPassword] = useState();
  const [picloading, setpicloading] = useState();
  const [pic, setPic] = useState();
  const history = useHistory();
  const handleClick = () => {
    setshow(!show);
  };

  const postdetails = (pics) => {
    setpicloading(true);

    if (pics === undefined) {
      toast({
        title: "Please select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setpicloading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "khandekaustubh");
      fetch("https://api.cloudinary.com/v1_1/khandekaustubh/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setpicloading(false);
        })
        .catch((err) => {
          console.log(err);
          setpicloading(false);
        });
    } else {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setpicloading(false);
      return;
    }
  };

  // };
  const submitHandler = async () => {
    setpicloading(true);
    if (!name || !email || !ConfirmPass || !Pass) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setpicloading(false);
      return;
    }
    if (Pass != ConfirmPass) {
      toast({
        title: "Passwords do not match!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setpicloading(false);
      return;
    }
    try {
      console.log("hello");
      const config = {
        headers: {
          Content: "Application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          Pass,
          pic,
        },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.getItem("userinfo", JSON.stringify(data));
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setpicloading(false);
    }
  };
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
      <Button
        colorScheme="blue"
        w="100%"
        style={{ marginTop: "15px" }}
        onClick={submitHandler}
        isLoading={picloading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
