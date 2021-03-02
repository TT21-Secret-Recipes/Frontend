import React from "react";

function RecipeCard(props) {
   const { title, source, ingredients, instructions, category } = props.recipe;
   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            width: "75vw",
            alignSelf: "center",
            background: "#f1f1f1",
            borderRadius: "12px",
            padding: "4%",
            margin: "2%",
         }}
      >
         {/* optional img */}
         <h2> {title} </h2>
         <div>
            <span style={{ fontWeight: "600" }}> Source: </span> {source}
         </div>
         <div>
            <span style={{ fontWeight: "600" }}> Category: </span> {category}
         </div>
         <div>
            <h3>Ingredients:</h3>
            <ul>
               {ingredients.map((i) => (
                  <li> {i} </li>
               ))}
            </ul>
         </div>
         <h3>Instructions:</h3>
         <div> {instructions} </div>
      </div>
   );
}

export default RecipeCard;
