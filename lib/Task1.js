const readline = require('readline');

const getInput = (outputInfo = "please input data:") => {
};

const getStudentInfo = (strStu) => {
    let splitArr = strStu.split(',');
    if(splitArr.length !== 8){
        return null;
    }
    let [name, stuNo, nation, classNum, chineseObj, mathObj, englishObj, programObj] = splitArr;
    let resolveStudent =  {
        name: name,
        stuNo: stuNo,
        nation: nation,
        classNum: classNum,
        chinese: parseFloat(chineseObj.split(':')[1]),
        math: parseFloat(mathObj.split(':')[1]),
        english: parseFloat(englishObj.split(':')[1]),
        program: parseFloat(programObj.split(':')[1])
    };
    return resolveStudent;
};

const countStudentScore = (student) => {
    let totalScore = student.math + student.chinese + student.english + student.program;
    let aveScore = totalScore / 4;
    return Object.assign({}, student, {aveScore: aveScore, totalScore: totalScore});
};

const countClassScore = (clazz) => {
    let stuScores = clazz.stuScore;
    let classAveScore = stuScores.reduce((acc, stu) => acc + stu.totalScore, 0) / stuScores.length;
    let scores = stuScores.map(stu => stu.totalScore);
    let classMidScore = getMidScore(scores);
    return Object.assign({}, clazz, {classAveScore: classAveScore, classMidScore: classMidScore});
};

const getMidScore = (scores) => {
    const length = scores.length;
    scores.sort((a, b) => a - b);
    if (length % 2 === 0) {
        let midIndex = (length / 2) - 1;
        return (scores[midIndex] + scores[midIndex + 1]) / 2;
    } else {
        let midIndex = Math.ceil(length / 2 - 1);
        return scores[midIndex];
    }
};

const updateClazzs = (sourceClazzs, student) => {
    Object.assign(student,countStudentScore(student));
    let [searchClazz] = sourceClazzs.filter(c => c.stuScore.filter(stu => stu.stuNo === student.stuNo).length > 0);
    if (searchClazz !== undefined) {
        updateStudent(searchClazz, student);
    }
    else {
        addStudent(sourceClazzs, student);
    }
    return sourceClazzs;
};

const updateStudent = (clazz, student) => {
    clazz.stuScore = clazz.stuScore.map(stu =>
        stu.stuNo === student.stuNo ? student : stu
    );
    Object.assign(clazz, countClassScore(clazz));
};


const addStudent = (sourceClazzs, student) => {
    let [clazz] = sourceClazzs.filter(c => c.classNum === student.classNum);
    if (clazz === undefined) {
        sourceClazzs.push({
            classNum: student.classNum,
            stuScore: [student],
            classAveScore: student.totalScore,
            classMidScore: student.totalScore
        });
    } else {
        clazz.stuScore.push(student);
        Object.assign(clazz, countClassScore(clazz));
    }
};


module.exports = {
    getInput,
    getStudentInfo,
    countStudentScore,
    countClassScore,
    updateClazzs
};