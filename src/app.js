import 'source-map-support/register';
import express from 'express';
import appRoot from 'app-root-path';
import favicon from 'serve-favicon';
import mysql from 'mysql2/promise';
import config from 'config';
import router from './routes/index';
import { AppLogger } from './lib/logger/logger';
import applicationLogger from './lib/logger/application-logger';
import accessLogger from './lib/logger/access-logger';
import SqlQueryLoader from './lib/database/sql-query-loader';

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
	const queryLoader = new SqlQueryLoader({ path: 'src/lib/database/sqls' });
	const connect = await mysql.createConnection(config.get('mysql'));

	try {
		await connect.connect();
		const query = queryLoader.sqlSync('tran_shops', 'SELECT_SHOP_BASIC_BY_ID');
		const data = await connect.query(query);
		console.log(data);
	} catch (err) {
		next(err);
	} finally {
		await connect.end();
	}

	res.end('OK');
});

app.use(applicationLogger());

app.listen(port, () => {
	AppLogger.info(`Application listening at ${port}`);
});
