import React from "react";
import { useHistory } from "react-router-dom";

function RecipeCard(props) {
   const { title, source, category } = props.recipe;
   const history = useHistory();
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
         <div style={{ fontWeight: "700", fontSize: "1.3rem" }}> {title} </div>
         <div>
            <span style={{ fontWeight: "600" }}> Source: </span> {source}
         </div>
         <div>
            <span style={{ fontWeight: "600" }}> Category: </span> {category}
         </div>
      </div>
   );
}

export default RecipeCard;
