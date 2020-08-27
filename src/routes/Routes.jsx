import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Notifications from '../pages/Notifications';
import Feed from '../pages/Feed';
import PostInfo from '../pages/PostInfo';
import Search from '../pages/Search';
import Courses from '../pages/Courses';
import CourseInfo from '../pages/CourseInfo';
import StudyGroups from '../pages/StudyGroups';
import StudyGroupChat from '../pages/StudyGroupChat';
import Tutors from '../pages/Tutors';
import UserProfile from '../pages/UserProfile';
import PrivateRoute from '../auth/PrivateRoute';

function Routes() {
	return (
		<>
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<PrivateRoute exact path='/notifications' component={Notifications} />
				<PrivateRoute exact path='/feed' component={Feed} />
				<PrivateRoute exact path='/post/:postId' component={PostInfo} />
				<PrivateRoute exact path='/search' component={Search} />
				<PrivateRoute exact path='/courses' component={Courses} />
				<PrivateRoute exact path='/courses/:courseId/' component={CourseInfo} />
				<PrivateRoute exact path='/study-groups' component={StudyGroups} />
				<PrivateRoute
					exact
					path='/study-groups/:studyGroupId'
					component={StudyGroupChat}
				/>
				<PrivateRoute exact path='/tutors' component={Tutors} />
				<PrivateRoute exact path='/users/:id' component={UserProfile} />
				<Redirect to='/login' />
			</Switch>
		</>
	);
}

export default Routes;
