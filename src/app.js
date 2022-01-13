import 'source-map-support/register';
import express from 'express';
import appRoot from 'app-root-path';
import favicon from 'serve-favicon';
import router from './routes/index';
import { AppLogger } from './lib/logger/logger';
import applicationLogger from './lib/logger/application-logger';
import accessLogger from './lib/logger/access-logger';
import { executeQuery, loader } from './lib/database/client';

const port = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');
app.set('views', appRoot.resolve('src/views'));
app.disable('x-powered-by');

app.use(favicon(appRoot.resolve('src/public/favicon.ico')));
app.use('/public', express.static(appRoot.resolve('src/public')));

app.use(accessLogger());

app.use('/', router);

app.use('/test', async (req, res, next) => {
	try {
		const data = await executeQuery(
			loader.sqlSync('tran_shops', 'SELECT_SHOP_BASIC_BY_ID'),
			[1]
		);
		console.log(data);
	} catch (err) {
		next(err);
	}

	res.end('OK');
});

app.use(applicationLogger());

app.listen(port, () => {
	AppLogger.info(`Application listening at ${port}`);
});
