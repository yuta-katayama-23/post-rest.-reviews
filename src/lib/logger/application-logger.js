import { AppLogger } from './logger';

// eslint-disable-next-line no-unused-vars
export default (options = {}) => {
	return (err, req, res, next) => {
		AppLogger.error(err.message);
		next(err);
	};
};
