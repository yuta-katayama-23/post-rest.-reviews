import { Router } from 'express';
import moment from 'moment';
import validateReq from '../lib/validate-req';

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

const validate = (req) => {
	const { visit, description } = req.body;
	const error = {};

	if (!visit) error.visit = '訪問日は必須です。';
	else if (moment(visit, DATE_FORMAT).isAfter(moment(new Date())))
		error.visit = '訪問日を未来の日付にする事はできません。';

	if (!description) error.description = '本文は必須です。';

	return error;
};

router.get('/regist/:shopId(\\d+)', validateReq(), async (req, res, next) => {
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

router.post('/regist/:shopId(\\d+)', validateReq(), async (req, res) => {
	const { shopId, shopName } = req.body;
	const review = createReviewData(req);

	res.render('./account/reviews/regist-form.ejs', {
		shopId,
		shopName,
		review
	});
});

router.post('/regist/confirm', validateReq(), async (req, res) => {
	const {
		session,
		body: { shopId, shopName },
		app: {
			locals: { tokens }
		}
	} = req;
	const error = validate(req);
	const review = createReviewData(req);

	if (Object.keys(error).length !== 0) {
		res.render('./account/reviews/regist-form.ejs', {
			error,
			shopId,
			shopName,
			review
		});
	}

	const secret = await tokens.secret();
	const token = tokens.create(secret);
	session.csrfSecret = secret;

	res.render('./account/reviews/regist-confirm.ejs', {
		shopId,
		shopName,
		review,
		token
	});
});

router.post(
	'/regist/execute',
	validateReq({ csrf: true }),
	async (req, res, next) => {
		const {
			body: { shopId, shopName },
			app: {
				locals: { createTransaction, fsSql }
			}
		} = req;

		const error = validate(req);
		const review = createReviewData(req);
		const userId = 1; // FIXME

		if (Object.keys(error).length !== 0) {
			res.render('./account/reviews/regist-form.ejs', {
				error,
				shopId,
				shopName,
				review
			});
		}

		const tran = createTransaction();
		try {
			await tran.begin();
			await tran.executeQuery(
				fsSql.readSync('tran_shops', 'SELECT_SHOP_BY_ID_FOR_UPDATE'),
				[shopId]
			);
			await tran.executeQuery(
				fsSql.readSync('tran_shops', 'INSERT_SHOP_REVIEW'),
				[shopId, userId, review.score, review.visit, review.description]
			);
			await tran.executeQuery(
				fsSql.readSync('tran_shops', 'UPDATE_SHOP_SCORE_BY_ID'),
				[shopId, shopId]
			);
			await tran.commit();
		} catch (err) {
			const rollbackErr = await tran.rollback();
			if (rollbackErr) next(rollbackErr);
			next(err);
		}

		res.redirect(`/account/reviews/regist/complete?shopId=${shopId}`);
	}
);

router.get('/regist/complete', (req, res) => {
	const { shopId } = req.query;
	res.render('./account/reviews/regist-complete.ejs', { shopId });
});

export default router;
