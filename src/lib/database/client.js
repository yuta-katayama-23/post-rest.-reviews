import SqlQueryLoader from './sql-query-loader';
import pool from './pool';

const executeQuery = async (query = '', values = []) => {
	const results = await pool.query(query, values);
	return results;
};
const loader = new SqlQueryLoader({
	path: 'src/lib/database/sqls'
});

export { executeQuery, loader };
