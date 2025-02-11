import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState({});

  useEffect(() => {
    attemptLoginWithToken();
  });

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
      // // Extract the response as a string
      // const token = await response.text();
      // console.log("Token:", token);

      const response = await axios.post("/login", {
        username: username,
        password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      console.log(err);
    }
  }

  const attemptLoginWithToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/login", {
        headers: {
          authorization: token,
        },
      });
     console.log(response.data)
    }
  };

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
