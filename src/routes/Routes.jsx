/** Dependencies */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

/** Component Pages */
import Login from '../pages/Login/Login';
import Signup from '../pages/Login/Signup';
import Notifications from '../pages/Notifications/Notifications';
import Messages from '../pages/Messages/Messages';
import Feed from '../pages/Feed/Feed';
import PostInfo from '../pages/PostInfo/PostInfo';
import Search from '../pages/Search/Search';
import Courses from '../pages/Courses/Courses';
import CourseInfo from '../pages/CourseInfo/CourseInfo';
import StudyGroups from '../pages/StudyGroups/StudyGroups';
import StudyGroupChat from '../pages/StudyGroupChat/StudyGroupChat';
import Tutors from '../pages/Tutors/Tutors';
import UserProfile from '../pages/UserProfile/UserProfile';

/** Helpers */
import PrivateRoute from '../auth/PrivateRoute';

function Routes() {
	return (
		<>
			<Switch>
				<PrivateRoute exact path="/messages" component={Notifications} />
				<PrivateRoute exact path="/messages/:messageId" component={Messages} />
				<PrivateRoute exact path="/feed" component={Feed} />
				<PrivateRoute exact path="/post/:postId" component={PostInfo} />
				<PrivateRoute exact path="/search" component={Search} />
				<PrivateRoute exact path="/courses" component={Courses} />
				<PrivateRoute exact path="/courses/:courseId/" component={CourseInfo} />
				<PrivateRoute exact path="/study-groups" component={StudyGroups} />
				<PrivateRoute
					exact
					path="/study-groups/:studyGroupId"
					component={StudyGroupChat}
				/>
				<PrivateRoute exact path="/tutors" component={Tutors} />
				<PrivateRoute exact path="/users/:userId" component={UserProfile} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Redirect to="/login" />
			</Switch>
		</>
	);
}

export default Routes;
