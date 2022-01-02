import appRoot from 'app-root-path';
import path from 'path';

const LOG_ROOT_DIR = process.env.LOG_ROOT_DIR || appRoot.resolve('logs');

export default {
	appenders: {
		console: { type: 'console' },
		application: {
			type: 'dateFile',
			filename: path.join(LOG_ROOT_DIR, './application.log'),
			pattern: 'yyyyMMdd',
			keepFileExt: true,
			daysToKeep: 7
		}
	},
	categories: {
		default: {
			appenders: ['console'],
			level: 'ALL'
		},
		application: {
			appenders: ['console', 'application'],
			level: 'INFO'
		}
	}
};
