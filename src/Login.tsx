import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, database } from "./firebaseConfig"; // Import Firebase config

import { useNavigate } from "react-router-dom";
interface LoginProps {
  onLogin?: () => {}; // Optional callback for handling login success
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>(""); // Added username field
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async () => {
    try {
      // Sign in using email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Reference to the specific user in the database using userId
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.username === username) {
          // Successful login
          navigate("/");
          if (onLogin) onLogin();
        } else {
          setErrorMessage("Incorrect username for this email!");
        }
      } else {
        setErrorMessage("No user data found!");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>Login</h1>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {/* Error Message */}
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
       
//''''''''''
        {/* Login Button */}
        <button onClick={handleLogin} style={styles.button}>Login</button>
         {/* signup button */}
         <button onClick={() => navigate('/SignUp')} style={styles.button}>SignUp</button>
      </div>
    </div>
  );
};

// 🔹 Internal Styling for Blue-Black Theme
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #000428, #004e92)",
  },
  loginBox: {
    backgroundColor: "#121212",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "350px",
  },
  title: {
    color: "#4facfe",
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #4facfe",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "5px",
    backgroundColor: "#007BFF",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
};

export default Login;
