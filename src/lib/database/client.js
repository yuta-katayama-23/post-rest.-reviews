import mysql from 'mysql2/promise';
import config from 'config';
import SqlQueryLoader from './sql-query-loader';

export const MySQLClient = async () => {
	const connection = await mysql.createConnection(config.get('mysql'));
	return connection;
};
export const loader = new SqlQueryLoader({
	path: 'src/lib/database/sqls'
});
