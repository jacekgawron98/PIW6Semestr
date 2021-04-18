
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
}

const ListElement = (props) => {
    const tags = props.data.tags.map(it => (
        <li key={it.hashCode()} className="list-inline-item list-group-item-primary">
            {it}
        </li>
    ));
    return (
        <>
            <div className="student">
                <h3>{props.data.name}</h3>
                <h5>{props.data.email}</h5>
                <p>{props.data.description}</p>
                <ul className="list-inline">
                    {tags}
                </ul>
            </div>
        </>
    );
};

const Summary = (props) => {
    return (
        <>
            <div>
                <p>
                    Odnaleziono: {props.found} studentów
                </p>
            </div>
        </>
    );
};

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

class MainRender extends React.Component{
    
    state = {
        studentsList: [student1, student2, student3],
        filteredList: [student1, student2, student3],
        allTags: ["Docker", "React", "Java", ".NET"]
    }

    onAddStudent = (student) =>{
        this.setState({
            studentsList: this.state.studentsList.concat(student),
            filteredList: this.state.studentsList.concat(student),
        })
    }

    onAddTag = (tags) =>{
        this.setState({
            allTags: tags
        })
    }

    filterStudents = (list) =>{
        this.setState({
            filteredList: list
        })
    }

    render(){
        const listElements = this.state.filteredList.map( it =>( 
            <ListElement key={it.hashCode()} data={it}/>
        ));
        return (
            <>
                <div className="row">
                    <div className="col-sm-9">
                        <div className="row find">
                            <div className="col-sm-9">
                                <FindStudentsComponent 
                                    students={this.state.studentsList} 
                                    filteredStudents={this.state.filteredList}
                                    filterFunction={this.filterStudents}
                                    allTags={this.state.allTags}/>
                            </div>
                            <div className="col-sm-3 align-self-center">
                                <Summary found={this.state.filteredList.length}/>
                            </div>
                        </div>
                        <h2>Aktualne ogłoszenia</h2>
                        {listElements}
                    </div>
                    <div className="col-sm-3 add">
                        <AddStudentComponent 
                            onParentAddStudent={this.onAddStudent}
                            onParentAddTag={this.onAddTag}
                            allTags={this.state.allTags}/>
                    </div>
                </div>
            </>
        )
    }
}

ReactDOM.render(
    <MainRender />,
    document.getElementById("root")
);

