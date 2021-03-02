import React, { useState, useEffect } from "react";
import { RiCloseFill, RiAddFill } from "react-icons/ri";

function AddRecipe(props) {
   const [ingredients, setIngredients] = useState([]);
   const [ingredientsToAdd, setIngredientsToAdd] = useState([]);
   const [recipe, setRecipe] = useState({
      title: "",
      source: "",
      ingredients,
      instructions: "",
      category: "",
   });

   useEffect(() => {
      setRecipe({ ...recipe, ingredients: ingredients });
   }, [ingredients]);

   const removeIngredients = (e, j) => {
      e.preventDefault();
      const newIngredientsToAdd = [...ingredientsToAdd];
      newIngredientsToAdd.splice(j, 1);
      setIngredientsToAdd(newIngredientsToAdd);
   };

   const addIngredients = (e, j) => {
      e.preventDefault();
      setIngredients(ingredients.concat(ingredientsToAdd[j]));
   };

   const mockSubmitRecipe = (e) => {
      e.preventDefault();
      props.mockAddRecipe(recipe);
   };

   return (
      <div style={{ alignSelf: "center", width: "60vw" }}>
         <form
            style={{
               display: "flex",
               flexDirection: "column",
            }}
         >
            <label className="addRecipeSection">
               <div>Title</div>
               <input
                  onChange={(e) =>
                     setRecipe({ ...recipe, title: e.target.value })
                  }
               />
            </label>
            <label className="addRecipeSection">
               <div>Source</div>
               <input
                  onChange={(e) =>
                     setRecipe({ ...recipe, source: e.target.value })
                  }
               />
            </label>

            <label className="addRecipeSection">
               <div
                  style={{
                     display: "flex",
                  }}
               >
                  <div
                     style={{
                        display: "flex",
                        alignItems: "center",
                     }}
                  >
                     Ingredients
                  </div>
                  <RiAddFill
                     onClick={(e) => {
                        e.preventDefault();
                        setIngredientsToAdd([...ingredientsToAdd].concat(""));
                     }}
                     className="menuicon"
                     style={{
                        padding: "4px 3px",
                        backgroundColor: "#e4e4e4",
                        cursor: "pointer",
                        width: "2vh",
                        borderRadius: "6px",
                        margin: "1%",
                     }}
                  ></RiAddFill>
               </div>

               <div style={{ display: "flex" }}>
                  <div>
                     {ingredients.map((i, j) => (
                        <div style={{ display: "flex", alignItems: "center" }}>
                           {i}
                           <div className="menuicon">
                              <RiCloseFill
                                 style={{
                                    color: "#d42f2f",
                                    cursor: "pointer",
                                 }}
                                 onClick={() => {
                                    const temp = [...ingredients];
                                    temp.splice(j, 1);
                                    setIngredients(temp);
                                 }}
                              />
                           </div>
                        </div>
                     ))}
                  </div>
                  <div style={{ marginLeft: "5vw", marginTop: "1%" }}>
                     {ingredientsToAdd.map((i, j) => (
                        <div key={j} style={{ display: "flex" }}>
                           <input
                              value={ingredientsToAdd[j]}
                              onChange={(e) => {
                                 const temp = [...ingredientsToAdd];
                                 temp[j] = e.target.value;
                                 setIngredientsToAdd(temp);
                              }}
                           />
                           <button
                              onClick={(e) => {
                                 addIngredients(e, j);
                                 removeIngredients(e, j);
                              }}
                           >
                              OK
                           </button>
                           <button
                              id={j}
                              onClick={(e, j) => removeIngredients(e, j)}
                           >
                              Delete
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            </label>
            <label className="addRecipeSection">
               Instructions
               <textarea
                  onChange={(e) =>
                     setRecipe({ ...recipe, instructions: e.target.value })
                  }
               />
            </label>
            <label className="addRecipeSection">
               Category
               <input
                  onChange={(e) =>
                     setRecipe({ ...recipe, category: e.target.value })
                  }
               />
            </label>

            <div
               style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "2%",
               }}
            >
               <button
                  style={{
                     padding: "1vh 2vh",
                     fontSize: "1rem",
                     backgroundColor: "#e4e4e4",
                     border: "0",
                     cursor: "pointer",

                     borderRadius: "6px",
                     margin: "1%",
                  }}
                  onClick={(e) => mockSubmitRecipe(e)}
               >
                  Submit
               </button>
               <button
                  style={{
                     padding: "1vh 2vh",
                     fontSize: "1rem",
                     backgroundColor: "#e4e4e4",
                     border: "0",
                     cursor: "pointer",

                     borderRadius: "6px",
                     margin: "1%",
                  }}
               >
                  Cancel
               </button>
            </div>
         </form>
      </div>
   );
}

export default AddRecipe;
