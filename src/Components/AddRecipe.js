import React, { useState, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

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
      <div>
         <form
            style={{
               display: "flex",
               flexDirection: "column",
            }}
         >
            <label>
               Title
               <input
                  onChange={(e) =>
                     setRecipe({ ...recipe, title: e.target.value })
                  }
               />
            </label>
            <label>
               Source
               <input
                  onChange={(e) =>
                     setRecipe({ ...recipe, source: e.target.value })
                  }
               />
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
                     {ingredients.map((i, j) => (
                        <div style={{ display: "flex", alignItems: "center" }}>
                           {i}
                           <div className="burgermenu">
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
            <label>
               Intructions
               <input
                  onChange={(e) =>
                     setRecipe({ ...recipe, instructions: e.target.value })
                  }
               />
            </label>
            <label>
               Category
               <input
                  onChange={(e) =>
                     setRecipe({ ...recipe, category: e.target.value })
                  }
               />
            </label>

            <div>
               <button onClick={(e) => mockSubmitRecipe(e)}> Submit </button>
               <button> Cancel </button>
            </div>
         </form>
      </div>
   );
}

export default AddRecipe;
