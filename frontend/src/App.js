import { Button } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import chatpage from "./pages/chatpage";
import homepage from "./pages/homepage";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Route path="/" component={homepage} exact />
      <Route path="/chats" component={chatpage} />
    </div>
  );
}

export default App;
