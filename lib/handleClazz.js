const handleStudent = require('./handleStudent');

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
    Object.assign(student, handleStudent.countStudentScore(student));
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


const getClassInfo = (sourceClazzs, stuNos) => {
    let stuClazzs = [];
    stuNos.forEach(stuNo => {
        let [searchClazz] = sourceClazzs.filter(clazz => clazz.stuScore.filter(stu => stu.stuNo === stuNo).length > 0);
        if (searchClazz !== undefined && !stuClazzs.includes(searchClazz)) {
            stuClazzs.push(searchClazz);
        }
    });
    return stuClazzs;
};

const getPrintInfo = (clazzs) => {
    let clazzsStrInfo = `成绩单`;
    clazzs.forEach(clazz => {
        clazzsStrInfo += `\n姓名|数学|语文|英语|编程|平均分|总分\n==============================`;
        clazz.stuScore.forEach(stu => {
            clazzsStrInfo += `\n${stu.name}|${stu.math}|${stu.chinese}|${stu.english}|${stu.program}|${stu.aveScore}|${stu.totalScore}`;

        });
        clazzsStrInfo += `\n==============================\n全班平均分：${clazz.classAveScore.toFixed(2)}\n全班中位分：${clazz.classMidScore.toFixed(2)}`
    });
    return clazzsStrInfo;
};

module.exports = {
    countClassScore,
    updateClazzs,
    getPrintInfo,
    getClassInfo,
    getMidScore
};