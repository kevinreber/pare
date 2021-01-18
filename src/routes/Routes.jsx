/** Dependencies */
import React from 'react';
import { Switch } from 'react-router-dom';

/** Component Pages */
import { Notifications } from '../pages/Notifications';
import { Messages } from '../pages/Messages';
import { Feed } from '../pages/Feed';
import { PostInfo } from '../pages/PostInfo';
import { Search } from '../pages/Search';
import { Courses } from '../pages/Courses';
import { CourseInfo } from '../pages/CourseInfo';
import { StudyGroups } from '../pages/StudyGroups';
import { StudyGroupChat } from '../pages/StudyGroupChat';
import { Tutors } from '../pages/Tutors';
import { UserProfile } from '../pages/UserProfile';

/** Helpers */
import PrivateRoute from '../auth/PrivateRoute';

function Routes() {
	return (
		<>
			<Switch>
				<PrivateRoute exact path="/feed" component={Feed} />
				<PrivateRoute exact path="/messages" component={Notifications} />
				<PrivateRoute exact path="/messages/:messageId" component={Messages} />
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
			</Switch>
		</>
	);
}

export default Routes;
