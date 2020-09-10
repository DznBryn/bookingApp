import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const MainNav = ({ AuthContext }) => (
	<AuthContext.Consumer>
		{(context) => {
			return (
				<header className='main-navigation'>
					<div className='main-navigation__logo'>
						<h1>EasyEvent</h1>
					</div>
					<nav className='main-navigation__items'>
						<ul>
							{!context.token && (
								<li>
									<NavLink to='/auth'>Authenticate</NavLink>
								</li>
							)}
							<li>
								<NavLink to='/events'>Events</NavLink>
							</li>

							{context.token && (
								<Fragment>
									<li>
										<NavLink to='/bookings'>Bookings</NavLink>
									</li>
									<li>
										<button onClick={context.logout}>Logout</button>
									</li>
								</Fragment>
							)}
						</ul>
					</nav>
				</header>
			);
		}}
	</AuthContext.Consumer>
);

export default MainNav;
