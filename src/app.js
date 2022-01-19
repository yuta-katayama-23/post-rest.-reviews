import 'source-map-support/register';
import express from 'express';
// import 'express-async-errors';
import appRoot from 'app-root-path';
import favicon from 'serve-favicon';
import moment from 'moment';
import router from './routes/index';
import shopsRouter from './routes/shops';
import searchRouter from './routes/search';
import { AppLogger } from './lib/logger/logger';
import applicationLogger from './lib/logger/application-logger';
import accessLogger from './lib/logger/access-logger';
import mysqlClient from './lib/database/client';
import { padding } from './lib/math/math';

const port = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');
app.set('views', appRoot.resolve('src/views'));
app.disable('x-powered-by');

mysqlClient(app);
app.use((req, res, next) => {
	res.locals.moment = moment;
	res.locals.padding = padding;
	next();
});

app.use(favicon(appRoot.resolve('src/public/favicon.ico')));
app.use('/public', express.static(appRoot.resolve('src/public')));

app.use(accessLogger());

app.get('/test', async (req, res, next) => {
	const { createTransaction } = req.app.locals;

	const tran = createTransaction();
	try {
		await tran.begin();
		await tran.executeQuery(
			'UPDATE tran_shop SET score=? WHERE id=?',
			[4.0, 1]
		);
		// throw new Error('Test Exceptions');
		await tran.commit();
		res.end('OK');
	} catch (err) {
		const rollbackErr = await tran.rollback();
		if (rollbackErr) next(rollbackErr);
		next(err);
	}
});

app.use('/', router);
app.use('/search', searchRouter);
app.use('/shops', shopsRouter);

app.use(applicationLogger());

app.listen(port, () => {
	AppLogger.info(`Application listening at ${port}`);
});
