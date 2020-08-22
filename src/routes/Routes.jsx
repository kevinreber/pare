import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Courses from '../components/courses/Courses';
import CourseInfo from '../components/courses/courseInfo/CourseInfo';
import StudyGroups from '../components/studyGroups/StudyGroups';
import StudyGroupChat from '../components/studyGroups/StudyGroupChat';
import Tutors from '../components/tutors/Tutors';
import UserProfile from '../components/user/UserProfile';

function Routes() {
	return (
		<>
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/courses' component={Courses} />
				<Route exact path='/courses/:courseId/' component={CourseInfo} />
				<Route exact path='/study-groups' component={StudyGroups} />
				<Route
					exact
					path='/study-groups/:studyGroupId'
					component={StudyGroupChat}
				/>
				<Route exact path='/tutors' component={Tutors} />
				<Route exact path='/users/:id' component={UserProfile} />
				<Redirect to='/login' />
			</Switch>
		</>
	);
}

export default Routes;
