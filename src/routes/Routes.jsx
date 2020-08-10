import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Classes from '../components/classes/Classes';
import Connect from '../components/connect/Connect';
import Tutor from '../components/tutor/Tutor';

function Routes() {
	return (
		<>
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/classes' component={Classes} />
				{/* <Route exact path='/classes/:classId/assignments' component={Assignments} /> */}
				<Route exact path='/connect' component={Connect} />
				<Route exact path='/tutor' component={Tutor} />

				<Redirect to='/login' />
			</Switch>
		</>
	);
}

export default Routes;
