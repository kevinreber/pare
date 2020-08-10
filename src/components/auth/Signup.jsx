import React from 'react';
import { Link } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import useFields from '../../hooks/useFields';

/** User Signup Form */
function Signup() {
    const INITIAL_STATE = {
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    };

    const [formData, handleChange, resetFormData ] = useFields(INITIAL_STATE);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        // Clear state of form
        resetFormData();
    }

	return (
		<>
            <LoginHeader />
            <form className="container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor='username' className="mate-text-primary float-left">Username</label>
                    <input id='username' className="form-control mate-form-input" type='text' onChange={handleChange} name="username" value={formData.username}/>
                </div>
                <div className="form-group">
                    <label htmlFor='email' className="mate-text-primary float-left">Email</label>
                    <input id='email' className="form-control mate-form-input" type='text' onChange={handleChange} name="email" value={formData.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor='phone' className="mate-text-primary float-left">Phone</label>
                    <input id='phone' className="form-control mate-form-input" type='text' onChange={handleChange} name="email" value={formData.phone}/>
                </div>
                <div className="form-group">
                    <label htmlFor='password' className="mate-text-primary float-left">Password</label>
                    <input id='password' className="form-control mate-form-input" type='text' onChange={handleChange} name="password" value={formData.password}/>
                </div>
                <div className="form-group">
                    <label htmlFor='confirmPassword' className="mate-text-primary float-left">Confirm Password</label>
                    <input id='confirmPassword' className="form-control mate-form-input" type='text' onChange={handleChange} name="confirmPassword" value={formData.confirmPassword}/>
                </div>
                <button className="btn mate-btn w-100 mate-btn-primary">Sign Up</button>
            </form>
            <p>Have an account? <Link to="/login" className="mate-text-primary">Login</Link></p>
		</>
	);
}

export default Signup;