import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { RiCloseFill } from "react-icons/ri";
import useFauna, { submitRecipe } from "../FaunaAPI/FaunaAPI";
import { useHistory } from "react-router-dom";
import { DashContext } from "../Contexts";
const LabelStyled = styled.label`
   margin-top: 16px;
`;

function AddRecipe(props) {
   const fauna = useFauna();
   const history = useHistory();
   const [ingredients, setIngredients] = useState([]);
   const [ingredientToAdd, setIngredientToAdd] = useState("");
   const [recipe, setRecipe] = useState({
      title: "",
      source: "",
      ingredients,
      instructions: "",
      category: "",
   });

   const { currentUser } = useContext(DashContext);

   useEffect(() => {
      setRecipe({ ...recipe, ingredients: ingredients });
      // eslint-disable-next-line
   }, [ingredients]);

   const addIngredient = (e) => {
      e.preventDefault();
      setIngredients(ingredients.concat(ingredientToAdd));
   };

   // const mockSubmitRecipe = (e) => {
   //    e.preventDefault();
   //    props.mockAddRecipe(recipe);
   // };

   const faunaSubmitRecipe = (e) => {
      e.preventDefault();
      console.log({
         ...recipe,
         submittedBy: currentUser.id,
      })
      submitRecipe(fauna, {
         ...recipe,
         submittedBy: currentUser.id,
      }).then((res) => {
         console.log(res);
         //history.goBack();
      });
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
                        value={ingredientToAdd}
                        onChange={(e) => {
                           setIngredientToAdd(e.target.value);
                        }}
                     />
                     <button
                        onClick={(e) => {
                           addIngredient(e);
                           setIngredientToAdd("");
                        }}
                     >
                        OK
                     </button>
                     <button
                        onClick={(e) => {
                           e.preventDefault();
                           setIngredientToAdd("");
                        }}
                     >
                        Clear
                     </button>
                  </div>
               </div>

               <div style={{ display: "flex" }}>
                  <ul>
                     {ingredients.map((i, j) => (
                        <div
                           key={j + i}
                           style={{ display: "flex", alignItems: "center" }}
                        >
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
               <textarea
                  style={{ height: "190px" }}
                  onChange={(e) =>
                     setRecipe({ ...recipe, instructions: e.target.value })
                  }
               />
            </LabelStyled>
            <LabelStyled className="addRecipeSection">
               <div style={{ marginBottom: "2px" }}>Category</div>
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
                  onClick={(e) => {
                     faunaSubmitRecipe(e);
                     //window.location.reload();
                  }}
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
                  onClick={() => history.push("/dashboard")}
               >
                  Cancel
               </button>
            </div>
         </form>
      </div>
   );
}

export default AddRecipe;
