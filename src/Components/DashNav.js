import React from "react";
import { NavLink } from "react-router-dom";

function DashNav(props) {
   return (
      <div style={{ display: "flex", marginLeft: "1%", marginBottom: "3%" }}>
         {/* this should be a bar on dashboard that let user select tabs to browser existing recipes/ add recipes/ and others */}

         <NavLink to="/dashboard/recipes" className="navbutton">
            <div>Recipes</div>
         </NavLink>
         <NavLink to="/dashboard/addnew" className="navbutton">
            <div>Add Recipe</div>
         </NavLink>
      </div>
   );
}

export default DashNav;