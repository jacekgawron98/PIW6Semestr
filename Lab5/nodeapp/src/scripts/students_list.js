import React from 'react';
import ListElement from './list_element';
import FindStudentsComponent from './find_students_component';
import Summary from './summary';

class StudentsList extends React.Component {
    render() {
        const listElements = this.props.filteredList.map(it => (
            <ListElement key={it.hashCode()} data={it} />
        ));
        return (
            <>
                <div className="row find">
                    <div className="col-sm-9">
                        <FindStudentsComponent
                            students={this.props.students}
                            filteredStudents={this.props.filteredList}
                            filterFunction={this.props.filterFunction}
                            allTags={this.props.allTags} />
                    </div>
                    <div className="col-sm-3 align-self-center">
                        <Summary found={this.props.filteredList.length} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Aktualne ogłoszenia</h2>
                            {listElements}
                    </div>
                </div>
            </>
        )
    }
}

export default StudentsList;
