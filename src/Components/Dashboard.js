import React, { useState } from "react";
import DashNav from "./DashNav";
import AddRecipe from "./AddRecipe";
import RecipeList from "./RecipeList";
import { Route, Switch } from "react-router-dom";
import { testrecipes } from "../Mockdata/testrecipes";

function Dashboard(props) {
   const [mockrecipes, setMockrecipes] = useState(testrecipes);

   const mockAddRecipe = (recipe) => {
      setMockrecipes(mockrecipes.concat(recipe));
   };

   return (
      <div style={{ display: "flex", flexDirection: "column" }}>
         <DashNav />

         <Switch>
            <Route path="/dashboard/addnew">
               <AddRecipe mockAddRecipe={mockAddRecipe} />
            </Route>
            <Route path="/dashboard/recipes">
               <RecipeList recipes={mockrecipes} />
            </Route>
         </Switch>
      </div>
   );
}

export default Dashboard;
