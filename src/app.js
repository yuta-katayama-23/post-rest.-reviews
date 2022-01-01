import express from 'express';
import appRoot from 'app-root-path';
import router from './routes/index';

const port = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');
app.set('views', appRoot.resolve('src/views'));

app.use('/', router);

app.listen(port, () => {
	console.log(`Application listening at ${port}`);
});
