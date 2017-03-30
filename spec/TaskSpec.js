describe('Task Spec', () => {
    let task1 = require('../lib/task1');
    let task2 = require('../lib/task2');

    it('should get student info by strStu', () => {
        let inputStrStu = 'name,001,汉族,1,chinese:120,math:120,english:120,program:110';
        let expectResult = {
            name: 'name',
            stuNo: '001',
            nation: '汉族',
            classNum: '1',
            math: 120,
            chinese: 120,
            english: 120,
            program: 110
        };
        expect(task1.getStudentInfo(inputStrStu)).toEqual(expectResult);
    });

    it('should count student score', () => {
        let inputStu = {
            name: 'name',
            stuNo: '001',
            nation: '汉族',
            classNum: '1',
            math: 120,
            chinese: 110,
            english: 120,
            program: 110
        };
        let expectResult = {
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
        expect(task1.countStudentScore(inputStu)).toEqual(expectResult);
    });

    it('should count class ave and mid score', () => {
        let inputClass = {
            classId: 1,
            stuScore: [

                {
                    name: 'name2',
                    stuNo: '002',
                    nation: '汉族',
                    classNum: '1',
                    math: 100,
                    chinese: 100,
                    english: 100,
                    program: 100,
                    aveScore: 100,
                    totalScore: 400
                },
                {
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
                }

            ]
        };
        let expectResult = {
            classId: 1,
            stuScore: [
                {
                    name: 'name2',
                    stuNo: '002',
                    nation: '汉族',
                    classNum: '1',
                    math: 100,
                    chinese: 100,
                    english: 100,
                    program: 100,
                    aveScore: 100,
                    totalScore: 400
                },
                {
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
                }
            ],
            classAveScore: 430,
            classMidScore: 430
        };
        expect(task1.countClassScore(inputClass)).toEqual(expectResult);
    });

    it('should update clazzs when given a student and class is exist', () => {
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
        let existStudent = {
            name: 'qspeng',
            stuNo: '666',
            nation: '汉族',
            classNum: '1',
            math: 120,
            chinese: 110,
            english: 120,
            program: 110,
            aveScore: 115,
            totalScore: 460
        };
        let sourceClass = [{
            classNum: '1',
            stuScore: [existStudent],
            classAveScore: 0,
            classMidScore: 0
        }, {
            classNum: '2',
            stuScore: [],
            classAveScore: 0,
            classMidScore: 0
        }];

        let expectResult = [{
            classNum: '1',
            stuScore: [existStudent, testStudent],
            classAveScore: 460,
            classMidScore: 460
        }, {
            classNum: '2',
            stuScore: [],
            classAveScore: 0,
            classMidScore: 0
        }];
        ;

        expect(task1.updateClazzs(sourceClass, testStudent)).toEqual(expectResult);
    });

    it('should update clazzs when given a student and class is not exist', () => {
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
        let sourceClass = [];

        let expectResult = [{
            classNum: '1',
            stuScore: [testStudent],
            classAveScore: 460,
            classMidScore: 460
        }];

        expect(task1.updateClazzs(sourceClass, testStudent)).toEqual(expectResult);
    });

    it('should update clazzs when given a student is already in clazz', () => {
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
        let updateStudent = {
            name: 'update',
            stuNo: '001',
            nation: '汉族',
            classNum: '1',
            math: 100,
            chinese: 100,
            english: 100,
            program: 100,
            aveScore: 100,
            totalScore: 400
        };

        let sourceClass = [{
            classNum: '1',
            stuScore: [testStudent],
            classAveScore: 460,
            classMidScore: 460
        }];


        let expectResult = [{
            classNum: '1',
            stuScore: [updateStudent],
            classAveScore: 400,
            classMidScore: 400
        }];

        expect(task1.updateClazzs(sourceClass, updateStudent)).toEqual(expectResult);
    });

    it('should get student no by strStuNo', () => {
        let inputStrStuNo = '001,002,004';
        let expectResult = ['001', '002', '004'];

        expect(task2.getStudentNo(inputStrStuNo)).toEqual(expectResult);
    });

    it('should getClassInfo by StuInfo', () => {
        let inputStrStuNo = ['001'];
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
            classAveScore: 460,
            classMidScore: 460
        }, {
            classNum: '2',
            stuScore: [],
            classAveScore: 0,
            classMidScore: 0
        }];

        let expectResult = [{
            classNum: '1',
            stuScore: [testStudent],
            classAveScore: 460,
            classMidScore: 460
        }];
        expect(task2.getClassInfo(inputClazzs, inputStrStuNo)).toEqual(expectResult);

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
            classAveScore: 460,
            classMidScore: 460
        },{
            classNum: '2',
            stuScore: [],
            classAveScore: 0,
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
        expect(task2.getPrintInfo(inputClazzs)).toEqual(expectResult);

    });

});