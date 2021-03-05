import React, { useEffect, useState, useContext } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import useFauna, { getRecipe } from "../FaunaAPI/FaunaAPI";
import { DashContext } from "../Contexts";
import styled from "styled-components";

import NewAddRecipe from './NewAddRecipe';
import { DivMainStyled } from './SharedStyles';

const DivDescriptionStyled = styled.div`
   height: auto;
   max-height: ${(props) => {
      return props.expanded ? "1000px" : 0;
   }};
   overflow: hidden;
   transition: max-height 0.5s;
`;

function FullRecipeCard(props) {
   const { recipeID, expanded } = props;
   const fauna = useFauna();

   const { currentDisplayedRecipes } = useContext(DashContext);
   const [recipe, setRecipe] = useState({
      title: "",
      source: "",
      ingredients: [],
      instructions: "",
      category: "",
   });

   useEffect(() => {
      const tryRetrive = currentDisplayedRecipes.filter(
         (i) => i.id === recipeID
      );
      if (tryRetrive.length > 0) {
         setRecipe(tryRetrive[0]);
      } else {
         getRecipe(fauna, recipeID)
            .then((res) => setRecipe(res.data))
            .catch((err) => console.log(err));
      }
   }, []);

   return (
      <DivDescriptionStyled expanded={expanded}>
         <h3>Ingredients:</h3>
         <ul>
            {Array.isArray(recipe.ingredients) && recipe.ingredients.map((i, j) => (
               <li key={j}> {i} </li>
            ))}
         </ul>

         <h3>Instructions:</h3>
         <div style={{ whiteSpace: "pre-wrap" }}> {recipe.instructions} </div>
      </DivDescriptionStyled>
   );
}


const H1VStyled = styled.h1`
   display: inline-block;
   margin: 0;
   transform: rotate(${(props) => (props.expanded ? "180deg" : "0deg")});
   transition: transform 0.5s;
`;

const H4EditStyled = styled.h4`
   margin: 0;
   opacity: ${ props => props.expanded ? 1 : 0};
   transition: opacity 0.5s linear;
`

export default function RecipeCard(props) {
   const { title, source, category } = props.recipe;
   const isMyRecipe = props.isMyRecipe;
   const [expanded, setExpanded] = useState(false);
   const [editMode, setEditMode] = useState(false);

   //console.log('Props:', props)

   function toggleEditMode(evt){
      setEditMode(!editMode);
   }

   function toggleExpand(evt) {
      evt.stopPropagation();
      setExpanded(!expanded);
   }

   return (
      <DivMainStyled>
         {/* optional img */}
         {!editMode && <div>
            <div
            style={{
               display: "flex",
               justifyContent: "space-between",
               fontWeight: "700",
               fontSize: "1.3rem",
            }}
            >
               {title}

               <div
                  style={{
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                  }}
               >
                  { ( isMyRecipe ) && <H4EditStyled expanded={expanded} onClick={toggleEditMode}>Edit</H4EditStyled>}
                  <H1VStyled expanded={expanded} onClick={toggleExpand}>
                     <RiArrowDownSFill className="menuicon" />
                  </H1VStyled>
               </div>
            </div>

            <div>
               <span style={{ fontWeight: "600" }}> Source: </span> {source}
            </div>

            <div>
               <span style={{ fontWeight: "600" }}> Category: </span> {category}
            </div>
            <FullRecipeCard recipeID={props.recipe.id} expanded={expanded} />
         </div>}

         {editMode && <div>
            <NewAddRecipe recipe={props.recipe} getBack={toggleEditMode}/>
         </div>}
      </DivMainStyled>
   );
}
