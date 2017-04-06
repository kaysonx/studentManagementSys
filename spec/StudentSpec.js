describe('Student Spec', () => {
    const Student = require('../lib/model/Student');
    it('should get student from strStu', () => {
        let inputStrStu = 'name,001,汉族,1,chinese:120,math:120,english:120,program:110';
        let expectResult = new Student('name','001', '汉族', '1', 120, 120, 120, 110);
        expect(Student.getStudentFromStr(inputStrStu)).toEqual(expectResult);
    });

    it('should get student score', () => {
        let testStudent = new Student('name','001', '汉族', '1', 120, 110, 120, 110);
        expect(testStudent.aveScore).toEqual(115);
        expect(testStudent.totalScore).toEqual(460);
    });

});