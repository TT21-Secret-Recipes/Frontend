import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
// import { RiArrowGoBackFill, RiAddBoxFill } from "react-icons/ri";
import useFauna, {
   getRecipe,
   deleteRecipe,
   updateRecipe,
} from "../FaunaAPI/FaunaAPI";
// import { RecipeContext } from "../Contexts";
import styled from 'styled-components';

const DivDescriptionStyled = styled.div`
    height: auto;
    max-height: ${props => {
        return props.expanded ? '1000px' : 0
    }};
    overflow: hidden;
    transition: max-height 0.5s;
`

function FullRecipeCard(props){
   const { recipeID, expanded } = props;
   const fauna = useFauna();
   //const history = useHistory();
   // const { currentUser } = useContext(RecipeContext);
   //const modalref = useRef();
   const [recipe, setRecipe] = useState({
      title: "",
      source: "",
      ingredients: [],
      instructions: "",
      category: "",
   });
   // const [editmode, setEditmode] = useState(false);

   // console.log('ID:', recipeID)
   useEffect(() => {
      // const tryRetrive = props.currentDisplayedRecipes.filter(
      //    (i) => i.id === recipeID
      // );
      const tryRetrive = [];
      if (tryRetrive.length > 0) {
         setRecipe(tryRetrive[0]);
      } else {
         getRecipe(fauna, recipeID)
            .then((res) => setRecipe(res.data))
            .catch((err) => console.log(err));
      }
      // eslint-disable-next-line
   }, []);

   return (
      <DivDescriptionStyled expanded={expanded}>
         <h3>Ingredients:</h3>
         <ul>
            {recipe.ingredients.map((i, j) => (
               <li key={j}> {i} </li>
            ))}
         </ul>
         
         <h3>Instructions:</h3>
         <div style={{whiteSpace: 'pre-wrap'}}> {recipe.instructions} </div>
      </DivDescriptionStyled>
   )
}

const H1VStyled = styled.h1`
   display: inline-block;
   margin: 0;
   transform: rotate(${props => props.expanded ? '180deg' : '0deg'});
   transition: transform 0.5s;
`

function RecipeCard(props) {
   const { title, source, category } = props.recipe;
   const history = useHistory();

   const [expanded, setExpanded] = useState(false);

   //console.log('Props:', props)

   function toggleExpand(evt){
      evt.stopPropagation();
      setExpanded(!expanded)
   }
   
   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            width: "75vw",
            alignSelf: "center",
            background: "#f1f1f1",
            borderRadius: "12px",
            padding: "1% 2%",
            marginTop: "2%",
         }}
         className="menuicon"
         onClick={() => {
            history.push("/dashboard/recipes/" + props.recipe.id);
         }}
      >
            
         {/* optional img */}
         <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: "700",
            fontSize: "1.3rem",
            }}
         >

            {title}
            <H1VStyled expanded={expanded} onClick={toggleExpand}>V</H1VStyled>
         </div>

         <div>
            <span style={{ fontWeight: "600" }}> Source: </span> {source}
         </div>
         
         <div>
            <span style={{ fontWeight: "600" }}> Category: </span> {category}
         </div>
         <FullRecipeCard recipeID={props.recipe.id} expanded={expanded}/>
      </div>
   );
}

export default RecipeCard;
