import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styles from "./landing.module.css";
import short from "short-uuid";
import { useNavigate } from "react-router-dom";

function LandingPage({ socket, setRoomId, setUserName, setCreatedGameId }) {
  const [gameId, setGameId] = useState(null);
  const [name, setName] = useState(null);

  const [gameId2, setGameId2] = useState(null);
  const [name2, setName2] = useState(null);

  const navigate = useNavigate();

  const mySwal = withReactContent(Swal);

  const createNewGame = () => {
    if (!name) {
      mySwal.fire({
        title: "Please Give Your Name",
        icon: "error",
        confirmButtonText: "ok",
      });
    } else {
      setGameId(short().generate());
    }
  };

  useEffect(() => {
    setCreatedGameId(gameId);
  }, [gameId]);

  const joinExistingGame = (name, gameId) => {
    if (name && gameId) {
      socket.emit("joinGame", {
        gameId: gameId,
        userName: name,
      });

      setRoomId(gameId);
      setUserName(name);

      mySwal
        .fire({
          html: (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div>Share This Game Id with other Player to Join.</div>
              <div> GameId : {gameId}</div>
            </div>
          ),
          confirmButtonText: "Start Game",
          allowOutsideClick: false,
        })
        .then(() => {
          console.log("redirecting to", `/${gameId}`);
          navigate(`/${gameId}`);
        });
    } else {
      mySwal.fire({
        title: "Please Give Name and Valid GameId",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  };

  const copyFn = async () => {
    console.log("text", gameId);
    await navigator.clipboard.writeText(gameId);
    alert("GameId copied! - " + gameId);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={`${styles.item} ${styles.item1}`}>
          <div className={styles.inputSection}>
            <label>Your Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              readOnly={!!gameId}
            />
          </div>

          {gameId && (
            <div className={styles.inputSection}>
              <label>Share This GameId with Someone.</label>

              <div className={styles.inputSection2}>
                <input
                  type="text"
                  value={gameId}
                  id="generatedGameId"
                  readOnly
                ></input>
                <button onClick={() => copyFn()}>Copy text</button>
              </div>
            </div>
          )}

          {!gameId ? (
            <button onClick={createNewGame}>Create New Game</button>
          ) : (
            <button onClick={() => joinExistingGame(name, gameId)}>
              Join Game
            </button>
          )}
        </div>
        <div className={`${styles.item} ${styles.item2}`}>
          <div className={styles.inputSection}>
            <label>Your Name</label>
            <input
              onChange={(e) => setName2(e.target.value)}
              id="name"
              type="text"
            />
            <br />
            <label>Game Id</label>
            <input
              id="gameId"
              type="text"
              onChange={(e) => setGameId2(e.target.value)}
            />
          </div>

          <button onClick={() => joinExistingGame(name2, gameId2)}>
            Join Existing Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
