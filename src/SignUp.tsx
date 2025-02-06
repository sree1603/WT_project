import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, database } from "./firebaseConfig"; 
import { useNavigate } from "react-router-dom";// Adjust path as needed

interface SignUpProps {
  onSignUp?: () => {

  }; // Optional callback for handling successful sign-up
}

const SignUp: React.FC<SignUpProps> = () => {
 const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSignUp = async () => {
    try {
      // Check if email or username already exists in the database
      const emailRef = ref(database, "users/");
      const snapshot = await get(emailRef);

      let emailExists = false;
      let usernameExists = false;

      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.email === email) emailExists = true;
        if (childData.username === username) usernameExists = true;
      });

      if (emailExists) {
        setErrorMessage("Email already in use!");
        return;
      } else if (usernameExists) {
        setErrorMessage("Username already taken!");
        return;
      }

      // Proceed with user creation
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Store user data in Firebase Database
      await set(ref(database, `users/${userId}`), { email, username });

      setErrorMessage("");
      alert("User registered successfully!");
      navigate("/Login")// Optional callback
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.signUpBox}>
        <h1 style={styles.title}>Sign Up</h1>

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

        {/* Sign Up Button */}
        <button onClick={handleSignUp} style={styles.button}>
          Sign Up
        </button>
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
  signUpBox: {
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

export default SignUp;
