import React, { useContext, useEffect } from "react";
import DashNav from "./DashNav";
import AddRecipe from "./AddRecipe";
import RecipeList from "./RecipeList";
import { Route, Switch, useHistory } from "react-router-dom";

import { DashContext } from "../Contexts";
import useFauna, {
   getCurrentUserRecipes,
   getRecipes,
   getCategories,
} from "../FaunaAPI/FaunaAPI";

function Dashboard(props) {
   const {
      currentUser,
      currentUsersRecipes,
      setCurrentUsersRecipes,
      setSearchCategories,
      currentDisplayedRecipes,
      setCurrentDisplayedRecipes,
   } = useContext(DashContext);
   const fauna = useFauna();
   const history = useHistory();

   useEffect(() => {
      if (localStorage.getItem("tt21_token")) {
         if (currentUser.id !== undefined) {
            getRecipes(fauna).then((res) => setCurrentDisplayedRecipes(res));
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
