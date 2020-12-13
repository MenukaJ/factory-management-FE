import React from 'react';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Supplier from './components/Supplier';
import Login from './components/Login';
import Nav from './components/Nav';
import Dashbord from './components/Dashbord';
import AddSuppliers from './components/AddSuppliers';
import ManageSup from './components/ManageSup';
import Delivery from './components/Delivery';
import GenReport from './components/GenReport';
import AddDelivery from './components/AddDelivery';
function App() {
  return (
    <>
      <Router>

        <Switch>
          <Route path='/Dashbord' component={Dashbord} />
          <Route path='/Nav' component={Nav} />
          <Route path='/AddSuppliers' component={AddSuppliers}/>
          <Route path='/ManageSuppliers' component={ManageSup}/>
          <Route path='/AddDelivery' component={AddDelivery}/>
          <Route path='/GenReport' component={GenReport}/>
          <Route path='/Supplier' component={Supplier} />
          <Route path='/Delivery' component={Delivery} />
          <Route path='/' component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
