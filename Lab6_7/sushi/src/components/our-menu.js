import '../css/menu.css'
import React from 'react'
import Row from 'react-bootstrap/Row'
import MenuListElement from './menu-list-element'
import FirebaseApp from '../firebase'

class OurMenu extends React.Component{
    
    state = {
        menuItems: [],
        filteredItems: []
    }

    componentWillMount = () => {
        this.fetchMenu()
    }

    fetchMenu = () =>{
        const menuRef = FirebaseApp.database().ref("menu_items")
        menuRef.on("value", (snapshot) =>{
            const items = snapshot.val()
            const itemsList = []
            for(let id in items){
                itemsList.push(items[id])
            }
            this.setState({
                menuItems: itemsList,
                filteredItems: itemsList
            })
        })
    }

    render(){
        const listElements = this.state.filteredItems.map(
            (item,index) => (
                <MenuListElement key={index} data={item} history={this.props.history}/>
            )
        )

        return(
            <>
                <Row className="menu-content">
                    <h1 className="red-span">OUR MENU</h1>
                    {listElements}
                </Row>
            </>
        )
    }
}

export default OurMenu