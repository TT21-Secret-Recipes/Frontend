import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { RiCloseFill, RiAddFill } from "react-icons/ri";

const LabelStyled = styled.label`
  margin-top: 16px;
`

function AddRecipe(props) {
   const [ingredients, setIngredients] = useState([]);
   const [ingredientsToAdd, setIngredientsToAdd] = useState('');
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
      setIngredientsToAdd('');
   };

   const addIngredients = (e, j) => {
      e.preventDefault();
      setIngredients(ingredients.concat(ingredientsToAdd));
   };

   const mockSubmitRecipe = (e) => {
      e.preventDefault();
      props.mockAddRecipe(recipe);
   };

   return (
      <div style={{ alignSelf: "center", minWidth: "330px", width: "20vw" }}>
         <form
            style={{
               display: "flex",
               flexDirection: "column",
            }}
         >
            <LabelStyled className="addRecipeSection">
               <div>Title</div>
               <input
                  onChange={(e) =>
                     setRecipe({ ...recipe, title: e.target.value })
                  }
               />
            </LabelStyled>
            <LabelStyled className="addRecipeSection">
               <div>Source</div>
               <input
                  onChange={(e) =>
                     setRecipe({ ...recipe, source: e.target.value })
                  }
               />
            </LabelStyled>

            <LabelStyled className="addRecipeSection">
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
                  
               </div>

               <div style={{ marginLeft: "40px", marginTop: "4%" }}>
                  <div style={{ display: "flex" }}>
                     <input
                        value={ingredientsToAdd}
                        onChange={ e => {
                           setIngredientsToAdd(e.target.value);
                        }}
                     />
                     <button
                        onClick={ e => {
                           addIngredients(e);
                           removeIngredients(e);
                        }}
                     >
                        OK
                     </button>
                     <button
                        onClick={ e => removeIngredients(e)}
                     >
                        Delete
                     </button>
                  </div>
                     
               </div>

               <div style={{ display: "flex" }}>
                  <ul>
                     {ingredients.map((i, j) => (
                        <div style={{ display: "flex", alignItems: "center" }}>
                           <li>{i}</li>
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
                  </ul>
               </div>
            </LabelStyled>
            <LabelStyled className="addRecipeSection">
               Instructions
               <textarea style={{height: '190px',}}
                  onChange={(e) =>
                     setRecipe({ ...recipe, instructions: e.target.value })
                  }
               />
            </LabelStyled>
            <LabelStyled className="addRecipeSection">
               <div style={{'margin-bottom': '2px',}}>Category</div>
               <input
                  onChange={(e) =>
                     setRecipe({ ...recipe, category: e.target.value })
                  }
               />
            </LabelStyled>

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
