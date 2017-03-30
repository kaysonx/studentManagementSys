const getStudentInfo = (strStu) => {
    let splitArr = strStu.split(',');
    if (splitArr.length !== 8) {
        return null;
    }
    let [name, stuNo, nation, classNum, chineseObj, mathObj, englishObj, programObj] = splitArr;
    let resolveStudent = {
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

const getStudentNo = (strStuNo) => {
    let splitArray = strStuNo.split(',');
    return splitArray.length > 0 ? splitArray : [];
};

module.exports = {
    getStudentInfo,
    countStudentScore,
    getStudentNo
};
