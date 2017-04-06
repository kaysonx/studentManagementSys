const Clazz = require('./../model/Clazz');
const Student = require('./../model/Student');
const Transform = require('./../util/Transform');
const ClassServices = require('./ClassServices');
const {HINTS, STATE} = require('./../config/MessageCfg');

class ManagementService {
    constructor() {
        this.classServices = new ClassServices();
    }

    addStudent(student) {
        if (!student) {
            return null;
        }
        if (isNaN(student.math) || isNaN(student.chinese) || isNaN(student.english) || isNaN(student.program)) {
            return null
        }
        this.classServices.updateClazzs(student);
        return student;
    }

    printClazz(stuNoStrInfo) {
        return this.classServices.getClassInfo(Transform.getStudentNo(stuNoStrInfo));
    }
}

module.exports = ManagementService;