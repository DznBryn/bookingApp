import React, { Fragment, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './Event.css';
import Modal from '../components/Modals/Modal';
import Overlay from '../components/Overlay/Overlay';
import AuthContext from '../context/authContext';
const Events = () => {
	const [state, setstate] = useState(true);
	const [event, setEvent] = useState({
		title: '',
		description: '',
		price: 0.0,
		date: '',
	});
	const { title, description, price, date } = event;
	const [events, setEvents] = useState([]);

	const context = useContext(AuthContext);

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const body = JSON.stringify({
				query: `query { 
                    events{
		                _id
		                title
		                description
		                price
		                date
		                creator {
		                    _id
		                    email
		                }
		            } }`,
			});

			const res = await axios.post('/api', body, config);
			const events = res.data.data.events;
			setEvents(events);
			return console.log(res.data.data.events);
		} catch (error) {
			throw error;
		}
	};

	const onChange = (e) =>
		setEvent({ ...event, [e.target.name]: e.target.value });

	const onSubmit = async () => {
		setstate(!state);

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + context.token,
				},
			};

			const body = JSON.stringify({
				query: `mutation { createEvent(createEventInput: {
		                title:"${title}",
		                description:"${description}",
		                price:${price},
		                date:"${date}"
		            }){
		                _id
		                title
		                description
		                price
		                date
		                creator {
		                    _id
		                    email
		                }
		            } }`,
			});

			const res = await axios.post('/api', body, config);
			console.log(res);
			fetchEvents();
			return res;
		} catch (error) {
			throw error;
		}
	};
	return (
		<Fragment>
			{!state && (
				<Fragment>
					{' '}
					<Overlay />
					<Modal
						title='Add Event'
						canCancel
						canConfirm
						onCancel={() => setstate(!state)}
						onConfirm={() => onSubmit(event)}>
						<form>
							<div className='form-control'>
								<input
									type='text'
									id='title'
									placeholder='title'
									name='title'
									value={title}
									onChange={(e) => onChange(e)}
									required
								/>
							</div>
							<div className='form-control'>
								<input
									type='number'
									id='price'
									placeholder={0.0}
									name='price'
									value={price}
									onChange={(e) => onChange(e)}
									required
								/>
							</div>
							<div className='form-control'>
								<input
									type='datetime-local'
									id='date'
									name='date'
									value={date}
									onChange={(e) => onChange(e)}
									required
								/>
							</div>
							<div className='form-control'>
								<textarea
									type='text'
									id='description'
									rows='4'
									placeholder='description'
									name='description'
									value={description}
									onChange={(e) => onChange(e)}
									required></textarea>
							</div>
						</form>
					</Modal>
				</Fragment>
			)}
			{context.token && (
				<div className='events-control'>
					<p>Share your own Events!</p>
					<button className='btn' onClick={() => setstate(!state)}>
						Create Event
					</button>
				</div>
			)}
			<ul className='events__list'>
				{events.map((event) => (
					<li key={event._id} className='events__list-item'>
						<header>{event.title}</header>
						<p className='description'>{event.description}</p>
						<p>Price: ${event.price}</p>
					</li>
				))}
			</ul>
		</Fragment>
	);
};

export default Events;
