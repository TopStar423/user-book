import React, { useEffect, useContext } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { Context } from './Store';
import Login from './screens/Login';
import Register from './screens/Register';
import Users from './screens/Users';
import './App.scss';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
      <Route {...rest} render={(props) => (
          isAuthenticated === true
              ? <Component {...props} />
              : <Redirect to={{
                pathname: '/admin/login',
                state: { from: props.location }
              }} />
      )} />
  )
}

const App = () => {

    const [state, dispatch] = useContext(Context);

    const { isAuthenticated } = state;

    return (
        <div className="app-container">
            <Router>
                <Switch>
                    <Route path="/login" component={() => <Login />} />
                    <Route path="/register" component={() => <Register />} />
                    <PrivateRoute
                        isAuthenticated={isAuthenticated}
                        path="/users"
                        component={Users}
                    />
                    {isAuthenticated ?
                        <Redirect to="/users" />
                        :
                        <Redirect to="/login" />
                    }
                </Switch>
            </Router>
        </div>
    );
}

export default App;
