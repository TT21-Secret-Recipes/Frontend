import React from "react";
import RecipeCard from "./RecipeCard";

function Search() {
   return (
      <div
         style={{
            width: "75vw",
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            justifySelf: "end",
            justifyContent: "center",
         }}
      >
         <input
            style={{
               width: "80%",
               marginRight: "2%",
               height: "2.7vh",
               fontSize: "1.2rem",
            }}
            placeholder="Search"
         />

         <select name="" id="" style={{ height: "2.8vh", fontSize: "0.9rem" }}>
            <option value=""> All </option>
            {/* this ideally should be a .map() by searching against api for all available categories somewhere in the app*/}
            <option value=""> Pasta </option>
            <option value=""> Soup </option>
            <option value=""> Waffles </option>
         </select>
      </div>
   );
}

function RecipeList(props) {
   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
         }}
      >
         <Search />
         {props.recipes.map((i) => (
            <RecipeCard recipe={i} />
         ))}
      </div>
   );
}

export default RecipeList;
