import {Route, BrowserRouter} from "react-router-dom"
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

import Home from "./views/Home/home.component"
import Detail from "./views/detail/details.component"
import Create from "./views/create/create.component"
import LandingPage from "./views/landing/landing.component";


import './App.css';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
    <Route exact path= "/" component={LandingPage}/>
      <Route exact path= "/home" component={Home}/>
      <Route path= "/home/:id" component={Detail}/>
      <Route path= "/create" component={Create}/>
      

      </Switch>    
    </div>
    </BrowserRouter>
  );
}

export default App;
