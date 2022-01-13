import SqlQueryLoader from './sql-query-loader';
import pool from './pool';

export default (appOrigin) => {
	const app = appOrigin;

	app.locals.pool = pool;
	app.locals.fsSql = new SqlQueryLoader({
		path: 'src/lib/database/sqls'
	});
};
