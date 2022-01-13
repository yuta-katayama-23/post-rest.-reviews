import log4js from 'log4js';
import config from '../../../config/log4js.config';

log4js.configure(config);

const DefaultLogger = log4js.getLogger();
const AppLogger = log4js.getLogger('application');
const AccessLogger = log4js.getLogger('access');

export { AccessLogger, DefaultLogger, AppLogger };
