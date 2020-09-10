import React, { useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/authContext';
const Auth = () => {
	const [state, setstate] = useState({
		email: '',
		password: '',
	});

	const contextType = AuthContext;

	const { email, password } = state;

	const [isLogin, setIsLogin] = useState(true);

	const onChange = (e) => {
		setstate({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (email.trim() === '' || password.trim() === '') {
			return console.log('Fields are left blank');
		}

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			let body;

			if (!isLogin) {
				body = JSON.stringify({
					query: `mutation { createUser(userInput: {email:"${email}", password:"${password}"} ){ _id email } }`,
				});
			} else {
				body = JSON.stringify({
					query: `query { login(email:"${email}", password:"${password}" ){ userId token } }`,
				});
			}

			const res = await axios.post('/api', body, config);

			if (res.data.data.login.token) {
				contextType._currentValue.login(
					res.data.data.login.userId,
					res.data.data.login.token
				);
			}

			return console.log(contextType);
		} catch (error) {
			throw error;
		}
	};

	return (
		<form className='auth-form' onSubmit={(e) => onSubmit(e)}>
			<div className='form-control'>
				<input
					type='email'
					id='email'
					name='email'
					value={email}
					onChange={(e) => onChange(e)}
				/>
			</div>
			<div className='form-control'>
				<input
					type='password'
					id='password'
					name='password'
					value={password}
					onChange={(e) => onChange(e)}
				/>
			</div>
			<div className='form-actions'>
				<button type='button' onClick={() => setIsLogin(!isLogin)}>
					Switch to {isLogin ? 'Sign Up' : 'Login'}
				</button>
				<button type='submit'>Submit</button>
			</div>
		</form>
	);
};

export default Auth;
