import React from 'react';
import { Link } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import useFields from '../../hooks/useFields';
import { Button } from '@material-ui/core';
import { auth, provider } from '../../config/fbConfig';

/** User Signup Form */
function Signup() {
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
					<label htmlFor='username' className='mate-text-primary float-left'>
						Username
					</label>
					<input
						id='username'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='username'
						value={formData.username}
					/>
				</div>
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
					<label htmlFor='phone' className='mate-text-primary float-left'>
						Phone
					</label>
					<input
						id='phone'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='email'
						value={formData.phone}
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
					<label
						htmlFor='confirmPassword'
						className='mate-text-primary float-left'>
						Confirm Password
					</label>
					<input
						id='confirmPassword'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='confirmPassword'
						value={formData.confirmPassword}
					/>
				</div>
				<div className='Login__buttons'>
					<button id='Login__btn'>Sign Up</button>
					<Button id='Login-Google__btn' onClick={signIn}>
						Sign Up With Google
					</Button>
				</div>
			</form>
			<p>
				Have an account?
				<Link to='/login' className='mate-text-primary ml-2'>
					Login
				</Link>
			</p>
		</div>
	);
}

export default Signup;
