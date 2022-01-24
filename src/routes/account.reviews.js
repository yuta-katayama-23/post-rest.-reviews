import { Router } from 'express';
import moment from 'moment';

const router = Router();
const DATE_FORMAT = 'YYYY/MM/DD';

const createReviewData = (req) => {
	const { shopId, visit, score, description } = req.body;
	const date = moment(visit, DATE_FORMAT);

	const review = {
		shopId,
		score: parseFloat(score),
		visit: date.isValid() ? date.toDate() : null,
		post: new Date(),
		description
	};
	return review;
};

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

router.post('/regist/confirm', async (req, res) => {
	const { shopId, shopName } = req.body;
	const review = createReviewData(req);

	res.render('./account/reviews/regist-confirm.ejs', {
		shopId,
		shopName,
		review
	});
});

router.post('/regist/:shopId(\\d+)', async (req, res) => {
	const { shopId, shopName } = req.body;
	const review = createReviewData(req);

	res.render('./account/reviews/regist-form.ejs', { shopId, shopName, review });
});

export default router;
