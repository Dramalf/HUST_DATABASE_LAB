import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import store from './redux/store'
import {Provider} from 'react-redux'
import './index.css';
import { mainRoutes } from './routes'
import App from './App'
import 'antd-mobile/dist/antd-mobile.css';
ReactDOM.render(
  <Provider store={store} >
 <Router> 
    <Switch >
      <Route path='/view' render={routeProps => <App {...routeProps} />} />
        {mainRoutes.map(route => {
      return <Route key={route.path}  {...route}/>
    })} 
      <Redirect to='/login' /> 
      <Redirect to='/404'/>  
</Switch> 
  </Router>
  </Provider>
 ,
  document.getElementById('root')
); 

