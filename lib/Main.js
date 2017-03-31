const readline = require('readline');
const handleStudent = require('./handleStudent');
const handleClazz = require('./handleClazz');
const {HINTS, STATE, ORDER} = require('./MessageCfg');

let clazzs = [];
let state = 0;


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const entry = (outputInfo = HINTS.DEFAULT_INFO) => {
    if (state === STATE.QUIT) {
        rl.close();
        return;
    }
    rl.question(outputInfo, (input) => {
        entry(handleState(input));
    });
};

const handleState = (userInput) => {
    let router = {};
    switch (state) {
        case STATE.SHOW_ORDER:
            router = handleOrder(userInput);
            break;
        case STATE.ADD:
            router = addStudent(userInput);
            break;
        case STATE.PRINT:
            router = printClazz(userInput);
            break;
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