export default (option = {}) => {
	return (req, res, next) => {
		const {
			session,
			body: { token },
			app: {
				locals: { tokens }
			}
		} = req;

		if (!session.id || !session.login)
			next(new Error('You should be logged in.'));

		if (option.csrf && !tokens.verify(session.csrfSecret, token))
			next(new Error('Invalid Token.'));
		else delete session.csrfSecret;

		next();
	};
};
