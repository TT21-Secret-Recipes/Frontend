import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { RiArrowGoBackFill, RiAddBoxFill } from "react-icons/ri";
import useFauna, {
   getRecipe,
   deleteRecipe,
   updateRecipe,
} from "../FaunaAPI/FaunaAPI";
import { RecipeContext } from "../Contexts";

function FullRecipeCard(props){
   const { recipeID } = props;
   const fauna = useFauna();
   const history = useHistory();
   // const { currentUser } = useContext(RecipeContext);
   const modalref = useRef();
   const [recipe, setRecipe] = useState({
      title: "",
      source: "",
      ingredients: [],
      instructions: "",
      category: "",
   });
   const [editmode, setEditmode] = useState(false);

   ///console.log('ID:', recipeID)
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
      <div>
         <h3>Ingredients:</h3>
         <ul>
            {recipe.ingredients.map((i, j) => (
               <li key={j}> {i} </li>
            ))}
         </ul>
         
         <h3>Instructions:</h3>
         <div style={{whiteSpace: 'pre-wrap'}}> {recipe.instructions} </div>
      </div>
   )
}

function RecipeCard(props) {
   const { title, source, category } = props.recipe;
   const history = useHistory();
   //console.log('Props:', props)
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
         <div style={{ fontWeight: "700", fontSize: "1.3rem" }}>
            {title}
         </div>

         <div>
            <span style={{ fontWeight: "600" }}> Source: </span> {source}
         </div>
         
         <div>
            <span style={{ fontWeight: "600" }}> Category: </span> {category}
         </div>
         <FullRecipeCard recipeID={props.recipe.id}/>
      </div>
   );
}

export default RecipeCard;
