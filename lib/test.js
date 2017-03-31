const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择（1~3）：'
});

rl.on('line', (answer) => {
    console.log('line',answer);
});
rl.question("question", (answer) => {
    console.log('question',answer);
});


console.log('.....after')