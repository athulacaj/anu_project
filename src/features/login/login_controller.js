import { useEffect, useState } from "react";
import { auth } from "../../common/functions/firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { use } from "i18next";
import { useNavigate } from "react-router-dom";


function createUser(email) {
  let password="123456";
  return new Promise(async (resolve, reject) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      resolve(userCredential);
    } catch (error) {
      reject(error);
    }
  });
}

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
        // navigate("/");
        window.location.href = "/";
      } catch (error) {
        var isError=true;
        if (error.code === "auth/user-not-found") {
          try{
            await createUser(email);
            isError=false;
            window.location.href = "/";
          }catch (error){}
          

        }
        console.error("Error logging in:", error.code);
        if(isError) alert(error.message);
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
