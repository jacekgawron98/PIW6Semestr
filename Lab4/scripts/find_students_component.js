class FindStudentsComponent extends React.Component{
    parentFilterFunction = this.props.filterFunction;
    state = { 
        tagsSet: false,
        descSet: false
    }

    onSetTag = (tags) =>{
        let listToFilter = [...this.props.students];
        let setTags = false;
        if(this.state.setDesc){
            listToFilter = [...this.props.filteredStudents]
        }
        const filteredList = [...this.props.students].filter(
            arr => tags.every(i => arr.tags.includes(i))
        );
        this.parentFilterFunction(filteredList);
        if(tags.length != 0){
            setTags = true;
        }
        this.setState({
            tagsSet: setTags
        })
    }

    onDescTextChanged = (event) =>{
        let listToFilter = [...this.props.students];
        let setDesc = false;
        if(this.state.tagsSet){
            listToFilter = [...this.props.filteredStudents]
        }
        const input = event.target.value;
        const filteredList = listToFilter.filter(
            student => student.description.toLowerCase().indexOf(input.toLowerCase()) > -1
        );
        this.parentFilterFunction(filteredList);
        
        if(event.target.value){
            setDesc = true;
        }
        this.setState({
            descSet: setDesc
        })
    }

    render(){
        return(
            <>
                <div className="form-group">
                    <label>Wyszukaj po tagach</label>
                    <TagInput tagsSetter={this.onSetTag} set allTags={this.props.allTags}/>
                </div>
                <div className="form-group">
                    <label>Wyszukaj w opisie</label>
                    <input className="form-control" type="text" 
                        onChange={this.onDescTextChanged} placeholder="wyszukiwanie"></input>
                </div>
            </>
        );
    }
}