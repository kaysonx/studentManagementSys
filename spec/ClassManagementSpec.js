describe('ClassManagement Spec', () => {
    const ClassManagement = require('../lib/ClassManagement');
    const Student = require('../lib/Student');
    const Clazz = require('../lib/Clazz');
    it('should add student to clazz when given a student & class is exist', () => {
        let classManagement = new ClassManagement();
        let testStudent = new Student('name', '001', '汉族', '1', 120, 110, 120, 110);
        let existStudent = new Student('qspeng', '666', '汉族', '1', 120, 110, 120, 110);
        classManagement.clazzs = [new Clazz(existStudent)];

        let expectResult = [existStudent, testStudent];

        classManagement.updateClazzs(testStudent);
        expect(classManagement.clazzs[0].stuScore).toEqual(expectResult);
    });

    it('should create clazz and add student when given a student & class is not exist', () => {
        let classManagement = new ClassManagement();
        let testStudent = new Student('name', '001', '汉族', '1', 120, 110, 120, 110);
        let expectResult = [testStudent];

        classManagement.updateClazzs(testStudent);
        expect(classManagement.clazzs[0].stuScore).toEqual(expectResult);
    });

    it('should update clazzs when given a student is already in a clazz', () => {
        let classManagement = new ClassManagement();
        let updateStudent = new Student('name', '001', '汉族', '1', 120, 110, 120, 110);
        let existStudent = new Student('qspeng', '001', '汉族', '1', 120, 110, 120, 110);
        classManagement.clazzs = [new Clazz(existStudent)];
        let expectResult = [updateStudent];

        classManagement.updateClazzs(updateStudent);
        expect(classManagement.clazzs[0].stuScore).toEqual(expectResult);
    });

});