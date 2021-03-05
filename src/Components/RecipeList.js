/* eslint-disable no-undef */
import React, { useEffect, useState, useContext, useRef } from "react";
import { DashContext } from "../Contexts";
import RecipeCard from "./RecipeCard";

import useFauna, {
   getRecipes,
   search,
   getNextPage,
   getPrevPage,
} from "../FaunaAPI/FaunaAPI";

import { useRouteMatch } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function Search(props) {
   const {
      searchterm,
      setSearchTerm,
      existingCategory,
      setRecipes,
      searchCategory,
      setSearchCategory,
      setShowpage,
      searchbox,
      fauna,
      setCurrentPage,
      setCurrentAfter,
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
            style={{ height: "2.8vh", fontSize: "0.9rem", maxWidth: "100px" }}
            onChange={(e) => setSearchCategory(e.target.value)}
            value={searchCategory}
         >
            {existingCategory.map((i) => (
               <option value={String(i)} key={i}>
                  {i}
               </option>
            ))}
         </select>
         <button
            style={{ marginLeft: "2%", padding: "4px 12px" }}
            onClick={() => {
               setShowpage(true);
               setCurrentPage(1);
               if (searchCategory !== "") {
                  setShowpage(false);
               }
               if (searchbox.current.value === "" && searchCategory === "") {
                  if (props.recipes) {
                     setRecipes(props.recipes);
                     return;
                  } else {
                     getRecipes(fauna, setCurrentAfter).then((res) =>
                        setRecipes(res)
                     );
                     return;
                  }
               }
               search(fauna, searchbox.current.value, searchCategory)
                  .then((res) => {
                     setRecipes(res);
                  })
                  .catch((err) => alert(err));
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
   const [showpage, setShowpage] = useState(true);
   const [searchCategory, setSearchCategory] = useState("");
   const [loading, setLoading] = useState(false);
   const {
      currentBefore,
      setCurrentBefore,
      currentAfter,
      setCurrentAfter,
      searchCategories,
      currentPage,
      setCurrentPage,
      maxPage,
   } = useContext(DashContext);
   const { path } = useRouteMatch();
   const searchbox = useRef();
   const onMyRecipes = () =>
      path.split("/")[path.split("/").length - 1] === "myrecipes";

   const bundle = {
      searchterm,
      setSearchTerm,
      existingCategory,
      setShowpage,
      searchCategory,
      setSearchCategory,
      searchbox,
      setCurrentPage,
      setRecipes,
      setCurrentAfter,
      fauna,
   };

   function PageControl() {
      if (onMyRecipes()) {
         return <></>;
      }

      return (
         <div
            style={{
               display: "flex",
               alignItems: "center",
               alignSelf: "center",
               justifyContent: "space-between",
               width: "20vh",
               minWidth: "200px",
               fontSize: "1.2rem",
               margin: "1%",
            }}
         >
            <button
               className="menuicon"
               style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  marginTop: "0.4rem",
               }}
               onClick={() => {
                  if (currentPage === 1) {
                     return;
                  }
                  if (loading) {
                     return;
                  }
                  setLoading(true);
                  setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1);

                  if (currentPage !== 1) {
                     getPrevPage(
                        fauna,
                        currentBefore,
                        setCurrentBefore,
                        setCurrentAfter
                     ).then((res) => {
                        setLoading(false);
                        setRecipes(res);
                     });
                  }
               }}
            >
               <BsChevronLeft />
            </button>
            <div>{currentPage}</div>
            <button
               className="menuicon"
               style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  marginTop: "0.4rem",
               }}
               onClick={(e) => {
                  if (loading) {
                     return;
                  }
                  setLoading(true);
                  setCurrentPage(
                     currentPage + 1 > maxPage ? maxPage : currentPage + 1
                  );
                  if (currentPage + 1 > maxPage) {
                     return;
                  }

                  getNextPage(
                     fauna,
                     currentAfter,
                     setCurrentBefore,
                     setCurrentAfter
                  ).then((res) => {
                     setLoading(false);
                     setRecipes(res);
                  });
               }}
            >
               <BsChevronRight />
            </button>
         </div>
      );
   }

   useEffect(() => {
      setExistingCategory(searchCategories);
      setSearchCategory("");
      setCurrentPage(1);
      if (onMyRecipes()) {
         if (!props.myrecipes) {
            getCurrentUserRecipes(
               fauna,
               localStorage.getItem("tt21_token")
            ).then((res) => setCurrentUsersRecipes(res));
         }

         setRecipes(props.myrecipes);
         return;
      } else {
         if (props.recipes) {
            setRecipes(props.recipes);
            return;
         } else {
            getRecipes(fauna, setCurrentAfter).then((res) => setRecipes(res));
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
         }}
      >
         {!onMyRecipes() && <Search bundle={bundle} />}

         {onMyRecipes()
            ? recipes.map((i) => (
                 <RecipeCard recipe={i} key={i.id} isMyRecipe={true} />
              ))
            : recipes.map((i) => (
                 <RecipeCard recipe={i} key={i.id} isMyRecipe={false} />
              ))}
         {}

         {showpage && <PageControl></PageControl>}
      </div>
   );
}

export default RecipeList;
