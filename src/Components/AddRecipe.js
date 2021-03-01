import React, { useState } from "react";

function AddRecipe(props) {
   const [ingredients, setIngredients] = useState([]);
   const [ingredientsToAdd, setIngredientsToAdd] = useState([]);

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

   return (
      <div>
         <form
            style={{
               display: "flex",
               flexDirection: "column",
            }}
         >
            <label>
               Title
               <input />
            </label>
            <label>
               Source
               <input />
            </label>

            <label>
               <div
                  style={{
                     display: "flex",
                  }}
               >
                  <span>Ingredients</span>
                  <div
                     onClick={(e) => {
                        e.preventDefault();
                        setIngredientsToAdd([...ingredientsToAdd].concat(""));
                     }}
                     style={{
                        padding: "4px 8px",
                        backgroundColor: "#c5c5c5",
                        cursor: "pointer",
                     }}
                  >
                     Add
                  </div>
               </div>

               <div style={{ display: "flex" }}>
                  <div>
                     {ingredients.map((i) => (
                        <p> {i} </p>
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
            <label>
               Intructions <input />
            </label>
            <label>
               Category <input />{" "}
            </label>

            <div>
               <button> Submit </button>
               <button> Cancel </button>
            </div>
         </form>
      </div>
   );
}

export default AddRecipe;
