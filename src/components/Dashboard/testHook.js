
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const USER_JOINED_LOBBY = "join game lobby"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

export const useChat = (username) => {
  const [roomMembers, setRoomMembers] = useState([])
  const [userDisplayName, setUserDisplayName] = useState('')
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef()

  useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = io(SOCKET_SERVER_URL);
    console.log('📣📣📣connected to socket')
    // Listens for incoming messages
    socketRef.current.on('user joined', (userList) => {
      console.log('on user joined', userList)
      setRoomMembers(userList);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Sends a message to the server that
  // forwards it to all users in the same room

  const joinRoom = (username) => {
    console.log('join room is firing', username, USER_JOINED_LOBBY, socketRef.current.emit)
    if (!userDisplayName || username !== userDisplayName) {
      setUserDisplayName(username)
    }
    socketRef.current.emit(USER_JOINED_LOBBY, username)
  }


  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { roomMembers, joinRoom, sendMessage };

}
