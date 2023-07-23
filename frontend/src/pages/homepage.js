import { Container, Box, Text, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/login";
import Signup from "../components/Authentication/signup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Homepage = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
  return (
    <Container maxw="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        textAlign="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontFamily="font-family: 'Cinzel', serif;
font-family: 'Work Sans', sans-serif;"
        >
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        d="flex"
        //  justifyContent="center"
        //  textAlign="center"
        p={3}
        bg={"white"}
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
