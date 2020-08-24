const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
	{
		event: {
			type: Schema.Types.ObjectId,
			ref: 'event',
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	// This will allow MONGO to add a createdAt and updatedAt field to when a user booked or update a booking
	{ timestamps: true }
);

module.exports = Booking = mongoose.model('booking', BookingSchema);
