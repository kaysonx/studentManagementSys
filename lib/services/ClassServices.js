const Clazz = require('./../model/Clazz');
const CLASSES = require('../db/data');

class ClazzManagement {
    constructor() {
        this.clazzs = CLASSES;
    }

    updateClazzs(student) {
        let searchClazz = this.clazzs
            .find(c => c.stuScore.filter(stu => stu.stuNo === student.stuNo).length > 0);
        if (searchClazz) {
            searchClazz.updateStudent(student);
            searchClazz.updateClassScore();
        }
        else {
            this.addStudent(student);
        }
    }

    addStudent(student) {
        let clazz = this.clazzs.find(c => c.classNum === student.classNum);
        if (!clazz) {
            this.clazzs.push(new Clazz(student));
        } else {
            clazz.addStudent(student);
            clazz.updateClassScore();
        }
    }

    getClassInfo(stuNos) {
        let stuClazzs = [];
        stuNos.forEach(stuNo => {
            let searchClazz = this.clazzs.find(clazz => clazz.stuScore.filter(stu => stu.stuNo === stuNo).length > 0);
            if (searchClazz && !stuClazzs.includes(searchClazz)) {
                stuClazzs.push(searchClazz);
            }
        });
        return stuClazzs;
    }

    getAllClassInfo(){
        return this.clazzs;
    }
}

module.exports = ClazzManagement;