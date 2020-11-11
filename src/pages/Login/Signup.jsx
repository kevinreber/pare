import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoginHeader from './components/LoginHeader/LoginHeader';
import useFields from '../../hooks/useFields';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../../store/actions/auth';

/** User Signup Form */
function Signup() {
	const dispatch = useDispatch();

	/** Use history to redirect after user logs in/signs up */
	const history = useHistory();

	const currentUser = useSelector((state) => state.auth.user);

	if (currentUser) {
		history.push('/feed');
	}

	const INITIAL_STATE = {
		username: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: '',
	};

	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		// Clear state of form
		resetFormData();
	};

	/** if user signs in using Google, store their data to redux store */
	const googleSignIn = () => {
		dispatch(googleLogin());
		history.push('/feed');
	};

	return (
		<div className="Login__container">
			<LoginHeader />
			<form className="Login__form mb-3" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username" className="mate-text-primary float-left">
						Username
					</label>
					<input
						id="username"
						className="form-control mate-form-input"
						type="text"
						onChange={handleChange}
						name="username"
						value={formData.username}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email" className="mate-text-primary float-left">
						Email
					</label>
					<input
						id="email"
						className="form-control mate-form-input"
						type="text"
						onChange={handleChange}
						name="email"
						value={formData.email}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="phone" className="mate-text-primary float-left">
						Phone
					</label>
					<input
						id="phone"
						className="form-control mate-form-input"
						type="text"
						onChange={handleChange}
						name="email"
						value={formData.phone}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password" className="mate-text-primary float-left">
						Password
					</label>
					<input
						id="password"
						className="form-control mate-form-input"
						type="text"
						onChange={handleChange}
						name="password"
						value={formData.password}
					/>
				</div>
				<div className="form-group">
					<label
						htmlFor="confirmPassword"
						className="mate-text-primary float-left">
						Confirm Password
					</label>
					<input
						id="confirmPassword"
						className="form-control mate-form-input"
						type="text"
						onChange={handleChange}
						name="confirmPassword"
						value={formData.confirmPassword}
					/>
				</div>
				<div className="Login__buttons">
					<button id="Login__btn">Sign Up</button>
					<Button id="Login-Google__btn" onClick={googleSignIn}>
						Sign Up With Google
					</Button>
				</div>
			</form>
			<p>
				Have an account?
				<Link to="/login" className="mate-text-primary ml-2">
					Login
				</Link>
			</p>
		</div>
	);
}

export default Signup;
