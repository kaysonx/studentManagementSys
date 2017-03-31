const getSubjectScore = (subjectObj) => {
    return parseFloat(subjectObj.split(':')[1]);
}
const getStudentInfo = (strStu) => {
    let splitArr = strStu.split(',');
    if (splitArr.length !== 8) {
        return null;
    }
    let [name, stuNo, nation, classNum, chineseObj, mathObj, englishObj, programObj] = splitArr;
    const math = getSubjectScore(mathObj);
    const chinese = getSubjectScore(chineseObj);
    const english = getSubjectScore(englishObj);
    const program = getSubjectScore(programObj);
    return {
        name,
        stuNo,
        nation,
        classNum,
        chinese,
        math,
        english,
        program
    };
};

const countStudentScore = (student) => {
    let totalScore = student.math + student.chinese + student.english + student.program;
    let aveScore = totalScore / 4;
    return Object.assign({}, student, {aveScore, totalScore});
};

const getStudentNo = (strStuNo) => {
    let splitArray = strStuNo.split(',');
    return splitArray.length > 0 ? splitArray : [];
};

module.exports = {
    getStudentInfo,
    countStudentScore,
    getStudentNo
};
