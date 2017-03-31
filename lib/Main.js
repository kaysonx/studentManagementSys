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

const entryWithQuestion = (outputInfo = HINTS.DEFAULT_INFO) => {
    if (state === STATE.QUIT) {
        rl.close();
        return;
    }
    rl.question(outputInfo, (input) => {
        entryWithQuestion(handleState(input));
    });
};

const entryWithOnLine = (outputInfo = HINTS.DEFAULT_INFO) =>{
    console.log(outputInfo);
    rl.on('line', (input) => {
        console.log(handleState(input));
        if (state === STATE.QUIT) {
            rl.close();
            return;
        }
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

// entryWithQuestion();
entryWithOnLine();