/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import { auth } from "../../common/functions/firebase";
import { Button, Flex, Spin } from "antd";
import OnboardRepository from "./onboard_repository";
import AdminHomePage from "../admin/adminHomePage";
import { vSpace } from "../../common/components/spacing";
import { FullPageLoader } from "../../common/components/loaders";

function OnboardingPage() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState();
  const { userData,setUserData} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  let varUser = auth.currentUser;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthUser(user);
      varUser = user;
      console.log(user);
      if (user == null) {
        navigate("/login");
      }
      OnboardRepository.getUserDataByEmail(user.email)
        .then((res) => {
          console.log(res);
          setUserData(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
    });
    setTimeout(() => {
      if (varUser == null) {
        navigate("/login");
      }
    }, 1000);
  }, []);

  if (loading) {
    return (<FullPageLoader/>)
  }
  return (
      <div>
        <Button
          type="primary"
          onClick={() => {
            auth.signOut();
            navigate("/login");
          }}
        >
          Logout
        </Button>
        {vSpace(20)}
          {
            userData && userData.role === "admin" ? (
              <AdminHomePage/>
            ) : (
              <div>
                <h1>User</h1>
                <Button
                  type="primary"
                  onClick={() => {
                    navigate("/user");
                  }}
                >
                  User
                </Button>
              </div>
            )
          }
      </div>
  );
}

export  {OnboardingPage};
