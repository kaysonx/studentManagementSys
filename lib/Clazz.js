class Clazz {
    constructor(student) {
        this.classNum = student.classNum;
        this.stuScore = [student];
        this.classAverageScore = student.totalScore;
        this.classMidScore = student.totalScore;
    }

    updateClassScore() {
        this.classAverageScore = this.stuScore.reduce((acc, stu) => acc + stu.totalScore, 0) / this.stuScore.length;
        let scores = this.stuScore.map(stu => stu.totalScore);
        this.classMidScore = this.getMidNum(scores);
    }

    getMidNum(numbers) {
        const length = numbers.length;
        numbers.sort((a, b) => a - b);
        if (length % 2 === 0) {
            let midIndex = (length / 2) - 1;
            return (numbers[midIndex] + numbers[midIndex + 1]) / 2;
        } else {
            let midIndex = Math.ceil(length / 2 - 1);
            return numbers[midIndex];
        }
    }

    updateStudent(student) {
        this.stuScore = this.stuScore.map(stu =>
            stu.stuNo === student.stuNo ? student : stu
        );
    };
}

module.exports = Clazz;