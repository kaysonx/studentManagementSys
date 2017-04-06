describe('Clazz Spec', () => {
    const Clazz = require('../lib/model/Clazz');
    it('should get mid num when arr is only one element', () => {
        let testArr = [100];
        let expectResult = 100;
        expect(Clazz.getMidNum(testArr)).toEqual(expectResult);
    });

    it('should get mid num when arr count is even', () => {
        let testArr = [100, 200];
        let expectResult = 150;
        expect(Clazz.getMidNum(testArr)).toEqual(expectResult);
    });

    it('should get mid num when arr count is old', () => {
        let testArr = [100, 200, 300];
        let expectResult = 200;
        expect(Clazz.getMidNum(testArr)).toEqual(expectResult);
    });

    it('should count class ave and mid score', () => {
        let testStudent = {
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
        };
        let testStudent2 =   {
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
        let testClass = new Clazz(testStudent);
        testClass.addStudent(testStudent2);
        testClass.updateClassScore();

        expect(testClass.classMidScore).toEqual(430);
        expect(testClass.classAverageScore).toEqual(430);

    });
});
