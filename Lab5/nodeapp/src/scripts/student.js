class Student{
    constructor(name, description, email, tags, createDate){
        this.name = name;
        this.description = description;
        this.email = email;
        this.tags = tags;
        this.createDate = createDate;
    }

    hashCode(){
        let hash = this.name + this.createDate + this.description;
        return hash.hashCode();
    }
    static fromJSON(obj){
        return new Student(
            obj.name,
            obj.description,
            obj.email,
            obj.tags,
            obj.createDate
        )
    }
}

Student.prototype.toString = function(){
    return this.name;
}

export default Student;