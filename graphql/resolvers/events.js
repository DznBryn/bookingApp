const User = require('../../models/User');
const Event = require('../../models/Event');
const { dateToString } = require('../../helpers/date');
const { transformEvent } = require('./merge');

module.exports = {
	events: async () => {
		try {
			const events = await Event.find().populate('creator');
			return events.map((event) => {
				return transformEvent(event);
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
	createEvent: async (
		{ createEventInput: { title, description, price, date } },
		req
	) => {
		if (!req.isAuth) {
			throw new Error('User not Authorize');
		}
		try {
			const creator = await User.findById(req.userId);

			if (!creator) {
				throw Error('user dont exist');
			}
			const event = new Event({
				title,
				description,
				price: +price,
				date: dateToString(date),
				creator: req.userId,
			});
			await event.save();

			creator.createdEvents.push(event);
			await creator.save();
			return transformEvent(event);
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};
