import { useEffect, useState } from "react";
import { auth } from "../../common/functions/firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { use } from "i18next";
import { useNavigate } from "react-router-dom";


function createUser(email,password) {
   password??="123456";
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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginError, setloginError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signInWithEmailPassword() {
    setloginError(null);

    if (!validateEmail(email)) {
      setloginError("Please enter a valid email address");
      return;
    }
    if (validatePassword(password)) {
      setLoading(true);
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
    setLoading(false);
  }

  function validateEmail() {
    if (!email) {
      return false;
    }
    return true;
  }

  function validatePassword() {
    if (password&&password.length >= 6) {
      return true;
    }
    return false;
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    signInWithEmailPassword,
    loginError,
    loading
  };
}

export default useLoginController;
