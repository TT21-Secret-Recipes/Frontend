import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "./Components/Nav";
import Dashboard from "./Components/Dashboard";
import ProfilePage from "./Components/ProfilePage";
import LandingPage from "./Components/LandingPage";
import LoginPage from "./Components/LoginPage";
import "./App.css";

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
               <ProfilePage />
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
