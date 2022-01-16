import { Router } from 'express';

const router = Router();
const MAX_ITEMS = 5;

router.get('/', async (req, res, next) => {
	const { pool, fsSql } = req.app.locals;
	const keyword = req.query.keyword || '';
	const data = {};

	try {
		if (keyword) {
			const [results] = await pool.query(
				fsSql.readSync('tran_shops', 'SELECT_SHOP_LIST_BY_NAME'),
				[`%${keyword}%`, MAX_ITEMS]
			);
			data.shops = results;
		} else {
			const [results] = await pool.query(
				fsSql.readSync('tran_shops', 'SELECT_SHOP_HIGH_SCORE_LIST'),
				[MAX_ITEMS]
			);
			data.shops = results;
		}

		res.render('./search/list.ejs', data);
	} catch (err) {
		next(err);
	}
});

export default router;
