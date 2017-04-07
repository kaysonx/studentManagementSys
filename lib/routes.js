const ManagementService = require('./services/ManagementService');
const Student = require('./model/Student');
const Transform = require('./util/Transform');
const {HINTS} = require('./config/MessageCfg');
const managementServices = new ManagementService();

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index', {hintInfo: ''})
    });

    app.get('/addStudent', (req, res) => {
        res.render('addStudent')
    });

    app.post('/student', (req, res) => {
        let student = new Student(
            req.body.name, req.body.stuNo, req.body.nation, req.body.classNum,
            parseFloat(req.body.chinese), parseFloat(req.body.math),
            parseFloat(req.body.english), parseFloat(req.body.program));
        let addedStudent = managementServices.addStudent(student);
        if (addedStudent) {
            res.status(200).json({message:`学生${student.name}的成绩被添加`});
        } else {
            res.json({message:`error`});
        }
    });

    app.get('/printStudent', (req, res) => {
        res.render('printStudent')
    });

    app.post('/print', (req, res) => {
        console.log(req.body);
        let stuClazzInfo = managementServices.printClazz(req.body.stuNos);
        if (stuClazzInfo.length === 0) {
            res.status(400).json({studentInfo: HINTS.STU_INPUT_ERROR_INFO})
        }else{
            res.status(200).json({clazzInfo:stuClazzInfo})
        }
    });

    app.get('/class', (req, res) => {
       res.status(200).json({clazzInfo: managementServices.getAllClassInfo()})
    });

    app.get('/quit', (req, res) => {
        res.send('Bye!');
    });
};