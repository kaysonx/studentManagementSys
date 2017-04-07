const readline = require('readline');
const {STATE} = require('./MessageCfg');
const StudentManagement = require('./StudentManagement');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const studentManagement = new StudentManagement();


const entryWithOnLine = () => {
    console.log(studentManagement.hintInfo);
    rl.on('line', (input) => {
        studentManagement.handleState(input);
        if (studentManagement.state === STATE.QUIT) {
            rl.close();
        }
        console.log(studentManagement.hintInfo);
    });
};

const entryWithQuestion = () => {
    if (studentManagement.state === STATE.QUIT) {
        rl.close();
        return;
    }
    rl.question(studentManagement.hintInfo, (input) => {
        entryWithQuestion(studentManagement.handleState(input));
    });
};

entryWithQuestion();
