/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import useFauna, {
   getRecipes,
   getCategories,
   getRecipesByCategory,
} from "../FaunaAPI/FaunaAPI";
import { useRouteMatch } from "react-router-dom";

function RecipeList(props) {
   const fauna = useFauna();
   const [recipes, setRecipes] = useState([]);
   const [existingCategory, setExistingCategory] = useState([]);
   const [searchCategory, setSearchCategory] = useState("");
   const { path } = useRouteMatch();
   const onMyRecipes = () =>
      path.split("/")[path.split("/").length - 1] === "myrecipes";

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
      if (existingCategory.length === 0) {
         getCategories(fauna).then((res) => {
            setExistingCategory(res.data);
         });
      }

      if (onMyRecipes()) {
         if (!props.myrecipes) {
            getCurrentUserRecipes(
               fauna,
               localStorage.getItem("tt21_token")
            ).then((res) => setCurrentUsersRecipes(res));
         }

         setRecipes(props.myrecipes);
         // disable recipe fetch for myrecipe for now
         return;
      }

      // we fetch the data
      else if (searchCategory === "all" || searchCategory === "") {
         if (props.recipes) {
            setRecipes(props.recipes);
            return;
         } else {
            getRecipes(fauna).then((res) => setRecipes(res));
            return;
         }
      } else {
         getRecipesByCategory(fauna, searchCategory).then((res) =>
            setRecipes(res)
         );
      }
      // eslint-disable-next-line
   }, [searchCategory, path]);

   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
         }}
      >
         {!onMyRecipes() && <Search />}

         {recipes.map((i) => (
            <RecipeCard recipe={i} key={i.id} />
         ))}
      </div>
   );
}

export default RecipeList;
