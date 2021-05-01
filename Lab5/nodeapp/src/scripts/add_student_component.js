import React from 'react';
import TagInput from './tag_input';
import Student from './student';
import {generatePath,Redirect} from 'react-router-dom';
import './scripts';

class AddStudentComponent extends React.Component{
    studentToEdit = this.props.student;
    addStudent = this.props.onParentAddStudent;
    editStudent = this.props.onParentEditStudent;
    addTag = this.props.onParentAddTag; 
    state = { 
        name: this.studentToEdit==null? "" : this.studentToEdit.name,
        description: this.studentToEdit==null? "" : this.studentToEdit.description,
        email: this.studentToEdit==null? "" : this.studentToEdit.email,
        tags: this.studentToEdit==null? [] : this.studentToEdit.tags,
        allTags: ["Docker", "React", "Java", ".NET"],
        isNameEmpty: false,
        isDescriptionEmpty: false,
        isEmailEmpty: false
    }

    onAddStudent = (event) =>{
        const { history } = this.props;

        const student = new Student(
            this.state.name,
            this.state.description,
            this.state.email,
            this.state.tags,
            Date.now()
        );
        
        if(!this.state.name || !this.state.description || !this.state.email){
            return;
        }
        
        const urlArr = window.location.href.split("/");
        const domain = urlArr[0] + "//" + urlArr[2];
        const editPath = generatePath("/edit/:hash", {
            hash: student.hashCode()
        });
        alert("Dodano ogłoszenie\nTwój link do edycji to:\n" + domain + editPath);

        if(this.studentToEdit==null){
            this.addStudent(student);
        }else{
            this.editStudent(student,this.studentToEdit.hashCode());    
        }
        this.setState({redirect: "/"});
    }

    onNameChanged = (event) => {
        this.state.isNameEmpty = false;
        this.setState({
            name: event.target.value
        });
    }

    onDescriptionChanged = (event) =>{
        this.state.isDescriptionEmpty = false;
        this.setState({
            description: event.target.value
        });
    }

    onEmailChanged = (event) =>{
        this.state.isEmailEmpty = false;
        this.setState({
            email: event.target.value
        });
    }

    setStudentTags = (tags) =>{
        let newTags = [...this.state.allTags]
        for(let i = 0; i < tags.length; i++){
            newTags.pushIfNotExist(tags[i], function(e){
                return e === tags[i];
            });
        }

        this.addTag(newTags)
        this.setState({
            tags: tags,
            allTags: newTags
        })
    }
    
    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <>
                <div className="row">
                    <div className="col-sm-12 add">
                        <h2>Dodawanie nowego studenta</h2>
                        <div className="form-group">
                            <input className="form-control" type="text" 
                                value={this.state.name}
                                onChange={this.onNameChanged} placeholder="Imię"></input>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" 
                                value={this.state.description}
                                onChange={this.onDescriptionChanged} placeholder="Opis"></input>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" 
                                value={this.state.email}
                                onChange={this.onEmailChanged} placeholder="Email"></input>
                        </div>
                        <div className="form-group">
                            <TagInput addedTags={this.state.tags} tagsSetter={this.setStudentTags} allTags={this.state.allTags}/>
                        </div>
                        <button className="btn btn-primary" onClick={this.onAddStudent}>Dodaj ogłoszenie</button>
                    </div>
                </div>
            </>
        );
    }
}

export default AddStudentComponent;