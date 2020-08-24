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
	createEvent: async ({
		createEventInput: { title, description, price, date },
	}) => {
		try {
			const creator = await User.findById('5f42abe464f642db06f30453');

			if (!creator) {
				throw Error('user dont exist');
			}
			const event = new Event({
				title,
				description,
				price: +price,
				date: dateToString(date),
				creator: '5f42abe464f642db06f30453',
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
