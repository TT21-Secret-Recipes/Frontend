import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { RiArrowGoBackFill, RiAddBoxFill } from "react-icons/ri";
import useFauna, { getRecipe } from "../FaunaAPI/FaunaAPI";
import { RecipeContext } from "../Contexts";

function RecipePage(props) {
   const fauna = useFauna();
   const history = useHistory();
   const { currentUser } = useContext(RecipeContext);
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
         <div
            style={{ fontSize: "1rem", alignSelf: "flex-end", display: "flex" }}
            onClick={() => toggle()}
         >
            {recipe.submittedBy === currentUser.id && (
               <div style={{ marginRight: "2vh" }} className="menuicon">
                  {editmode ? "OK" : "Edit"}
               </div>
            )}
            <RiArrowGoBackFill
               style={{ fontSize: "1.4rem" }}
               onClick={() => history.goBack()}
               className="menuicon"
            />
         </div>

         <h2> {recipe.title} </h2>
         <div>
            <span style={{ fontWeight: "600" }}> Source: </span>{" "}
            {editmode ? (
               <input defaultValue={recipe.source} />
            ) : (
               <span>{recipe.source}</span>
            )}
         </div>
         <div>
            <span style={{ fontWeight: "600" }}> Category: </span>
            {editmode ? (
               <input defaultValue={recipe.category} />
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
                        <input defaultValue={i} />
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
            <textarea defaultValue={recipe.instructions} />
         ) : (
            <div> {recipe.instructions} </div>
         )}
      </div>
   );
}

export default RecipePage;
