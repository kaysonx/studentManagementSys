const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

const port = 3000;

app.set('views', './view');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

routes(app);

let server = app.listen(port, () => {
    console.log(`server is starting on ${port}`);
});