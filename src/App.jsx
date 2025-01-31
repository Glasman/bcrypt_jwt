import "./App.css";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function logIn(e) {
    e.preventDefault();
    try {
      const response = await fetch("/login");
      const responseJson = await response.json()
      console.log(responseJson)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Bcrypt & JWT</h1>

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
  );
}

export default App;
 