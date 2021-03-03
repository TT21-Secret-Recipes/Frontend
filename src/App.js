import { useState, useEffect } from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "./Components/Nav";
import Dashboard from "./Components/Dashboard";
import ProfilePage from "./Components/ProfilePage";
import LandingPage from "./Components/LandingPage";
import "./App.css";
import PrivateRoute from "./Components/PrivateRoute";
import RecipePage from "./Components/RecipePage";
import {
   // RecipeContext,
   LoginContext,
   ProfileContext,
   DashContext,
} from "./Contexts";
import { Logout } from "faunadb";
import useFauna, { getUserByID } from "./FaunaAPI/FaunaAPI";

function App() {
   const [currentUser, setCurrentUser] = useState({});
   const [currentUsersRecipes, setCurrentUsersRecipes] = useState([]);
   const [currentPage, setCurrentPage] = useState("");
   const [currentDisplayedRecipes, setCurrentDisplayedRecipes] = useState([]);
   const logout = () => {
      setCurrentUser({});
      setCurrentUsersRecipes([]);
      setCurrentPage("");
      setCurrentDisplayedRecipes([]);
   };
   const fauna = useFauna();
   useEffect(() => {
      if (localStorage.getItem("tt21_token").length > 0) {
         getUserByID(fauna, localStorage.getItem("tt21_token")).then((res) =>
            setCurrentUser(res)
         );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="App">
         <header>
            <Nav currentUser={currentUser} logout={logout} />
         </header>

         <Route exact path="/">
            <Redirect to="/dashboard"></Redirect>
         </Route>
         <Route path="/auth">
            <LoginContext.Provider value={{ currentUser, setCurrentUser }}>
               <LandingPage />
            </LoginContext.Provider>
         </Route>

         <ProfileContext.Provider value={{ currentUser }}>
            <PrivateRoute path="/userprofile" component={<ProfilePage />} />
         </ProfileContext.Provider>

         <PrivateRoute path="/recipes/:id" component={RecipePage} />
         <DashContext.Provider
            value={{
               currentPage,
               currentUser,
               currentUsersRecipes,
               setCurrentUsersRecipes,
               setCurrentPage,
               currentDisplayedRecipes,
               setCurrentDisplayedRecipes,
            }}
         >
            <PrivateRoute path="/dashboard" component={Dashboard} />
         </DashContext.Provider>

         <footer> </footer>
      </div>
   );
}

export default App;
