import "./App.css";
import Nav from "./Components/Nav";
import { Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import ProfilePage from "./Components/ProfilePage";

function App() {
   
   return (
      <div className="App">
         <header>
            <Nav />
         </header>

         {/* routes */}

         <Route path="/Dashboard">
            <Dashboard />
         </Route>
         {/* nate vv */}
         <Route path= "/UserProfile">
            <ProfilePage />
         </Route>


         <footer> </footer>
      </div>
   );
}

export default App;
