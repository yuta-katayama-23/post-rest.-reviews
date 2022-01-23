import { Router } from 'express';

const router = Router();

router.get('/regist/:shopId(\\d+)', async (req, res, next) => {
	const { pool, fsSql } = req.app.locals;
	const { shopId } = req.params;

	try {
		const [results] = await pool.query(
			fsSql.readSync('tran_shops', 'SELECT_SHOP_BASIC_BY_ID'),
			[shopId]
		);
		const shop = results.shift() || {};
		const shopName = shop.name;
		const review = {};
		res.render('./account/reviews/regist-form.ejs', {
			shopId,
			shopName,
			review
		});
	} catch (err) {
		next(err);
	}
});

export default router;
