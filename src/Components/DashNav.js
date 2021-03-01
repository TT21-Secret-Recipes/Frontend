import React from "react";
import { NavLink } from "react-router-dom";

function DashNav(props) {
   return (
      <div>
         {/* this should be a bar on dashboard that let user select tabs to browser existing recipes/ add recipes/ and others */}

         <NavLink to="/dashboard/recipes"> Recipes </NavLink>
         <NavLink to="/dashboard/addnew"> Add Your Recipe </NavLink>
      </div>
   );
}

export default DashNav;
