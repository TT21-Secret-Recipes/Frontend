import React from "react";
import { NavLink } from "react-router-dom";

function DashNav(props) {
   return (
      <div
         style={{
            display: "flex",
            marginBottom: "3%",
            padding: " 1% 0",
            background: "#222222",
         }}
      >
         <NavLink to="/dashboard/recipes" className="navbutton">
            <div>Recipes</div>
         </NavLink>
         <NavLink to="/dashboard/addnew" className="navbutton">
            <div>Add Recipe</div>
         </NavLink>

         <NavLink to="/dashboard/myrecipes" className="navbutton">
            <div>My Recipes</div>
         </NavLink>
         <NavLink to="/userprofile" className="navbutton">
            <div>My Profile</div>
         </NavLink>
      </div>
   );
}

export default DashNav;
