import React, { useRef } from "react";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
function Nav(props) {
   const drawer = useRef();

   const hidedrawer = () => {
      drawer.current.style.visibility = "hidden";
   };
   const showdrawer = () => {
      drawer.current.style.visibility = "visible";
   };

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
            className="menuicon"
            style={{ marginRight: "3%", fontSize: "1.8rem", cursor: "pointer" }}
            onClick={showdrawer}
         />

         <div
            style={{
               display: "flex",
               flexDirection: "column",
               position: "absolute",
               right: "0",
               top: "0",
               background: "rgba(55,55,55,0.99)",
               height: "100vh",
               width: "15vh",
               paddingLeft: "3vh",
               visibility: "hidden",
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
                  onClick={hidedrawer}
                  className="menuicon"
                  style={{
                     cursor: "pointer",
                     color: "white",
                     marginRight: "5%",
                     marginTop: "5%",
                     fontSize: "2rem",
                  }}
               />
            </div>

            <div
               style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "20px",
               }}
            >
               <NavLink className="navlink" onClick={hidedrawer} to="/">
                  Home
               </NavLink>
               {/* loggedin && */}
               <NavLink
                  className="navlink"
                  onClick={hidedrawer}
                  to="/dashboard"
               >
                  Dashboard
               </NavLink>

               {/* !loggedin && */}
               <NavLink className="navlink" onClick={hidedrawer} to="/login">
                  Login
               </NavLink>
               <NavLink className="navlink" onClick={hidedrawer} to="/register">
                  Register
               </NavLink>

               {/* loggedin && */}
               <NavLink className="navlink" onClick={hidedrawer} to="?">
                  Logout
               </NavLink>
            </div>
         </div>
      </nav>
   );
}

export default Nav;
