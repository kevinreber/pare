import React from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../images/logo/pare-logo.png';
import PareGif from '../../images/gif/pare-gif.gif';
import { addFlashMessage } from '../../store/actions/flashMessages';
import { googleLogin, setCurrentUser } from '../../store/actions/auth';
import { getRandomID } from './constants/index';

/** User Login Form */
export function Login() {
	const dispatch = useDispatch();

	/** Use history to redirect after user logs in/signs up */
	const history = useHistory();

	const currentUser = useSelector((state) => state.auth.user);

	if (currentUser) {
		history.push('/feed');
	}

	/** if user signs in using Google, store their data to redux store
	 * and redirect to home page feed
	 */
	const googleSignIn = (e) => {
		e.preventDefault();
		dispatch(googleLogin());
		history.push('/feed');
	};

	const demoLogin = () => {
		const user = {
			uid: getRandomID(),
		};
		dispatch(setCurrentUser(user));
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'This is a demo account',
				type: 'success',
			})
		);
		console.log(user.uid, 'This is a demo');
	};

	return (
		<div className="Login__container">
			<div className="Login-Content fade-in-logo">
				<div className="Login__Gif hide-sm">
					<img className="Pare-Gif" src={PareGif} alt="Pare" />
				</div>
				<div className="Login-Form-Container">
					<div className="Signup-Header">
						<h3 className="Login-Header mate-text-primary font-italic">
							Welcome to Pare!
						</h3>
						<p className="Login-intro font-italic">
							Helping students connect academically and socially!
						</p>
						<div className="Pare-Logo">
							<img src={Logo} alt="Pare" />
						</div>
					</div>
					<div className="Login__Gif hide-md">
						<img className="Pare-Gif" src={PareGif} alt="Pare" />
					</div>
					<form className="Login__form mb-3" onSubmit={googleSignIn}>
						<div className="Login__buttons fade-in-delay">
							<button id="Login-Google__btn">Sign In With Google</button>
							<button id="Demo__btn" type="button" onClick={demoLogin}>
								Try Demo
							</button>
						</div>
					</form>
				</div>
			</div>
			<footer className="Login__Footer">
				<p className="font-italic">
					Built with 💛 by <a href="https://www.kevinreber.dev/">Kevin Reber</a>
				</p>
			</footer>
		</div>
	);
}
