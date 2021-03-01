import React from "react";
import DashNav from "./DashNav";
import AddRecipe from "./AddRecipe";

function Dashboard(props) {
   return (
      <div>
         <DashNav />

         {/* Add Recipe can be a route on the page or Modal */}
         <AddRecipe />
      </div>
   );
}

export default Dashboard;
