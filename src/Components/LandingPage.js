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
   height: 500px;
   min-width: 300px;
   margin: 0;
   position: absolute;
   top: 50%;
   transform: translate(-50%, -75%);
   text-align: center;
   width: 500px;

   @media (max-height: 900px){
      border: none;
      margin: 0 auto;
      position: static;
      transform: translate(0, 0);
      width: 100%;
   }
`;

export default function LandingPage() {
   return (
      <DivMainStyled>
         <p>{`Width: ${window.screen.width}
         Height: ${window.screen.height}`}</p>
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
