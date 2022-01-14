import { Router } from 'express';

const router = Router();

router.get('/:id', async (req, res, next) => {
	const { pool, fsSql } = req.app.locals;
	const { id } = req.params;

	try {
		const [rows] = await pool.query(
			fsSql.readSync('tran_shops', 'SELECT_SHOP_DETAIL_BY_ID'),
			[id]
		);
		res.render('./shops/index.ejs', rows.shift());
	} catch (err) {
		next(err);
	}
});

export default router;
