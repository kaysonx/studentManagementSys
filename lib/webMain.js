let express = require('express');
let app = express();
let StudentManagement = require('./StudentManagement');

const port = 3000;
const studentManagement = new StudentManagement();

app.set('views','./view');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {data:studentManagement.hintInfo})
});

app.post('/', (req, res) => {

});

let server = app.listen(port,() => {
   console.log(`server is starting on ${port}`);
});