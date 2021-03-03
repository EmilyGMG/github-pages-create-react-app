import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import { UserContext } from "../providers/UserProvider";
import Create from "../Pages/Create";
import Edit from "../Pages/Edit";
import Show from "../Pages/Show";
import App from "../Pages/App";
function Application() {
  const user = useContext(UserContext);
  return (
  
        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
          <App path="/dashboard" />
          <Create path="/create" />
          <Edit path="/edit:id" />
          <Show path="/show:id" />
          
        </Router>
      
  );
}

export default Application;
