import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import axios from 'axios';

import { path } from "../Routes/routes";

const DivStyled = styled.div`
   padding: 25%;
   width: 50%;
`;

const LinkStyled = styled(Link)`
   background: #00a816;
   border-radius: 4px;
   color: white;
   display: inline-block;
   padding: 5px 10px;
   text-align: center;
   text-decoration: none;

   &:hover {
      background: #006b0e;
      color: #adadad;
   }
`;

export default function LoginPage() {
   return (
      <DivStyled>
         <h2>Welcome back</h2>
         <LinkStyled to={path.login}>Login</LinkStyled>
         <h4>Don't have an account?</h4>
         <LinkStyled to={path.signup}>Register</LinkStyled>
      </DivStyled>
   );
}
