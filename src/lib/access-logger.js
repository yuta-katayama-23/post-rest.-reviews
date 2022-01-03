import log4js from 'log4js';
import { AccessLogger } from './logger';

const DEFAULT_LOG_LEBEL = 'auto';

export default (options = {}) => {
	const opts = options;
	opts.level = options.level || DEFAULT_LOG_LEBEL;

	return log4js.connectLogger(AccessLogger, opts);
};
