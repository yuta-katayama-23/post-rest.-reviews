import { AppLogger } from './logger';

export default () => {
	return (err, req, res, next) => {
		AppLogger.error(err.message);
		next(err);
	};
};
