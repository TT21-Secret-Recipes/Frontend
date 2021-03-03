import React, { useState } from "react";
import defaultPic from "../assets/def_prof_pic.jpg";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const defaultProfile = {
   username: "CookieMonster",
   name: "Ettore Boiardi",
   pic: `${defaultPic}`,
   bio: "I love to cook, but I need to learn more!",
   onlinestatus: "online",
   datejoined: "Dec 25, 2020",
   numrecipes: "0",
};

function Profile() {
   // const [userProfile, setUserProfile] = useState(defaultProfile)
   const [userProfile] = useState(defaultProfile);

   return (
      <Styledpage>
         <Styledheader class="profheader">
            <Styledpicbox>
               <Styleimg src={userProfile.pic} />
            </Styledpicbox>
            {/* <Styledinfospread> */}
            <Styledinfobox>
               <h1>{userProfile.username}</h1>
               <h2>{userProfile.name}</h2>
               <p>Bio: {userProfile.bio}</p>
            </Styledinfobox>
            <Stylededit>
               <p>
                  Not you?
                  <NavLink to="/login"> Login </NavLink>
                  or
                  <NavLink to="/register"> Register </NavLink>
               </p>
            </Stylededit>
            {/* </Styledinfospread> */}
         </Styledheader>
         <Styledbody>
            <Stylebodydiv>
               <p>Joined: {userProfile.datejoined}</p>
            </Stylebodydiv>
            <Stylebodydiv>
               <p>Last Online: {userProfile.onlinestatus}</p>
            </Stylebodydiv>
            <Stylebodydiv>
               <p>Recipies: {userProfile.numrecipes}</p>
            </Stylebodydiv>
         </Styledbody>
      </Styledpage>
   );
}

export default Profile;

const Styledpage = styled.div`
   display: flex;

   width: 1000px;
   // justify-content: center;
   margin: 0 auto;
   flex-direction: column;
`;
const Styledheader = styled.div`
   display: flex;
   width: 100%;
   background-color: #d9d9d9;
   margin-bottom: 20px;
   border-radius: 4px;
`;
const Styledpicbox = styled.div`
   display: flex;
`;
const Styleimg = styled.img`
   border-radius: 4px;
`;
const Styledinfobox = styled.div`
   padding: 0.5rem 1.5rem;
`;
const Stylededit = styled.div`
   height: 30px;
`;
// const Styledinfospread = styled.div`
// display:flex;
// justify-content: space-between;
// `

const Styledbody = styled.div`
   display: flex;
   width: 100%;
   background-color: #d9d9d9;
   border-radius: 4px;
   justify-content: space-evenly;
`;

const Stylebodydiv = styled.div`
   display: flex;
   padding: 0.5rem 1.5rem;
`;
