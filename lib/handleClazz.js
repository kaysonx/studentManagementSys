const handleStudent = require('./handleStudent');

const updateClassScore = (clazz) => {
    let stuScores = clazz.stuScore;
    let classAverageScore = stuScores.reduce((acc, stu) => acc + stu.totalScore, 0) / stuScores.length;
    let scores = stuScores.map(stu => stu.totalScore);
    let classMidScore = getMidScore(scores);
    return Object.assign({}, clazz, {classAverageScore, classMidScore});
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
    let searchClazz = sourceClazzs
        .find(c => c.stuScore.filter(stu => stu.stuNo === student.stuNo).length > 0);
    if (searchClazz) {
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
    Object.assign(clazz, updateClassScore(clazz));
};

const addStudent = (sourceClazzs, student) => {
    let clazz = sourceClazzs.find(c => c.classNum === student.classNum);
    if (!clazz) {
        sourceClazzs.push({
            classNum: student.classNum,
            stuScore: [student],
            classAverageScore: student.totalScore,
            classMidScore: student.totalScore
        });
    } else {
        clazz.stuScore.push(student);
        Object.assign(clazz, updateClassScore(clazz));
    }
};


const getClassInfo = (sourceClazzs, stuNos) => {
    let stuClazzs = [];
    stuNos.forEach(stuNo => {
        let searchClazz = sourceClazzs.find(clazz => clazz.stuScore.filter(stu => stu.stuNo === stuNo).length > 0);
        if (searchClazz && !stuClazzs.includes(searchClazz)) {
            stuClazzs.push(searchClazz);
        }
    });
    return stuClazzs;
};

const getPrintInfo = (clazzs) => {
    let classesInfo = [`成绩单`];
    clazzs.forEach(clazz => {
        classesInfo.push(`姓名|数学|语文|英语|编程|平均分|总分`);
        classesInfo.push(`==============================`);
        classesInfo.push(getStudentScores(clazz.stuScore));
        classesInfo.push(`==============================`);
        classesInfo.push(`全班平均分：${clazz.classAverageScore.toFixed(2)}`);
        classesInfo.push(`全班中位分：${clazz.classMidScore.toFixed(2)}`);
    });
    return classesInfo.join('\n');
};

const getStudentScores = (students) => {
    return students.map(stu => (
        `${stu.name}|${stu.math}|${stu.chinese}|${stu.english}|${stu.program}|${stu.aveScore}|${stu.totalScore}`
    )).join('\n');
};


module.exports = {
    updateClassScore,
    updateClazzs,
    getPrintInfo,
    getClassInfo,
    getMidScore
};