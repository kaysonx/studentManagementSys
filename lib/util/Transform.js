class Transform {
    static getStudentNo(strStuNo){
        let splitArray = strStuNo.split(',');
        return splitArray.length > 0 ? splitArray : [];
    }

    static getPrintInfo(clazzs) {
        let classesInfo = [`成绩单`];
        clazzs.forEach(clazz => {
            classesInfo.push(`姓名|数学|语文|英语|编程|平均分|总分`);
            classesInfo.push(`------------------------------`);
            classesInfo.push(Transform.getStudentScores(clazz.stuScore));
            classesInfo.push(`------------------------------`);
            classesInfo.push(`全班平均分：${clazz.classAverageScore.toFixed(2)}`);
            classesInfo.push(`全班中位分：${clazz.classMidScore.toFixed(2)}`);
        });
        return classesInfo.join('\n');
    }

    static getStudentScores(students){
        return students.map(stu => (
            `${stu.name}|${stu.math}|${stu.chinese}|${stu.english}|${stu.program}|${stu.aveScore}|${stu.totalScore}`
        )).join('\n');
    }
}


module.exports = Transform;