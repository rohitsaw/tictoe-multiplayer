import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { socket } from "./socket.js";
import Board from "./board";
import Landing from "./landing";

function App() {
  const [gameId, setGameId] = useState(null);
  const [userName, setUserName] = useState(null);

  const [createdGameId, setCreatedGameId] = useState(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("users", (data) => {
      console.log("users", data);
      setUsers(data);
    });
  }, [socket]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                socket={socket}
                setRoomId={setGameId}
                setUserName={setUserName}
                setCreatedGameId={setCreatedGameId}
              />
            }
          />
          <Route
            path="/:gameId"
            element={
              <Board
                users={users}
                setUsers={setUsers}
                socket={socket}
                gameId={gameId}
                userName={userName}
                createdGameId={createdGameId}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
