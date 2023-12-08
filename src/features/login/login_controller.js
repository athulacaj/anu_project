import { useEffect, useState } from "react";
import { auth } from "../../common/functions/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { use } from "i18next";
import { useNavigate } from "react-router-dom";

function useLoginController() {
  const [email, setEmail] = useState("test@admin.com");
  const [password, setPassword] = useState("123456");
  const [loginError, setloginError] = useState(null);
  const navigate = useNavigate();

  async function signInWithEmailPassword() {
    setloginError(null);
    if (validatePassword(password)) {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log("Successfully logged in ", user);
        navigate("/");
      } catch (error) {
        console.error("Error logging in:", error.message);
      }
    } else {
      setloginError("Password must be at least 6 characters long");
    }
  }

  function validatePassword() {
    if (password && password.length < 6) {
      return false;
    }
    return true;
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    signInWithEmailPassword,
    loginError,
  };
}

export default useLoginController;
