
const getStudentNo = (strStuNo) => {
    let splitArray = strStuNo.split(',');
    return splitArray.length > 0 ? splitArray : [];
};

const getClassInfo = (sourceClazzs, stuNos) => {
    let stuClazzs = [];
    stuNos.forEach(stuNo => {
        let [searchClazz] = sourceClazzs.filter(clazz => clazz.stuScore.filter(stu => stu.stuNo === stuNo).length > 0);
        if(searchClazz !== undefined && !stuClazzs.includes(searchClazz)){
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
    getStudentNo,
    getClassInfo,
    getPrintInfo
};
