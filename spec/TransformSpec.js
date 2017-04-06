describe('Transform Spec', () => {
    const Transform = require('../lib/util/Transform');
    it('should get student no by strStuNo', () => {
        let inputStrStuNo = '001,002,004';
        let expectResult = ['001', '002', '004'];

        expect(Transform.getStudentNo(inputStrStuNo)).toEqual(expectResult);
    });

    it('should return string clazzs info by clazzs', () => {
        let testStudent = {
            name: 'name',
            stuNo: '001',
            nation: '汉族',
            classNum: '1',
            math: 120,
            chinese: 110,
            english: 120,
            program: 110,
            aveScore: 115,
            totalScore: 460
        };

        let inputClazzs = [{
            classNum: '1',
            stuScore: [testStudent],
            classAverageScore: 460,
            classMidScore: 460
        }, {
            classNum: '2',
            stuScore: [],
            classAverageScore: 0,
            classMidScore: 0
        }];

        let expectResult = `成绩单
姓名|数学|语文|英语|编程|平均分|总分
==============================
name|120|110|120|110|115|460
==============================
全班平均分：460.00
全班中位分：460.00
姓名|数学|语文|英语|编程|平均分|总分
==============================

==============================
全班平均分：0.00
全班中位分：0.00`;
        expect(Transform.getPrintInfo(inputClazzs)).toEqual(expectResult);

    });
});