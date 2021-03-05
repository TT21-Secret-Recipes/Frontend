import React, { useRef } from "react";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
function Nav(props) {
   const drawer = useRef();
   const drawerback = useRef();

   const hidedrawer = () => {
      drawer.current.style.visibility = "hidden";
      drawerback.current.style.visibility = "hidden";
   };
   const showdrawer = () => {
      drawer.current.style.visibility = "visible";
      drawerback.current.style.visibility = "visible";
   };

   return (
      <nav
         style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            minWidth: "300px",
            alignItems: "center",
            zIndex: 50,
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
               position: "fixed",
               left: "0",
               top: "0",
               width: "100vw",
               visibility: "hidden",
               height: "100vh",
               zIndex: 998,
            }}
            ref={drawerback}
            onClick={hidedrawer}
         >
            <div
               style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "fixed",
                  right: "0",
                  top: "0",
                  background: "rgba(55,55,55,0.99)",
                  height: "100vh",
                  width: "15vh",
                  paddingLeft: "3vh",
                  visibility: "hidden",
                  zIndex: 999,
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

                  {props.currentUser.id && (
                     <NavLink
                        className="navlink"
                        onClick={hidedrawer}
                        to="/dashboard"
                     >
                        Dashboard
                     </NavLink>
                  )}

                  {/* !loggedin && */}
                  {!props.currentUser.id && (
                     <NavLink
                        className="navlink"
                        onClick={hidedrawer}
                        to="/auth/login"
                     >
                        Login
                     </NavLink>
                  )}
                  {!props.currentUser.id && (
                     <NavLink
                        className="navlink"
                        onClick={hidedrawer}
                        to="/auth/sign-up"
                     >
                        Register
                     </NavLink>
                  )}
                  {/* loggedin && */}
                  {props.currentUser.id && (
                     <NavLink
                        className="navlink"
                        onClick={() => {
                           props.logout();
                           hidedrawer();
                           localStorage.setItem("tt21_token", "");
                        }}
                        to="/"
                     >
                        Logout
                     </NavLink>
                  )}
                  {props.currentUser.id && (
                     <NavLink
                        className="navlink"
                        onClick={hidedrawer}
                        to="/userprofile"
                     >
                        My Profile
                     </NavLink>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
}

export default Nav;
