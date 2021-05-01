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

export default ListElement;