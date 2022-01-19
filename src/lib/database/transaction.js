import pool from './pool';

export default class Transaction {
	constructor(connection) {
		this.connection = connection;
	}

	async begin() {
		if (this.connection) this.connection.release();
		this.connection = await pool.getConnection();
		this.connection.beginTransaction();
	}

	async executeQuery(query, values, options = {}) {
		const filedOption = options.fields || false;

		const [rows, fields] = await this.connection.query(query, values);
		return filedOption ? { rows, fields } : rows;
	}

	async commit() {
		await this.connection.commit();
		await this.connection.release();
		this.connection = null;
	}

	/**
	 * rollbackが失敗した場合でも、connectionは破棄する必要があるのでtry-catch
	 */
	async rollback() {
		try {
			await this.connection.rollback();
			return null;
		} catch (err) {
			return err;
		} finally {
			await this.connection.release();
			this.connection = null;
		}
	}
}
