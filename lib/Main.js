const readline = require('readline');
const {STATE} = require('./MessageCfg');
const StudentManagement = require('./StudentManagement');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const studentManagement = new StudentManagement();


const entryWithOnLine = () => {
    console.log(studentManagement.getIndexInfo());
    rl.on('line', (input) => {
        const {state, hintInfo} = studentManagement.handleState(input);
        if (state === STATE.QUIT) {
            rl.close();
        }
        console.log(hintInfo);
    });
};

const entryWithQuestion = (router = {state: 0, hintInfo: studentManagement.getIndexInfo()}) => {
    if (router.state === STATE.QUIT) {
        rl.close();
        return;
    }
    rl.question(router.hintInfo, (input) => {
        entryWithQuestion(studentManagement.handleState(input));
    });
};

entryWithQuestion();
