import React from 'react';
import { Link } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import useFields from '../../hooks/useFields';
import { Button } from '@material-ui/core';
import '../styles/Login.css';
import { auth, provider } from '../../config/fbConfig';

/** User Login Form */
function Login() {
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

	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => console.log(result))
			.catch((error) => alert(error.message));
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
					<Button id='Login-Google__btn' onClick={signIn}>
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
