const Clazz = require('./Clazz');
const Student = require('./Student');
const Transform = require('./Transform');
const ClassManagement = require('./ClassManagement');
const {HINTS, STATE} = require('./MessageCfg');

class ManagementService {
    constructor() {
        this.classManagement = new ClassManagement();
    }

    addStudent(stuStrInfo) {
        const student = Student.getStudentFromStr(stuStrInfo);
        if (student) {
            this.classManagement.updateClazzs(student);
            return student;
        }
        return null;
    }

    printClazz(stuNoStrInfo) {
        return this.classManagement.getClassInfo(Transform.getStudentNo(stuNoStrInfo));
    }
}

module.exports = ManagementService;