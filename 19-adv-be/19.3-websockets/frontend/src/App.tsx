import { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [msg, setMsg] = useState<string[]>([]);
  const [newMsg, setNewMsg] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
      socket.send("Hello from Client"); // Send initial message once the connection is open
    };

    socket.onmessage = (message) => {
      console.log("Data :", message.data);
      setMsg((m) => [...m, message.data]); // Append received message to state
    };

    // Cleanup on component unmount
    return () => {
      console.log("Closing socket on unmounting");
      socket.close();
    };
  }, []); // Empty dependency array so this effect runs only once

  const handleSend = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(newMsg); // Send the new message to the WebSocket server
      console.log("Sent:", newMsg);
      setMsg((m) => [...m, newMsg])
      setNewMsg(""); // Clear the input field after sending
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  if (!socket) {
    return <div>Connecting to WebSocket ...</div>;
  } else {
    return (
      <div>
        <h1>Messages:</h1>
        <ul>
          {msg.map((message, index) => (
            <li key={index}>{message}</li> // Render each message as a list item
          ))}
        </ul>

        <input
          type="text"
          value={newMsg} // Bind the input field to the state
          onChange={(e) => setNewMsg(e.target.value)} // Update the state on user input
          placeholder="Type a message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    );
  }
}

export default App;
