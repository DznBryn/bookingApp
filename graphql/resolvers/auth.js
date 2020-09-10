const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { Token } = require('graphql');

module.exports = {
	createUser: async ({ userInput: { email, password } }) => {
		try {
			let user = await User.findOne({ email });
			if (user) {
				throw new Error('User Exist.');
			}

			const salt = await bcrypt.genSalt(12);

			user = new User({
				email,
				password: await bcrypt.hash(password, salt),
			});
			await user.save();

			return { ...user._doc, password: null };
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
	login: async ({ email, password }) => {
		const user = await User.findOne({ email });

		if (!user) {
			throw new Error('Invalid Creditials');
		}

		const isMatched = await bcrypt.compare(password, user.password);

		if (!isMatched) {
			throw new Error('Invalid Creditials');
		}

		const token = jwt.sign({ userId: user.id }, process.env.jwtSecret, {
			expiresIn: '1h',
		});

		return {
			userId: user.id,
			token,
			tokenExpiration: 1,
		};
	},
};
