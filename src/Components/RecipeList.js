/* eslint-disable no-undef */
import React, { useEffect, useState, useContext, useRef } from "react";
import { DashContext } from "../Contexts";
import RecipeCard from "./RecipeCard";
import useFauna, { getRecipes, search } from "../FaunaAPI/FaunaAPI";
import { useRouteMatch } from "react-router-dom";

function Search(props) {
   const {
      searchterm,
      setSearchTerm,
      existingCategory,
      setRecipes,
      searchCategory,
      setSearchCategory,
      searchbox,
      fauna,
   } = props.bundle;
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
            key="searchbox"
            value={searchterm}
            onChange={(e) => setSearchTerm(searchbox.current.value)}
            ref={searchbox}
         />

         <select
            name=""
            id=""
            style={{ height: "2.8vh", fontSize: "0.9rem" }}
            onChange={(e) => setSearchCategory(e.target.value)}
            value={searchCategory}
         >
            <option value=""> </option>
            {/* this ideally should be a .map() by searching against api for all available categories somewhere in the app*/}
            {existingCategory.map((i) => (
               <option value={String(i)} key={i}>
                  {i}
               </option>
            ))}
         </select>
         <button
            style={{ marginLeft: "2%", padding: "4px 12px" }}
            onClick={() => {
               // console.log(searchbox.current.value);
               if (searchbox.current.value === "" && searchCategory === "") {
                  if (props.recipes) {
                     setRecipes(props.recipes);
                     return;
                  } else {
                     getRecipes(fauna).then((res) => setRecipes(res));
                     return;
                  }
               }
               search(fauna, searchbox.current.value, searchCategory)
                  .then((res) => {
                     setRecipes(res);
                  })
                  .catch((err) => alert(err));

               // if (searchCategory === "") {
               //    if (props.recipes) {
               //       setRecipes(props.recipes);
               //       return;
               //    } else {
               //       getRecipes(fauna).then((res) => setRecipes(res));
               //       return;
               //    }
               // }

               // getRecipesByCategory(fauna, searchCategory).then((res) =>
               //    setRecipes(res)
               // );
            }}
         >
            OK
         </button>
      </div>
   );
}

function RecipeList(props) {
   const fauna = useFauna();
   const [searchterm, setSearchTerm] = useState("");
   const [recipes, setRecipes] = useState([]);
   const [existingCategory, setExistingCategory] = useState([]);
   const [searchCategory, setSearchCategory] = useState("");
   const { searchCategories } = useContext(DashContext);
   const { path } = useRouteMatch();
   const searchbox = useRef();
   const onMyRecipes = () =>
      path.split("/")[path.split("/").length - 1] === "myrecipes";

   const bundle = {
      searchterm,
      setSearchTerm,
      existingCategory,
      searchCategory,
      setSearchCategory,
      searchbox,
      setRecipes,
      fauna,
   };
   useEffect(() => {
      setExistingCategory(searchCategories);
      setSearchCategory("");
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
      } else {
         if (props.recipes) {
            setRecipes(props.recipes);
            return;
         } else {
            getRecipes(fauna).then((res) => setRecipes(res));
            return;
         }
      }

      // eslint-disable-next-line
   }, [path]);

   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            width: '100vw',
         }}
      >
         {!onMyRecipes() && <Search bundle={bundle} />}

         {recipes.map((i) => (
            <RecipeCard recipe={i} key={i.id} />
         ))}
      </div>
   );
}

export default RecipeList;
