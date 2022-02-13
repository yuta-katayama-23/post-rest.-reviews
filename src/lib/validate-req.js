export default () => {
	return (req, res, next) => {
		const { session } = req;

		if (!session.id || !session.login)
			next(new Error('You should be logged in.'));

		next();
	};
};
