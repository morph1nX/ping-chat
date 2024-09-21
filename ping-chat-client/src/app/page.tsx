import { io } from "socket.io-client";
import ChatRoom from "./chatroom";

const socket = io('http://localhost:3000');

function App() {

  return (

    <div className="App">
      <ChatRoom />

    </div>

  );

}


export default App;
