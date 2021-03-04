import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { path } from "../Routes/routes";
import LoginPage from "./LoginPage";
import WelcomePage from "./WelcomePage";
import SignupPage from "./SignupPage";

const DivMainStyled = styled.div`
   border: 1px solid black;
   border-radius: 7px;
   left: 50%;
   margin: 0;
   position: absolute;
   top: 50%;
   transform: translate(-50%, -75%);
   text-align: center;
   width: 500px;
   height: 500px;
`;

export default function LandingPage() {
   return (
      <DivMainStyled>
         <Switch>
            <Route exact path={path.welcome}>
               <WelcomePage />
            </Route>

            <Route path={path.login}>
               <LoginPage />
            </Route>

            <Route path={path.signup}>
               <SignupPage />
            </Route>
         </Switch>
      </DivMainStyled>
   );
}