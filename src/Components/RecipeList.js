/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import useFauna, {
   getRecipes,
   getCategories,
   getRecipesByCategory,
} from "../FaunaAPI/FaunaAPI";
// import { NavLink } from "react-router-dom";

function RecipeList(props) {
   const fauna = useFauna();
   const [recipes, setRecipes] = useState([]);
   const [existingCategory, setExistingCategory] = useState([]);
   const [searchCategory, setSearchCategory] = useState("");

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

            <select
               name=""
               id=""
               style={{ height: "2.8vh", fontSize: "0.9rem" }}
               onChange={(e) => setSearchCategory(e.target.value)}
               value={searchCategory}
            >
               <option value="all"> All </option>
               {/* this ideally should be a .map() by searching against api for all available categories somewhere in the app*/}
               {existingCategory.map((i) => (
                  <option value={String(i)} key={i}>
                     {i}
                  </option>
               ))}
            </select>
         </div>
      );
   }

   useEffect(() => {
      getRecipes(fauna).then((res) => setRecipes(res));
      // getCategories(fauna).then((res) => setExistingCategory(res.data));
      getCategories(fauna).then(
         (res) => setExistingCategory([...new Set(res.data)])
         // setExistingCategory(res.data)
      );
      // eslint-disable-next-line
   }, []);

   useEffect(() => {
      if (searchCategory === "all") {
         getRecipes(fauna).then((res) => setRecipes(res));
         return;
      } else {
         getRecipesByCategory(fauna, searchCategory).then((res) =>
            setRecipes(res)
         );
      }
      // eslint-disable-next-line
   }, [searchCategory]);

   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
         }}
      >
         <Search />
         {recipes.map((i) => (
            <RecipeCard recipe={i} key={i.id} />
         ))}
      </div>
   );
}

export default RecipeList;
