import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import ClassList from '../components/ClassList';

function Routes() {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/classes' component={ClassList} />
				<Redirect to='/' />
			</Switch>
		</>
	);
}

export default Routes;
