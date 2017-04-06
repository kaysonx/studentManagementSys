let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let StudentManagement = require('./ManagementController');
let {STATE} = require('./MessageCfg');

const port = 3000;
const studentManagement = new StudentManagement();

app.set('views', './view');
app.set('view engine', 'ejs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


app.get('/', (req, res) => {
    res.render('index', {data: studentManagement.hintInfo})
});

app.post('/', (req, res) => {
    if (studentManagement.state === STATE.QUIT) {
        res.render('index', {data: 'Bye!'})
    } else {
        studentManagement.handleState(req.body.input);
        res.render('index', {data: studentManagement.hintInfo})
    }
});

let server = app.listen(port, () => {
    console.log(`server is starting on ${port}`);
});