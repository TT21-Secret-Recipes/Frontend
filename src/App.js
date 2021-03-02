import "./App.css";
import Nav from "./Components/Nav";
import { Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";

function App() {
   return (
      <div className="App">
         <header>
            <Nav />
         </header>

         {/* routes  hi go china! */}

         <Route path="/Dashboard">
            <Dashboard />
         </Route>

         <footer> </footer>
      </div>
   );
}

export default App;
