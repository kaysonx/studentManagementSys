const readline = require('readline');
const handleStudent = require('./handleStudent');
const handleClazz = require('./handleClazz');

let clazzs = [];
let state = 0;

const HINTS_MAP = {
    DEFAULT_INFO: '1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择（1~3）：',
    ADDITION_INFO: '请输入学生信息（格式：姓名,学号,名族,班级,学科:成绩,...\n',
    STU_INPUT_INFO: '请输入要打印的学生的学号（格式：学号，学号,...）\n',
    ADDITION_ERR_INFO: '请按正确的格式输入（格式：姓名,学号,名族,班级,学科:成绩,...\n',
    STU_INPUT_ERROR_INFO: '请按正确的格式输入要打印的学生的学号（格式：学号，学号,...）\n',
};

const STATE_ORDER = 0;
const STATE_ADD = 1;
const STATE_PRINT = 2;

const ORDER_ADD = '1';
const ORDER_PRINT = '2';
const ORDER_QUIT = '3';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const entry = (outputInfo = HINTS_MAP.DEFAULT_INFO) => {
    rl.question(outputInfo, (input) => {
        switch (state) {
            case STATE_ORDER:
                handleMainOrder(input, entry);
                break;
            case STATE_ADD:
                addStudent(input, entry);
                break;
            case STATE_PRINT:
                printClazz(input, entry);
                break;
        }
    });
};

const handleMainOrder = (order, callback) => {
    if (order === ORDER_ADD) {
        state = STATE_ADD;
        callback(HINTS_MAP.ADDITION_INFO);
    }
    if (order === ORDER_PRINT) {
        state = STATE_PRINT;
        callback(HINTS_MAP.STU_INPUT_INFO);
    }
    if (order === ORDER_QUIT) {
        rl.close();
    } else {
        callback();
    }
};

const addStudent = (stuStrInfo, callback) => {
    const student = handleStudent.getStudentInfo(stuStrInfo);
    if (student === null) {
        callback(HINTS_MAP.ADDITION_ERR_INFO);
    } else {
        handleClazz.updateClazzs(clazzs, student);
        console.log(`学生${student.name}的成绩被添加\n`);
        state = STATE_ORDER;
        callback();
    }
};

const printClazz = (stuNoStrInfo, callback) => {
    const stuClazzInfo = handleClazz.getClassInfo(clazzs, handleStudent.getStudentNo(stuNoStrInfo));
    if (stuClazzInfo.length === 0) {
        callback(HINTS_MAP.STU_INPUT_ERROR_INFO);
    } else {
        console.log(handleClazz.getPrintInfo(stuClazzInfo));
        state = STATE_ORDER;
        callback();
    }
};

entry();

// prompt: '1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择（1~3）：'
// const getInput = () => {
//     rl.prompt();
//     rl.on('line', (line) => {
//         switch (line.trim()) {
//             case '1':
//                 handleAddStudent(HINTS_MAP.ADDITION_INFO);
//                 break;
//             case '2':
//                 handlePrintStuInfo(HINTS_MAP.STU_INPUT_INFO);
//                 break;
//             case '3':
//                 rl.close();
//                 break;
//             default:
//                 console.log(`error input:'${line.trim()}'`);
//                 rl.prompt();
//                 break;
//         }
//     });
// };
//
// const handleAddStudent = (outputInfo) => {
//     rl.question(outputInfo, (studentStr) => {
//         let student = handleStudent.getStudentInfo(studentStr);
//         if (student === null) {
//             handleAddStudent(HINTS_MAP.ADDITION_ERR_INFO);
//         } else {
//             handleClazz.updateClazzs(clazzs, student);
//             console.log(`学生${student.name}的成绩被添加\n`);
//             rl.prompt();
//             return;
//         }
//     });
// };
//
// const handlePrintStuInfo = (outputInfo) => {
//     rl.question(outputInfo, (stuNos) => {
//         let stuClazzInfo = handleClazz.getClassInfo(clazzs, handleStudent.getStudentNo(stuNos));
//         if (stuClazzInfo.length === 0) {
//             handlePrintStuInfo(HINTS_MAP.STU_INPUT_ERROR_INFO);
//         } else {
//             console.log(handleClazz.getPrintInfo(stuClazzInfo));
//             rl.prompt();
//             return;
//         }
//     });
// };
// getInput();