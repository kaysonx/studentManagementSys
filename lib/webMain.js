const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ManagementService = require('./services/ManagementService');
const Student = require('./model/Student');
const Transform = require('./util/Transform');
const {HINTS} = require('./config/MessageCfg');

const port = 3000;
const managementServices = new ManagementService();

app.set('views', './view');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('index', {data: ''})
});

app.get('/add', (req, res) => {
    res.render('add', {hintInfo: ''})
});

app.post('/add', (req, res) => {
    let student = new Student(
        req.body.name, req.body.stuNo, req.body.nation, req.body.classNum,
        parseFloat(req.body.chinese), parseFloat(req.body.math),
        parseFloat(req.body.english), parseFloat(req.body.program));
    let addedStudent = managementServices.addStudent(student);
    if (addedStudent) {
        res.render('index', {data: `学生${student.name}的成绩被添加`})
    }else{
        res.render('add', {hintInfo: HINTS.ADDITION_ERR_INFO})
    }
});

app.get('/print', (req, res) => {
    res.render('print', {hintInfo: ''})
});

app.post('/print', (req, res) => {
    let stuClazzInfo = managementServices.printClazz(req.body.stuNos);
    if (stuClazzInfo.length === 0) {
        res.render('print', {hintInfo: HINTS.STU_INPUT_ERROR_INFO})
    }
    res.render('showClazz', {printInfo: Transform.getPrintInfo(stuClazzInfo)})
});

app.get('/quit', (req, res) => {
    res.send('Bye!');
});

let server = app.listen(port, () => {
    console.log(`server is starting on ${port}`);
});