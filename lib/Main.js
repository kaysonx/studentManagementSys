const readline = require('readline');
const handleStudent = require('./handleStudent');
const handleClazz = require('./handleClazz');

let clazzs = [];
let state = 0;

const HINTS = {
    DEFAULT_INFO: '1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择（1~3）：',
    ADDITION_INFO: '请输入学生信息（格式：姓名,学号,名族,班级,学科:成绩,...\n',
    STU_INPUT_INFO: '请输入要打印的学生的学号（格式：学号，学号,...）\n',
    ADDITION_ERR_INFO: '请按正确的格式输入（格式：姓名,学号,名族,班级,学科:成绩,...\n',
    STU_INPUT_ERROR_INFO: '请按正确的格式输入要打印的学生的学号（格式：学号，学号,...）\n',
    QUIT_INFO: 'Bye!',
    ERROR_ORDER_INFO: '命令错误!请重新选择\n'
};

const STATE = {
    SHOW_ORDER: 0,
    ADD: 1,
    PRINT: 2,
    QUIT: 3
};

const ORDER = {
    ADD: '1',
    PRINT: '2',
    QUIT: '3'
};


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const entry = (outputInfo = HINTS.DEFAULT_INFO) => {
    rl.question(outputInfo, (input) => {
        if (state === STATE.QUIT) {
            rl.close();
            return;
        }
        entry(handleState(input));
    });
};

const handleState = (input) => {
    let router = {};
    switch (state) {
        case STATE.SHOW_ORDER:
            router = handleOrder(input);
            break;
        case STATE.ADD:
            router = addStudent(input);
            break;
        case STATE.PRINT:
            router = printClazz(input);
            break;
        case STATE.QUIT:
            return;
    }
    state = router.state;
    return router.hintInfo;
};

const handleOrder = (order) => {
    if (order === ORDER.ADD) {
        return {state: STATE.ADD, hintInfo: HINTS.ADDITION_INFO};
    }
    if (order === ORDER.PRINT) {
        return {state: STATE.PRINT, hintInfo: HINTS.STU_INPUT_INFO};
    }
    if (order === ORDER.QUIT) {
        return {state: STATE.QUIT, hintInfo: HINTS.QUIT_INFO};
    }
    return {state: STATE.SHOW_ORDER, hintInfo: HINTS.ERROR_ORDER_INFO + HINTS.DEFAULT_INFO};
};

const addStudent = (stuStrInfo) => {
    const student = handleStudent.getStudentInfo(stuStrInfo);
    if (student) {
        handleClazz.updateClazzs(clazzs, student);
        return {state: STATE.SHOW_ORDER, hintInfo: `学生${student.name}的成绩被添加\n` + HINTS.DEFAULT_INFO};
    } else {
        return {state: STATE.ADD, hintInfo: HINTS.ADDITION_ERR_INFO};
    }
};

const printClazz = (stuNoStrInfo) => {
    const stuClazzInfo = handleClazz.getClassInfo(clazzs, handleStudent.getStudentNo(stuNoStrInfo));
    if (stuClazzInfo.length === 0) {
        return {state: STATE.PRINT, hintInfo: HINTS.STU_INPUT_ERROR_INFO};
    } else {
        return {state: STATE.SHOW_ORDER, hintInfo: handleClazz.getPrintInfo(stuClazzInfo) + '\n' + HINTS.DEFAULT_INFO};
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