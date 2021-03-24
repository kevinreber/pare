/** Dependencies */
import React, { lazy, Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';

/** Component Pages */
// import { Notifications } from '../pages/Notifications';
// import { Messages } from '../pages/Messages';
// import { Feed } from '../pages/Feed';
// import { PostInfo } from '../pages/PostInfo';
// import { Search } from '../pages/Search';
// import { Courses } from '../pages/Courses';
// import { CourseInfo } from '../pages/CourseInfo';
// import { StudyGroups } from '../pages/StudyGroups';
// import { StudyGroupChat } from '../pages/StudyGroupChat';
// import { Tutors } from '../pages/Tutors';
// import { UserProfile } from '../pages/UserProfile';

/** Components */
import Loader from '../components/layout/Loader/Loader';

/** Helpers */
import PrivateRoute from '../auth/PrivateRoute';

/** Component Pages */
const Notifications = lazy(() =>
	import('../pages/Notifications').then((module) => ({
		default: module.Notifications,
	}))
);

const Messages = lazy(() =>
	import('../pages/Messages').then((module) => ({ default: module.Messages }))
);

const Feed = lazy(() =>
	import('../pages/Feed').then((module) => ({ default: module.Feed }))
);

const PostInfo = lazy(() =>
	import('../pages/PostInfo').then((module) => ({ default: module.PostInfo }))
);

const Search = lazy(() =>
	import('../pages/Search').then((module) => ({ default: module.Search }))
);

const Courses = lazy(() =>
	import('../pages/Courses').then((module) => ({ default: module.Courses }))
);

const CourseInfo = lazy(() =>
	import('../pages/CourseInfo').then((module) => ({
		default: module.CourseInfo,
	}))
);

const StudyGroups = lazy(() =>
	import('../pages/StudyGroups').then((module) => ({
		default: module.StudyGroups,
	}))
);

const StudyGroupChat = lazy(() =>
	import('../pages/StudyGroupChat').then((module) => ({
		default: module.StudyGroupChat,
	}))
);

const Tutors = lazy(() =>
	import('../pages/Tutors').then((module) => ({ default: module.Tutors }))
);

const UserProfile = lazy(() =>
	import('../pages/UserProfile').then((module) => ({
		default: module.UserProfile,
	}))
);

// const PrivateRoute = lazy(() =>
// 	import('../auth/PrivateRoute').then((module) => ({
// 		default: module.PrivateRoute,
// 	}))
// );

function Routes() {
	return (
		<>
			<Suspense fallback={<Loader />}>
				<Switch>
					<PrivateRoute exact path="/feed" component={Feed} />
					<PrivateRoute exact path="/messages" component={Notifications} />
					<PrivateRoute
						exact
						path="/messages/:messageId"
						component={Messages}
					/>
					<PrivateRoute exact path="/post/:postId" component={PostInfo} />
					<PrivateRoute exact path="/search" component={Search} />
					<PrivateRoute exact path="/courses" component={Courses} />
					<PrivateRoute
						exact
						path="/courses/:courseId/"
						component={CourseInfo}
					/>
					<PrivateRoute exact path="/study-groups" component={StudyGroups} />
					<PrivateRoute
						exact
						path="/study-groups/:studyGroupId"
						component={StudyGroupChat}
					/>
					<PrivateRoute exact path="/tutors" component={Tutors} />
					<PrivateRoute exact path="/users/:userId" component={UserProfile} />
					<Redirect to="/feed" />
				</Switch>
			</Suspense>
		</>
	);
}

export default Routes;
