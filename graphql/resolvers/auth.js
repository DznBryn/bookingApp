const bcrypt = require('bcryptjs');
const User = require('../../models/User');

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
};
