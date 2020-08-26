import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Feed from '../pages/Feed';
import PostInfo from '../pages/PostInfo';
import Search from '../pages/Search';
import Courses from '../pages/Courses';
import CourseInfo from '../pages/CourseInfo';
import StudyGroups from '../pages/StudyGroups';
import StudyGroupChat from '../pages/StudyGroupChat';
import Tutors from '../pages/Tutors';
import UserProfile from '../pages/UserProfile';

function Routes() {
	return (
		<>
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/feed' component={Feed} />
				<Route exact path='/post/:postId' component={PostInfo} />
				<Route exact path='/search' component={Search} />
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
