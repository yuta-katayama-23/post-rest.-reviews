import { Router } from 'express';
import config from 'config';

const router = Router();
const MAX_ITEMS_PER_PAGE = config.get('app.max_search');

router.get('/', async (req, res, next) => {
	const { pool, fsSql } = req.app.locals;
	const page = req.query.page ? parseInt(req.query.page, 10) : 1;
	const keyword = req.query.keyword || '';

	const offset = (page - 1) * MAX_ITEMS_PER_PAGE;
	const limit = MAX_ITEMS_PER_PAGE;

	try {
		let shops;
		let count;
		if (keyword) {
			const [cnt] = await pool.query(
				fsSql.readSync('tran_shops', 'COUNT_SHOP_BY_NAME'),
				[`%${keyword}%`]
			);
			count = cnt.shift().count;

			const [results] = await pool.query(
				fsSql.readSync('tran_shops', 'SELECT_SHOP_LIST_BY_NAME'),
				[`%${keyword}%`, offset, limit]
			);
			shops = results;
		} else {
			const [cnt] = await pool.query(
				fsSql.readSync('tran_shops', 'COUNT_SHOP')
			);
			count = cnt.shift().count;

			const [results] = await pool.query(
				fsSql.readSync('tran_shops', 'SELECT_SHOP_HIGH_SCORE_LIST'),
				[offset, limit]
			);
			shops = results;
		}

		res.render('./search/list.ejs', {
			shops,
			keyword,
			count,
			pagenation: {
				max: Math.ceil(count / MAX_ITEMS_PER_PAGE),
				current: page
			}
		});
	} catch (err) {
		next(err);
	}
});

export default router;
