import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
   return (
      <Route
         {...rest}
         render={() =>
            localStorage.getItem("tt21_token") ? (
               <Component {...rest.componentProps} />
            ) : (
               <Redirect to="/auth/login" />
            )
         }
      />
   );
};

export default PrivateRoute;
