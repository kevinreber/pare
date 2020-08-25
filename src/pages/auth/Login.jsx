import React from 'react';
import { Link } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import useFields from '../../hooks/useFields';

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

	return (
		<>
			<LoginHeader />
			<form className='container mb-3' onSubmit={handleSubmit}>
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
						className='mate-text-secondary text-sm float-right font-italic'>
						Forgot Password?
					</Link>
				</div>
				<button className='btn mate-btn w-100 mate-btn-primary'>Log In</button>
			</form>
			<div className='Login-Footer d-flex justify-content-center'>
				<p>
					Have an account?{' '}
					<Link className='mate-text-primary' to='/signup'>
						Sign Up
					</Link>{' '}
				</p>
			</div>
		</>
	);
}

export default Login;
