import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import useFields from '../../hooks/useFields';
import { Button } from '@material-ui/core';
import '../styles/Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../../store/actions/auth';

/** User Login Form */
function Login() {
	const dispatch = useDispatch();

	/** Use history to redirect after user logs in/signs up */
	const history = useHistory();

	const currentUser = useSelector((state) => state.auth.user);

	if (currentUser) {
		history.push('/feed');
	}

	const INITIAL_STATE = {
		email: '',
		password: '',
	};

	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		// Clear state of form
		resetFormData();
	};

	/** if user signs in using Google, store their data to redux store
	 * and redirect to home page feed
	 */
	const googleSignIn = () => {
		dispatch(googleLogin());
		history.push('/feed');
	};

	return (
		<div className='Login__container'>
			<LoginHeader />
			<form className='Login__form mb-3' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='email' className='mate-text-primary float-left'>
						Email
					</label>
					<input
						id='email'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='email'
						value={formData.email}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password' className='mate-text-primary float-left'>
						Password
					</label>
					<input
						id='password'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='password'
						value={formData.password}
					/>
				</div>
				<div className='form-group'>
					<Link
						to='#'
						className='mate-text-secondary mb-3 text-sm float-right font-italic'>
						Forgot Password?
					</Link>
				</div>
				<div className='Login__buttons'>
					<button id='Login__btn'>Log In</button>
					<Button id='Login-Google__btn' onClick={googleSignIn}>
						Log In With Google
					</Button>
				</div>
			</form>
			<div className='Login-Footer'>
				<p>
					Don't have an account?
					<Link className='mate-text-primary ml-2' to='/signup'>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
