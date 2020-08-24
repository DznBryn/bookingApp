const Event = require('../../models/Event');
const Booking = require('../../models/Booking');
const { transformEvent, transformBooking } = require('./merge');

module.exports = {
	bookings: async () => {
		try {
			const bookings = await Booking.find();
			return bookings.map((booking) => {
				return transformBooking(booking);
			});
		} catch (error) {
			throw error;
		}
	},
	bookEvent: async ({ eventId }) => {
		try {
			const fetchEvent = await Event.findOne({ _id: eventId });
			const booking = new Booking({
				event: fetchEvent,
				user: '5f42abe464f642db06f30453',
			});
			await booking.save();
			return transformBooking(booking);
		} catch (error) {
			throw error;
		}
	},
	cancelBooking: async ({ bookingId }) => {
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
