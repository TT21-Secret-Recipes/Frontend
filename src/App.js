import { Switch, Route } from 'react-router-dom';
import Nav from "./Components/Nav";
import Dashboard from "./Components/Dashboard";
import ProfilePage from "./Components/ProfilePage"
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage'
import "./App.css";

function App() {
   return (
   <div className="App">
         <header>
            <Nav />
         </header>
      <Switch>
         <Route path='/'>
            <LandingPage/>
         </Route>
         <Route path= "/UserProfile">
            <ProfilePage />
         </Route>
         <Route path="/Dashboard">
            <Dashboard />
         </Route>
      </Switch>
         <footer> </footer>
   </div>
)
}

export default App;
