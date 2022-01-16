import { Router } from 'express';

const router = Router();

router.get('/:id', async (req, res, next) => {
	const { pool, fsSql } = req.app.locals;
	const { id } = req.params;

	try {
		const [shopRows] = await pool.query(
			fsSql.readSync('tran_shops', 'SELECT_SHOP_DETAIL_BY_ID'),
			[id]
		);
		const [reviewRows] = await pool.query(
			fsSql.readSync('tran_shops', 'SELECT_SHOP_REVIEW_BY_SHOP_ID'),
			[id]
		);
		const data = shopRows.shift();
		data.reviews = reviewRows || [];
		res.render('./shops/index.ejs', data);
	} catch (err) {
		next(err);
	}
});

export default router;
