import React from "react";

function RecipeCard(props) {
   const { title, source, ingredients, instructions, category } = props.recipe;
   return (
      <div>
         {/* optional img */}

         <p> Title: {title} </p>
         <p> Source: {source} </p>
         <p> Category: {category} </p>
         <div>
            <p> Ingredients: </p>
            {ingredients.map((i) => (
               <p> {i} </p>
            ))}
         </div>
         <p> Instructions: {instructions} </p>
      </div>
   );
}

export default RecipeCard;
