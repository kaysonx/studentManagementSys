describe('ClassManagement Spec', () => {
    const ClassServices = require('../lib/ClassServices');
    const Student = require('../lib/Student');
    const Clazz = require('../lib/Clazz');
    it('should add student to clazz when given a student & class is exist', () => {
        let classServices = new ClassServices();
        let testStudent = new Student('name', '001', '汉族', '1', 120, 110, 120, 110);
        let existStudent = new Student('qspeng', '666', '汉族', '1', 120, 110, 120, 110);
        classServices.clazzs = [new Clazz(existStudent)];

        let expectResult = [existStudent, testStudent];

        classServices.updateClazzs(testStudent);
        expect(classServices.clazzs[0].stuScore).toEqual(expectResult);
    });

    it('should create clazz and add student when given a student & class is not exist', () => {
        let classServices = new ClassServices();
        let testStudent = new Student('name', '001', '汉族', '1', 120, 110, 120, 110);
        let expectResult = [testStudent];

        classServices.updateClazzs(testStudent);
        expect(classServices.clazzs[0].stuScore).toEqual(expectResult);
    });

    it('should update clazzs when given a student is already in a clazz', () => {
        let classServices = new ClassServices();
        let updateStudent = new Student('name', '001', '汉族', '1', 120, 110, 120, 110);
        let existStudent = new Student('qspeng', '001', '汉族', '1', 120, 110, 120, 110);
        classServices.clazzs = [new Clazz(existStudent)];
        let expectResult = [updateStudent];

        classServices.updateClazzs(updateStudent);
        expect(classServices.clazzs[0].stuScore).toEqual(expectResult);
    });

});