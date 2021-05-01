import React from 'react';

class TagInput extends React.Component{
    setStudentTags = this.props.tagsSetter;
    allTags = this.props.allTags;
    state = {
        suggestions: [],
        areSuggestionsVisible: false,
        addedTags: this.props.addedTags==null? [] : this.props.addedTags,
        newTagValue: ""
    }

    removeTag = (index) =>{
        const newTags = [...this.state.addedTags];
        newTags.splice(index,1);
        this.setStudentTags(newTags);
        this.setState({
            addedTags: newTags
        });
    }

    onChange = (event) =>{
        const suggestions = this.props.allTags;
        const input = event.target.value;

        const filteredsuggestions = suggestions.filter(
            suggestion => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
        )

        const visibility = input? true : false;

        this.setState({
            newTagValue: input,
            suggestions: filteredsuggestions,
            areSuggestionsVisible: visibility
        })

    }

    onInputKeyDown = (event) =>{
        const value = event.target.value;
        if(event.key === 'Enter' && value){
            if(this.state.addedTags.find(tag => tag.toLowerCase() === value.toLowerCase())){
                return;
            }
            this.setStudentTags([...this.state.addedTags,value]);
            this.setState({
                addedTags: this.state.addedTags.concat(value),
                newTagValue: ""
            });
        }
    }

    onSuggestionClick = (event) =>{
        const value = event.currentTarget.innerText;
        if(this.state.addedTags.find(tag => tag.toLowerCase() === value.toLowerCase())){
            return;
        }
        this.setStudentTags([...this.state.addedTags,value]);
        this.setState({
            areSuggestionsVisible: false,
            newTagValue: "",
            addedTags: this.state.addedTags.concat(value),
        })
    }

    render(){
        const listElements = this.state.addedTags.map( (it,index) =>(
            <li key={it.hashCode()}>
                {it}
                <button className="btn btn-primary"
                    onClick={() => {this.removeTag(index)}}>+</button>
            </li>
        ));

        const suggestionsElements = this.state.suggestions.map( it => (
            <li key={it.hashCode()} onClick={this.onSuggestionClick} className="dropdown-item list-group-item list-group-item-action">
                {it}
            </li>
        ));
        return(
            <>
                <ul className="tag-input">
                    {listElements}
                </ul>
                <input className="form-control"
                        value={this.state.newTagValue}
                        placeholder="Tagi"
                        onChange={this.onChange}
                        onKeyDown={this.onInputKeyDown} 
                        type="text"></input>
                {this.state.areSuggestionsVisible && <ul className="list-group">
                    {suggestionsElements}
                </ul>}
            </>
        );
    }
}

export default TagInput;