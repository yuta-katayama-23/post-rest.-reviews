import log4js from 'log4js';
import config from '../../config/log4js.config';

log4js.configure(config);

export const DefaultLogger = log4js.getLogger();
export const AppLogger = log4js.getLogger('application');
export const AccessLogger = log4js.getLogger('access');
