import React, { useContext, useEffect } from "react";
import DashNav from "./DashNav";
import AddRecipe from "./AddRecipe";
import RecipeList from "./RecipeList";
import PrivateRoute from "./PrivateRoute";
import RecipePage from "./RecipePage";
import { Route, Switch, useHistory } from "react-router-dom";

import { DashContext, RecipeContext } from "../Contexts";
import useFauna, {
   getCurrentUserRecipes,
   getRecipes,
   getCategories,
   getCount,
} from "../FaunaAPI/FaunaAPI";

function Dashboard(props) {
   const {
      currentUser,
      currentUsersRecipes,
      setCurrentUsersRecipes,
      setSearchCategories,
      currentDisplayedRecipes,
      setCurrentAfter,
      setCurrentDisplayedRecipes,
      setMaxPage,
   } = useContext(DashContext);
   const fauna = useFauna();
   const history = useHistory();

   useEffect(() => {
      getCount(fauna).then((res) => {
         if (res % 6 === 0) {
            setMaxPage(res / 6);
         } else {
            setMaxPage(Math.floor(res / 6) + 1);
         }
      });
      if (localStorage.getItem("tt21_token")) {
         if (currentUser.id !== undefined) {
            getRecipes(fauna, setCurrentAfter).then((res) =>
               setCurrentDisplayedRecipes(res)
            );
            getCurrentUserRecipes(fauna, currentUser.id).then((res) =>
               setCurrentUsersRecipes(res)
            );
            getCategories(fauna).then((res) => setSearchCategories(res.data));
         } else {
            history.push("/");
            // well since the code is getting messy, just hacking here.
            setTimeout(() => {
               history.push("/dashboard");
            }, 50);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div style={{ display: "flex", flexDirection: "column" }}>
         <DashNav />

         <RecipeContext.Provider value={{ currentUser }}>
            <PrivateRoute
               exact
               path="/dashboard/recipes/:id"
               component={RecipePage}
               componentProps={{
                  currentDisplayedRecipes: currentDisplayedRecipes,
               }}
            />
         </RecipeContext.Provider>
         <Switch>
            <Route exact path="/dashboard/">
               <div style={{ marginLeft: "1%" }}>
                  Welcome {currentUser.username}
               </div>
            </Route>
            <Route path="/dashboard/addnew">
               <AddRecipe />
            </Route>
            <Route exact path="/dashboard/recipes">
               <RecipeList recipes={currentDisplayedRecipes} />
            </Route>

            <Route path="/dashboard/myrecipes">
               <RecipeList myrecipes={currentUsersRecipes} />
            </Route>
         </Switch>
      </div>
   );
}

export default Dashboard;
