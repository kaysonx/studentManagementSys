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
        if (student) {
            this.classServices.updateClazzs(student);
            return student;
        }
        return null;
    }

    printClazz(stuNoStrInfo) {
        return this.classServices.getClassInfo(Transform.getStudentNo(stuNoStrInfo));
    }
}

module.exports = ManagementService;