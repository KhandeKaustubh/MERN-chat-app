import { Button } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import Chatpage from "./pages/chatpage";
import Homepage from "./pages/homepage";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
