const Clazz = require('./Clazz');
const Student = require('./Student');
const Transform = require('./Transform');
const ClassManagement = require('./ClassManagement');
const {HINTS, STATE, ORDER, ORDER_MAP_ROUTER} = require('./MessageCfg');

class StudentManagement {
    constructor() {
        this.state = STATE.SHOW_ORDER;
        this.hintInfo = HINTS.DEFAULT_INFO;
        this.classManagement = new ClassManagement();
    }

    handleState(userInput) {
        let router = {};
        switch (this.state) {
            case STATE.SHOW_ORDER:
                router = this.handleOrder(userInput);
                break;
            case STATE.ADD:
                router = this.addStudent(userInput);
                break;
            case STATE.PRINT:
                router = this.printClazz(userInput);
                break;
        }
        this.state = router.state;
        this.hintInfo = router.hintInfo;
    }

    handleOrder(order) {
        if(ORDER_MAP_ROUTER.has(order)){
            return ORDER_MAP_ROUTER.get(order);
        }
        return ORDER_MAP_ROUTER.get('DEFAULT');
    }

    addStudent(stuStrInfo) {
        const student = Student.getStudentFromStr(stuStrInfo);
        if (student) {
            this.classManagement.updateClazzs(student);
            return {state: STATE.SHOW_ORDER, hintInfo: `学生${student.name}的成绩被添加\n` + HINTS.DEFAULT_INFO};
        } else {
            return {state: STATE.ADD, hintInfo: HINTS.ADDITION_ERR_INFO};
        }
    }

    printClazz(stuNoStrInfo) {
        const stuClazzInfo = this.classManagement.getClassInfo(Transform.getStudentNo(stuNoStrInfo));
        if (stuClazzInfo.length === 0) {
            return {state: STATE.PRINT, hintInfo: HINTS.STU_INPUT_ERROR_INFO};
        } else {
            return {
                state: STATE.SHOW_ORDER,
                hintInfo: Transform.getPrintInfo(stuClazzInfo) + '\n' + HINTS.DEFAULT_INFO
            };
        }
    }
}

module.exports = StudentManagement;