import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	const { session } = req;
	session.login = true; // FIXME
	res.render('./index.ejs');
});

// eslint-disable-next-line no-unused-vars
router.get('/error', (req, res) => {
	throw new Error('test for application logger middleware');
});

export default router;
