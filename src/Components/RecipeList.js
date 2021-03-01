import React from "react";
import RecipeCard from "./RecipeCard";

function RecipeList(props) {
   return (
      <div>
         {props.recipes.map((i) => (
            <RecipeCard recipe={i} />
         ))}
      </div>
   );
}

export default RecipeList;
