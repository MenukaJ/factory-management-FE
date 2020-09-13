import React from 'react';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Category from './components/Category';
import { ManageCategory } from './components/ManageCategory';
import Login from './components/Login';
import Nav from './components/Nav';
import Dashbord from './components/Dashbord';
import AddCategory from './components/AddCategory';
import ManageCat from './components/ManageCat';





function App() {
  return (
    <>
      <Router>

        <Switch>
          <Route path='/Dashbord' component={Dashbord} />
          <Route path='/AddCategory' component={AddCategory} />
          <Route path='/ManageCategory' component={ManageCat} />
          <Route path='/Nav' component={Nav} />

          <Route path='/Category' component={Category} />
          <Route path='/' component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
