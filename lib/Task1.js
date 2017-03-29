const readline = require('readline');


const getInput = (outputInfo = "please input data:")=> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let inputInfo = '';
    rl.question(outputInfo, (answer) => {
        console.log(answer);
        inputInfo = answer;
        rl.close();
    });
    return inputInfo;
};

const getStudentInfo = (strStu) => {
    let [name,stuNo,nation,classNum,chineseObj,mathObj,englishObj,programObj] = strStu.split(',');
    return {
        name:name,
        stuNo:stuNo,
        nation:nation,
        classNum:classNum,
        chinese:parseFloat(chineseObj.split(':')[1]),
        math:parseFloat(mathObj.split(':')[1]),
        english:parseFloat(englishObj.split(':')[1]),
        program:parseFloat(programObj.split(':')[1])
    }
}


module.exports = {
    getInput,
    getStudentInfo
}