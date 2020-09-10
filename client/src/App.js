import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';
import Auth from './pages/Auth';

import './App.css';
import Bookings from './pages/Bookings';
import Events from './pages/Events';
import MainNav from './components/Navigation/MainNav';
import AuthContext from './context/authContext';

const App = () => {
	const [authenication, setAuthenication] = useState({
		token: null,
		userId: null,
	});
	const { token, userId } = authenication;
	AuthContext._currentValue.login = (userId, token) => {
		setAuthenication({ ...authenication, token, userId });
	};
	const logout = () => {
		setAuthenication({ ...authenication, token: null, userId: null });
	};

	return (
		<div className='App'>
			<Router>
				<AuthContext.Provider value={{ token, userId, logout }}>
					<MainNav AuthContext={AuthContext} />
					<main className='main-content'>
						<Switch>
							{!token && <Redirect from='/' to='/auth' exact />}
							{token && <Redirect from='/' to='/events' exact />}
							{token && <Redirect from='/auth' to='/events' exact />}
							{!token && <Route exact path='/auth' component={Auth} />}
							<Route exact path='/events' component={Events} />
							{token && <Route exact path='/bookings' component={Bookings} />}
							{!token && <Redirect from='*' to='/auth' exact />}
							{token && <Redirect from='*' to='/events' exact />}
						</Switch>
					</main>
				</AuthContext.Provider>
			</Router>
		</div>
	);
};

export default App;
