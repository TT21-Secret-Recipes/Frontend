import React, { useContext, useEffect } from "react";
import DashNav from "./DashNav";
import AddRecipe from "./AddRecipe";
import RecipeList from "./RecipeList";
import { Route, Switch } from "react-router-dom";

import { DashContext } from "../Contexts";
import useFauna, {
   getCurrentUserRecipes,
   getRecipes,
} from "../FaunaAPI/FaunaAPI";

function Dashboard(props) {
   const {
      currentUser,
      currentUsersRecipes,
      setCurrentUsersRecipes,
      currentDisplayedRecipes,
      setCurrentDisplayedRecipes,
   } = useContext(DashContext);
   const fauna = useFauna();

   useEffect(() => {
      if (localStorage.getItem("tt21_token")) {
         if (currentUser.id !== undefined) {
            getRecipes(fauna).then((res) => setCurrentDisplayedRecipes(res));
            getCurrentUserRecipes(fauna, currentUser.id).then((res) =>
               setCurrentUsersRecipes(res)
            );
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div style={{ display: "flex", flexDirection: "column" }}>
         <DashNav />
         <Switch>
            <Route exact path="/dashboard/">
               <div style={{ marginLeft: "1%" }}>
                  Welcome {currentUser.name}
               </div>
            </Route>
            <Route path="/dashboard/addnew">
               <AddRecipe />
            </Route>
            <Route path="/dashboard/recipes">
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
