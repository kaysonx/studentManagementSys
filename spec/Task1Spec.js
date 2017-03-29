describe('Task 1', () => {
    let task1 = require('../lib/task1')
    it('should get data from the console', () => {
        let testInputStr = `console data`
        let expectResult = `console data`
        expect(getInput(testInputStr)).toEqual(expectResult)
    });

});