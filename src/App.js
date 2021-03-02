import { Switch, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage'


function App() {
   return (
   <div>
      <Switch>
         <Route path='/'>
            <LandingPage/>
         </Route>
      </Switch>
   </div>
   );
}

export default App;
