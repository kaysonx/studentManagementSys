class Student {
    constructor(name, stuNo, nation, classNum, chinese, math, english, program) {
        this.name = name;
        this.stuNo = stuNo;
        this.nation = nation;
        this.classNum = classNum;
        this.chinese = chinese;
        this.math = math;
        this.english = english;
        this.program = program;
        let {aveScore, totalScore} = this.countScore();
        this.aveScore = aveScore;
        this.totalScore = totalScore;
    };

    static getStudentFromStr(strStu) {
        let splitArr = strStu.split(',');
        if (splitArr.length !== 8) {
            return null;
        }
        let [name, stuNo, nation, classNum, chineseObj, mathObj, englishObj, programObj] = splitArr;
        return new Student(
            name,
            stuNo,
            nation,
            classNum,
            parseFloat(chineseObj.split(':')[1]),
            parseFloat(mathObj.split(':')[1]),
            parseFloat(englishObj.split(':')[1]),
            parseFloat(programObj.split(':')[1])
        );
    };

    countScore() {
        let totalScore = this.math + this.chinese + this.english + this.program;
        let aveScore = totalScore / 4;
        return {aveScore: aveScore, totalScore: totalScore};
    };
}

module.exports = Student;