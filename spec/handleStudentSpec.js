describe('Student Spec', () => {
    const handleStudent = require('../lib/handleStudent');

    it('should get student object info by strStu', () => {
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
        expect(handleStudent.getStudentInfo(inputStrStu)).toEqual(expectResult);
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
        expect(handleStudent.countStudentScore(inputStu)).toEqual(expectResult);
    });

    it('should get student no by strStuNo', () => {
        let inputStrStuNo = '001,002,004';
        let expectResult = ['001', '002', '004'];

        expect(handleStudent.getStudentNo(inputStrStuNo)).toEqual(expectResult);
    });
});