import express from 'express';
import appRoot from 'app-root-path';
import favicon from 'serve-favicon';
import router from './routes/index';

const port = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');
app.set('views', appRoot.resolve('src/views'));
app.disable('x-powered-by');

app.use(favicon(appRoot.resolve('src/public/favicon.ico')));
app.use('/public', express.static(appRoot.resolve('src/public')));

app.use('/', router);

app.listen(port, () => {
	console.log(`Application listening at ${port}`);
});
