import React from 'react';
import FindStudentsComponent from './find_students_component';
import AddStudentComponent from './add_student_component';
import Student from './student';
import StudentsList from './students_list';
import {BrowserRouter as Router, NavLink, Route, Switch, useParams} from 'react-router-dom'

const fs = require('fs');

const student1 = new Student(
    "Adam Nowak",
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
    "test@test.com",
    ["Docker"],
    Date.now()
);

const student2 = new Student(
    "Magdalena Kowalska",
    "biblioteka języka programowania JavaScript, która wykorzystywana jest do tworzenia interfejsów graficznych aplikacji internetowych.",
    "test2@test.com",
    ["Docker","React"],
    Date.now()
);

const student3 = new Student(
    "DotNetLover11oneone!",
    "Litwo! Ojczyzno moja! ty jesteś jak zdrowie: Ile cię trzeba cenić, ten tylko się dowie, Kto cię stracił.",
    "test2@test.com",
    [".NET","React"],
    Date.now()
);

const getArrayOfStudents = function(){
    let students = [];
    const studentsFromJSON = JSON.parse(sessionStorage.getItem("studentsList"));
    if(studentsFromJSON == null){
        students = [student1,student2,student3];
    }else{
        studentsFromJSON.forEach(element => {
            students = students.concat(Student.fromJSON(element));
        });
    }
    return students;
}

class MainRender extends React.Component{
    state = {
        studentsList: getArrayOfStudents(),
        filteredList: getArrayOfStudents(),
        allTags: JSON.parse(sessionStorage.getItem("tags"))
    }

    onAddStudent = (student) =>{
        this.setState({
            studentsList: this.state.studentsList.concat(student),
            filteredList: this.state.studentsList.concat(student),
        })

        sessionStorage.setItem("studentsList",JSON.stringify(this.state.studentsList.concat(student)));
    }

    onEditStudent = (student,orignalHashCode) =>{
        const studentToDelete = this.state.studentsList.find(s => s.hashCode() == orignalHashCode);
        const index = this.state.studentsList.indexOf(studentToDelete);
        let newList = this.state.studentsList;
        newList[index] = student;
        if(index > -1){
            
            this.setState({
                studentsList: newList,
                filteredList: newList,
            })
        }
        sessionStorage.setItem("studentsList",JSON.stringify(newList));
    }

    onAddTag = (tags) =>{
        this.setState({
            allTags: tags
        })
        sessionStorage.setItem("tags",JSON.stringify(tags));
    }

    filterStudents = (list) =>{
        this.setState({
            filteredList: list
        })
    }

    render(){
        return (
            <>
                <Router>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/" exact>Lista studentów</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/add-student">Dodaj ogłoszenie studenta</NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route path="/" exact>
                            <StudentsList 
                                students={this.state.studentsList}
                                filteredList={this.state.filteredList}
                                filterFunction={this.filterStudents}
                                allTags={this.state.allTags} />
                        </Route>
                        <Route path="/add-student">
                                    <AddStudentComponent 
                                        onParentAddStudent={this.onAddStudent}
                                        onParentEditStudent={this.onEditStudent}
                                        onParentAddTag={this.onAddTag}
                                        allTags={this.state.allTags}/>
                        </Route>
                        <Route exact path="/edit/:hash" render={(props) => (
                            <AddStudentComponent 
                                student={this.state.studentsList.find(s => s.hashCode() == props.match.params.hash)}
                                onParentAddStudent={this.onAddStudent}
                                onParentEditStudent={this.onEditStudent}
                                onParentAddTag={this.onAddTag}
                                allTags={this.state.allTags}/>
                            )}/>   
                        <Route>
                            <h1>404 NOT FOUND</h1>
                        </Route>
                    </Switch>
                </Router>
            </>
        )
    }
}

export default MainRender;

