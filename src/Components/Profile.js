import React, { useEffect, useState, useContext } from "react";
import defaultPic from "../assets/def_prof_pic.jpg";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import editlogo from "../assets/edit-button.png";

import { ProfileContext } from "../Contexts";

const defaultProfile = {
   username: "CookieMonster",
   firstname: "Ettore",
   lastname: "Boiardi",
   //    pic: `${defaultPic}`,
   bio: "I love to cook, but I need to learn more!",
   // onlinestatus: 'online',
   timeregistered: "Dec 25, 2020",
   //    numrecipes: "0",
};

function Profile() {
   const { currentUser } = useContext(ProfileContext);
   const [userProfile, setUserProfile] = useState(defaultProfile);

   useEffect(() => {
      setUserProfile(currentUser);
   }, [currentUser]);

   //    const [error, setError] = useState("");

   return (
      <Styledpage>
         <Styledheader className="profheader">
            <Styledpicbox>
               <Styleimg src={defaultPic} />
            </Styledpicbox>
            <Styledsinimg>
               <Styledinfobox>
                  <h1>{userProfile.username}</h1>
                  <h2>
                     {userProfile.firstname} {userProfile.lastname}
                  </h2>
                  <p>Bio: {userProfile.bio}</p>
               </Styledinfobox>
               <Styledinfospread>
                  <Styledchange>
                     <p>
                        Not you?
                        <NavLink to="/auth/login"> Login </NavLink>
                        or
                        <NavLink to="/auth/register"> Register </NavLink>
                     </p>
                  </Styledchange>
                  <Stylededit>
                     <NavLink to="/edituserprofile">
                        <Stylededitlogo src={editlogo} />
                     </NavLink>
                  </Stylededit>
               </Styledinfospread>
            </Styledsinimg>
         </Styledheader>
         <Styledbody>
            <Stylebodydiv>
               <p>Joined: {userProfile.timeregistered}</p>
            </Stylebodydiv>
            <Stylebodydiv>
               <p>Last Online: Online</p>
            </Stylebodydiv>
            <Stylebodydiv>
               <p>Recipies: Unknown</p>
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
const Styledchange = styled.div`
   height: 30px;
`;
const Styledinfospread = styled.div`
   display: flex;
   justify-content: space-between;
   flex-direction: column;
   padding: 0.5rem 1.5rem;
`;

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
const Stylededit = styled.div`
   height: 30px;
   display: flex;
   justify-content: flex-end;
   align-items: center;
`;

const Stylededitlogo = styled.img`
   width: 25px;
   height: 25px;
   &:hover {
      width: 27px;
      height: 27px;
   }
`;

const Styledsinimg = styled.div`
   display: flex;
   justify-content: space-between;
   width: 100%;
`;
