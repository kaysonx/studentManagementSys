const readline = require('readline');
const handleStudent = require('./handleStudent');
const handleClazz = require('./handleClazz');

let clazzs = [];
let state = 0;

const mapInfo = {
    defaultInfo: '1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择（1~3）：',
    addStuInfo: '请输入学生信息（格式：姓名,学号,名族,班级,学科:成绩,...\n',
    printStuInfo: '请输入要打印的学生的学号（格式：学号，学号,...）\n',
    addErrInfo: '请按正确的格式输入（格式：姓名,学号,名族,班级,学科:成绩,...\n',
    printErrInfo: '请按正确的格式输入要打印的学生的学号（格式：学号，学号,...）\n',
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择（1~3）：'
});
const entry = (outputInfo = mapInfo.defaultInfo) => {
    rl.question(outputInfo, (input) => {
        switch (state) {
            case 0:
                if (input === '1') {
                    state = 1;
                    entry(mapInfo.addStuInfo);
                }
                if (input === '2') {
                    state = 2;
                    entry(mapInfo.printStuInfo);
                }
                if (input === '3') {
                    state = 3;
                    rl.close();
                } else {
                    entry();
                }
                break;
            case 1:
                const student = handleStudent.getStudentInfo(input);
                if (student === null) {
                    entry(mapInfo.addErrInfo);
                } else {
                    handleClazz.updateClazzs(clazzs, student);
                    console.log(`学生${student.name}的成绩被添加\n`);
                    state = 0;
                    entry();
                }
                break;
            case 2:
                const stuClazzInfo = handleClazz.getClassInfo(clazzs, handleStudent.getStudentNo(input));
                if (stuClazzInfo.length === 0) {
                    entry(mapInfo.printErrInfo);
                } else {
                    console.log(handleClazz.getPrintInfo(stuClazzInfo));
                    state = 0;
                    entry();
                }
                break;
        }
    });
};


const getInput = () => {
    rl.prompt();
    rl.on('line', (line) => {
        switch (line.trim()) {
            case '1':
                handleAddStudent(mapInfo.addStuInfo);
                break;
            case '2':
                handlePrintStuInfo(mapInfo.printStuInfo);
                break;
            case '3':
                rl.close();
                break;
            default:
                console.log(`error input:'${line.trim()}'`);
                rl.prompt();
                break;
        }
    });
};

const handleAddStudent = (outputInfo) => {
    rl.question(outputInfo, (studentStr) => {
        let student = handleStudent.getStudentInfo(studentStr);
        if (student === null) {
            handleAddStudent(mapInfo.addErrInfo);
        } else {
            handleClazz.updateClazzs(clazzs, student);
            console.log(`学生${student.name}的成绩被添加\n`);
            rl.prompt();
            return;
        }
    });
};

const handlePrintStuInfo = (outputInfo) => {
    rl.question(outputInfo, (stuNos) => {
        let stuClazzInfo = handleClazz.getClassInfo(clazzs, handleStudent.getStudentNo(stuNos));
        if (stuClazzInfo.length === 0) {
            handlePrintStuInfo(mapInfo.printErrInfo);
        } else {
            console.log(handleClazz.getPrintInfo(stuClazzInfo));
            rl.prompt();
            return;
        }
    });
};

getInput();

// entry();