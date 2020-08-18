import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Courses from '../components/courses/Courses';
import CourseInfo from '../components/courses/courseInfo/CourseInfo';
import Connect from '../components/connect/Connect';
import Tutors from '../components/tutors/Tutors';

function Routes() {
	return (
		<>
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/courses' component={Courses} />
				<Route exact path='/courses/:courseId/' component={CourseInfo} />
				<Route exact path='/connect' component={Connect} />
				<Route exact path='/tutors' component={Tutors} />

				<Redirect to='/login' />
			</Switch>
		</>
	);
}

export default Routes;
