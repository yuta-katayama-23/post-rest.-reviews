import config from 'config';
import axios from 'axios';

export default (option = {}) => {
	return async (req, res, next) => {
		const {
			session
			// body: { token },
			// app: {
			// 	locals: { tokens }
			// }
		} = req;

		if (!session.id || !session.login)
			next(new Error('You should be logged in.'));

		// if (option.csrf && !tokens.verify(session.csrfSecret, token))
		// 	next(new Error('Invalid Token.'));
		// else delete session.csrfSecret;

		if (option.csrf) {
			const params = new URLSearchParams();
			params.append('secret', process.env.RECAPCHA_SECRET);
			params.append('response', req.body['g-recaptcha-response']);
			try {
				const {
					data: { success }
				} = await axios.post(config.get('reCaptchaVerify'), params);
				if (!success) next(new Error('Invalid Request by reCAPTCHA.'));
			} catch (error) {
				next(error);
			}
		}

		next();
	};
};
