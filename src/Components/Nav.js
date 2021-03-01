import React, { useRef } from "react";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
function Nav(props) {
   const drawer = useRef();
   return (
      <nav
         style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100vw",
            alignItems: "center",
         }}
      >
         <div style={{ marginLeft: "2%" }}>
            <h2>Secret Family Recipes Cookbook</h2>
         </div>
         <RiMenuFill
            className="burgermenu"
            style={{ marginRight: "2%", fontSize: "1.8rem" }}
            onClick={() => drawer.current.classList.toggle("closed")}
         />

         <div
            style={{
               display: "flex",
               flexDirection: "column",
               position: "absolute",
               right: "0",
               top: "0",
               background: "gray",
               height: "100vh",
               paddingLeft: "3vh",
            }}
            ref={drawer}
         >
            <div
               style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  fontSize: "1.5rem",
               }}
            >
               <RiCloseFill
                  onClick={() => drawer.current.classList.toggle("closed")}
               />
            </div>

            <div
               style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "20px",
               }}
            >
               <NavLink to="/"> Home </NavLink>
               {/* loggedin && */}
               <NavLink to="/dashboard"> Dashboard </NavLink>

               {/* !loggedin && */}
               <NavLink to="/login"> Login </NavLink>
               <NavLink to="/register"> Register </NavLink>

               {/* loggedin && */}
               <NavLink to="?"> Logout </NavLink>
            </div>
         </div>
      </nav>
   );
}

export default Nav;
