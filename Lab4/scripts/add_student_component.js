class AddStudentComponent extends React.Component{
    addStudent = this.props.onParentAddStudent;
    addTag = this.props.onParentAddTag; 
    state = { 
        name: "",
        description: "",
        email: "",
        tags: [],
        allTags: ["Docker", "React", "Java", ".NET"],
        isNameEmpty: false,
        isDescriptionEmpty: false,
        isEmailEmpty: false
    }

    onAddStudent = (event) =>{
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
        this.addStudent(student);
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
        return (
            <>
                <h2>Dodawanie nowego studenta</h2>
                <div className="form-group">
                    <input className="form-control" type="text" 
                        onChange={this.onNameChanged} placeholder="Imię"></input>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" 
                        onChange={this.onDescriptionChanged} placeholder="Opis"></input>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" 
                        onChange={this.onEmailChanged} placeholder="Email"></input>
                </div>
                <div className="form-group">
                    <TagInput tagsSetter={this.setStudentTags} allTags={this.state.allTags}/>
                </div>
                <button className="btn btn-primary" onClick={this.onAddStudent}>Dodaj ogłoszenie</button>
            </>
        );
    }
}