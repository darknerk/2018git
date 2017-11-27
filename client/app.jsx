import './app/scss/app.scss'
//HashRouter as Router
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,hashHistory, Switch, Route,Link,Redirect,NavLink } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import VerificarAuth from './app/component/authservice/VerificarAuth'


import Inicio from './app/containers/inicio/inicio'
import LoginPrincipal from './app/containers/inicio/login'
import UserAll from './app/containers/api/userAll'
import Panel from './app/containers/panel/panel.jsx'

//const history = createBrowserHistory()


const  Error404= ({ location }) => (
  <div>
    <h3>No existe la ruta <code>{location.pathname}</code></h3>
  </div>
)

//history={history}
const BasicExample = () => (
  <HashRouter history={hashHistory} > 

      <Switch>
        <Route exact path="/" component={LoginPrincipal}></Route>
        <Route path="/panel" component={VerificarAuth(Panel)}/>

        <Route component={Error404}></Route>
      </Switch>

  </HashRouter> 
)



ReactDOM.render(
<BasicExample/>    ,
  document.getElementById('app')
);