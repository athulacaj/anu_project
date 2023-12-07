/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import { auth } from "../../common/functions/firebase";
import { Button, Flex, Spin } from "antd";

function OnBoardingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  // const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  let varUser = auth.currentUser;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      varUser = user;
    });
    setTimeout(() => {
      setLoading(false);
      if (varUser == null) {
        navigate("/login");
      }
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Flex
        align="center"
        justify="center"
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Spin size="large" />
      </Flex>
    );
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <h4>Onboadrdin</h4>
        <Button
          type="primary"
          onClick={() => {
            auth.signOut();
            navigate("/login");
          }}
        >
          Logout 
        </Button>
      </div>
    </UserContext.Provider>
  );
}

export default OnBoardingPage;
