import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import useFauna, { getRecipe } from "../FaunaAPI/FaunaAPI";

function RecipePage(props) {
   const fauna = useFauna();
   const history = useHistory();
   const [recipe, setRecipe] = useState({
      title: "",
      source: "",
      ingredients: [],
      instructions: "",
      category: "",
   });
   const id = useParams().id;
   // console.log(id);
   useEffect(() => {
      getRecipe(fauna, id)
         .then((res) => setRecipe(res.data))
         .catch((err) => console.log(err));
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
         <RiArrowGoBackFill
            style={{ fontSize: "1.4rem", alignSelf: "flex-end" }}
            onClick={() => history.goBack()}
            className="menuicon"
         />
         <h2> {recipe.title} </h2>
         <div>
            <span style={{ fontWeight: "600" }}> Source: </span> {recipe.source}
         </div>
         <div>
            <span style={{ fontWeight: "600" }}> Category: </span>{" "}
            {recipe.category}
         </div>
         <div>
            <h3>Ingredients:</h3>
            <ul>
               {recipe.ingredients.map((i, j) => (
                  <li key={j}> {i} </li>
               ))}
            </ul>
         </div>
         <h3>Instructions:</h3>
         <div> {recipe.instructions} </div>
      </div>
   );
}

export default RecipePage;
