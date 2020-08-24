const Event = require('../../models/Event');
const User = require('../../models/User');
const { dateToString } = require('../../helpers/date');

const transformEvent = (event) => {
	return {
		...event._doc,
		_id: event.id,
		date: dateToString(event._doc.date),
		creator: user.bind(this, event.creator),
	};
};

const transformBooking = (booking) => {
	return {
		...booking._doc,
		_id: booking.id,
		event: getOneEvent.bind(this, booking._doc.event),
		user: user.bind(this, booking.user),
		createdAt: dateToString(booking._doc.createdAt),
		updatedAt: dateToString(booking._doc.updatedAt),
	};
};

const events = async (eventIds) => {
	try {
		const events = await Event.find({ _id: { $in: eventIds } });
		return events.map((event) => {
			return transformEvent(event);
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const getOneEvent = async (eventId) => {
	try {
		const event = await Event.findById(eventId);
		return transformEvent(event);
	} catch (error) {
		throw error;
	}
};

const user = async (userId) => {
	try {
		const existingUser = await User.findById(userId);

		return {
			...existingUser._doc,
			_id: existingUser.id,
			createdEvents: events.bind(this, existingUser._doc.createdEvents),
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;

