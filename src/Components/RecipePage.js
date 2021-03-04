import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { RiArrowGoBackFill, RiAddBoxFill } from "react-icons/ri";
import useFauna, {
   getRecipe,
   deleteRecipe,
   updateRecipe,
} from "../FaunaAPI/FaunaAPI";
import { RecipeContext } from "../Contexts";

function RecipePage(props) {
   const fauna = useFauna();
   const history = useHistory();
   const { currentUser } = useContext(RecipeContext);
   const modalref = useRef();
   const [recipe, setRecipe] = useState({
      title: "",
      source: "",
      ingredients: [],
      instructions: "",
      category: "",
   });
   const [editmode, setEditmode] = useState(false);
   const toggle = () => {
      setEditmode(!editmode);
   };
   const id = useParams().id;
   // console.log(id);
   useEffect(() => {
      const tryRetrive = props.currentDisplayedRecipes.filter(
         (i) => i.id === id
      );
      if (tryRetrive.length > 0) {
         setRecipe(tryRetrive[0]);
      } else {
         getRecipe(fauna, id)
            .then((res) => setRecipe(res.data))
            .catch((err) => console.log(err));
      }
      // eslint-disable-next-line
   }, []);

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

         <div className="delete_recipe_modal_background closed" ref={modalref}>
            <div className="delete_recipe_modal">
               <div style={{ width: "65%" }}>
                  <div>Are you sure you want to delete</div>
                  <div style={{ fontSize: "1.6rem" }}>
                     {recipe.title} <span> ? </span>
                  </div>
               </div>
               <div
                  style={{
                     display: "flex",
                     justifyContent: "space-between",
                     width: "80%",
                  }}
               >
                  <button
                     onClick={() => {
                        deleteRecipe(fauna, recipe.id).then((res) => {
                           history.push("/dashboard/");
                           window.location.reload();
                        });
                     }}
                  >
                     I'm Sure
                  </button>
                  <button
                     onClick={() => {
                        modalref.current.classList.toggle("closed");
                     }}
                  >
                     Go Back
                  </button>
               </div>
            </div>
         </div>
         <div
            style={{ fontSize: "1rem", alignSelf: "flex-end", display: "flex" }}
         >
            {recipe.submittedBy === currentUser.id && (
               <div style={{ display: "flex" }}>
                  <div
                     style={{ marginRight: "2vh", color: "#e41212" }}
                     className="menuicon"
                     onClick={() => {
                        modalref.current.classList.toggle("closed");
                     }}
                  >
                     {editmode ? "Delete?" : <></>}
                  </div>
                  <div
                     style={{ marginRight: "2vh" }}
                     className="menuicon"
                     onClick={() => {
                        if (editmode) {
                           updateRecipe(fauna, recipe.id, recipe).then(
                              (res) => {
                                 toggle();
                                 window.location.reload();
                              }
                           );
                        } else {
                           toggle();
                        }
                     }}
                  >
                     {editmode ? "OK" : "Edit"}
                  </div>
               </div>
            )}
            <RiArrowGoBackFill
               style={{ fontSize: "1.4rem" }}
               onClick={() => history.goBack()}
               className="menuicon"
            />
         </div>

         {editmode ? (
            <input
               defaultValue={recipe.title}
               onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
               style={{ width: "50%", fontSize: "1.4rem", fontWeight: "600" }}
            />
         ) : (
            <h2> {recipe.title} </h2>
         )}
         <div>
            <span style={{ fontWeight: "600" }}> Source: </span>{" "}
            {editmode ? (
               <input
                  defaultValue={recipe.source}
                  onChange={(e) =>
                     setRecipe({ ...recipe, source: e.target.value })
                  }
               />
            ) : (
               <span>{recipe.source}</span>
            )}
         </div>
         <div>
            <span style={{ fontWeight: "600" }}> Category: </span>
            {editmode ? (
               <input
                  defaultValue={recipe.category}
                  onChange={(e) =>
                     setRecipe({ ...recipe, category: e.target.value })
                  }
               />
            ) : (
               <span>{recipe.category}</span>
            )}
         </div>
         <div>
            <div style={{ display: "flex", alignItems: "center" }}>
               <h3>Ingredients: </h3>{" "}
               {editmode ? (
                  <RiAddBoxFill
                     className="menuicon"
                     style={{
                        color: "#333333",
                        fontSize: "1.4rem",
                        marginLeft: "0.7rem",
                        textAlign: "center",
                     }}
                     onClick={() => {
                        const newingredients = recipe.ingredients.concat("");
                        setRecipe({ ...recipe, ingredients: newingredients });
                     }}
                  ></RiAddBoxFill>
               ) : (
                  <></>
               )}
            </div>
            {editmode ? (
               <ul>
                  {recipe.ingredients.map((i, j) => (
                     <div key={j}>
                        <input
                           defaultValue={i}
                           onChange={(e) => {
                              let newing = [...recipe.ingredients];
                              newing[j] = e.target.value;
                              setRecipe({ ...recipe, ingredients: newing });
                           }}
                        />
                        <span
                           className="menuicon"
                           style={{
                              color: "red",
                              fontSize: "1.2rem",
                              marginLeft: "0.7rem",
                           }}
                           onClick={() => {
                              const temp = [...recipe.ingredients];
                              temp.splice(j, 1);
                              setRecipe({ ...recipe, ingredients: temp });
                           }}
                        >
                           x
                        </span>
                     </div>
                  ))}
               </ul>
            ) : (
               <ul>
                  {recipe.ingredients.map((i, j) => (
                     <li key={j}> {i} </li>
                  ))}
               </ul>
            )}
         </div>
         <h3>Instructions:</h3>
         {editmode ? (
            <textarea
               defaultValue={recipe.instructions}
               onChange={(e) =>
                  setRecipe({ ...recipe, instructions: e.target.value })
               }
            />
         ) : (
            <div> {recipe.instructions} </div>
         )}
      </div>
   );
}

export default RecipePage;
