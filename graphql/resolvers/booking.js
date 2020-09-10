const Event = require('../../models/Event');
const Booking = require('../../models/Booking');
const { transformEvent, transformBooking } = require('./merge');

module.exports = {
	bookings: async (args, req) => {
		if (!req.isAuth) {
			throw new Error('User not Authorize');
		}
		try {
			const bookings = await Booking.find();
			return bookings.map((booking) => {
				return transformBooking(booking);
			});
		} catch (error) {
			throw error;
		}
	},
	bookEvent: async ({ eventId }, req) => {
		if (!req.isAuth) {
			throw new Error('User not Authorize');
		}
		try {
			const fetchEvent = await Event.findOne({ _id: eventId });
			const booking = new Booking({
				event: fetchEvent,
				user: req.userId,
			});
			await booking.save();
			return transformBooking(booking);
		} catch (error) {
			throw error;
		}
	},
	cancelBooking: async ({ bookingId }, req) => {
		if (!req.isAuth) {
			throw new Error('User not Authorize');
		}
		try {
			const booking = await Booking.findById(bookingId).populate('event');
			const event = transformEvent(booking.event);
			await Booking.deleteOne({ _id: bookingId });
			return event;
		} catch (error) {
			throw error;
		}
	},
};
