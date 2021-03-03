import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "./Components/Nav";
import Dashboard from "./Components/Dashboard";

import Profile from "./Components/Profile";
import LandingPage from "./Components/LandingPage";
import LoginPage from "./Components/LoginPage";
import "./App.css";
import EditProfile from "./Components/EditProfile";

function App() {
   return (
      <div className="App">
         <header>
            <Nav />
         </header>
         <Switch>
            <Route exact path="/">
               <Redirect to="/auth"></Redirect>
            </Route>
            <Route path="/auth">
               <LandingPage />
            </Route>
            <Route path="/userprofile">
               <Profile />
            </Route>
            <Route path="/edituserprofile">
               <EditProfile />
               </Route>
            <Route path="/dashboard">
               <Dashboard />
            </Route>
         </Switch>

         <footer> </footer>
      </div>
   );
}

export default App;
