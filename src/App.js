import { useState, useEffect } from "react";

import { Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Dashboard from "./Components/Dashboard";
import ProfilePage from "./Components/ProfilePage";
import LandingPage from "./Components/LandingPage";
import "./App.css";
import PrivateRoute from "./Components/PrivateRoute";
import RecipePage from "./Components/RecipePage";
import {
   RecipeContext,
   LoginContext,
   ProfileContext,
   DashContext,
} from "./Contexts";
import useFauna, { getUserByID } from "./FaunaAPI/FaunaAPI";

function App() {
   const [currentUser, setCurrentUser] = useState({});
   const [currentUsersRecipes, setCurrentUsersRecipes] = useState([]);
   const [currentPage, setCurrentPage] = useState("");
   const [searchCategories, setSearchCategories] = useState([]);
   const [currentDisplayedRecipes, setCurrentDisplayedRecipes] = useState([]);
   const logout = () => {
      setCurrentUser({});
      setCurrentUsersRecipes([]);
      setCurrentPage("");
      setCurrentDisplayedRecipes([]);
      localStorage.setItem("tt21_token", "");
   };
   const fauna = useFauna();
   // if localstorage has a token stored, retrieve that user
   useEffect(() => {
      if (
         localStorage.getItem("tt21_token") !== null &&
         localStorage.getItem("tt21_token") !== ""
      ) {
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

         <Route exact path="/"></Route>
         <Route path="/auth">
            <LoginContext.Provider value={{ currentUser, setCurrentUser }}>
               <LandingPage />
            </LoginContext.Provider>
         </Route>

         <ProfileContext.Provider value={{ currentUser }}>
            <PrivateRoute path="/userprofile" component={ProfilePage} />
         </ProfileContext.Provider>

         <RecipeContext.Provider value={{ currentUser }}>
            <PrivateRoute
               path="/recipes/:id"
               component={RecipePage}
               componentProps={{
                  currentDisplayedRecipes: currentDisplayedRecipes,
               }}
            />
         </RecipeContext.Provider>

         <DashContext.Provider
            value={{
               currentPage,
               currentUser,
               currentUsersRecipes,
               setCurrentUsersRecipes,
               setCurrentPage,
               searchCategories,
               setSearchCategories,
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
