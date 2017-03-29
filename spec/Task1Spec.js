describe('Task 1', () => {
    let task1 = require('../lib/task1')
    // it('should get data from the console', () => {
    //     let testInputStr = `console data`;
    //     let expectResult = `console data`;
    //     expect(task1.getInput(testInputStr)).toEqual(expectResult);
    // });

    it('should get student info by strStu',  () => {
        let inputStrStu = 'name,001,汉族,1,chinese:120,math:120,english:120,program:110';
        let expectResult = {
            name:'name',
            stuNo:'001',
            nation:'汉族',
            classNum:'1',
            math:120,
            chinese:120,
            english:120,
            program:110
        };
        expect(task1.getStudentInfo(inputStrStu)).toEqual(expectResult);
    });

});