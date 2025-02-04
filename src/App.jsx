import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState({});

  async function logIn(e) {
    e.preventDefault();
    try {
      // const response = await fetch("/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     username: username,
      //     password: password,
      //   }),
      // });

      const response = await axios.post("/login", {
        username: username,
        password,
      });
      setAuth(response.data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Bcrypt & JWT</h1>

      {auth.username ? (
        <>
          <h1>Welcome {auth.username} </h1>
          <button>Log out</button>
        </>
      ) : (
        <>
          <form onSubmit={logIn}>
            <input
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button>Log in</button>
          </form>
        </>
      )}
    </>
  );
}

export default App;
