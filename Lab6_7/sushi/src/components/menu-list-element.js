import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { AuthContext } from '../contexts/auth-context'
import { CartContext } from '../contexts/cart-context'
import '../css/menu.css'

const MenuListElement = (props) => {
    const [amount,setAmount] = useState(1)
    const { currentUser } = useContext(AuthContext)
    const { addToCart } = useContext(CartContext)
    const history = useHistory()


    const onAddClicked = (event) => {
        const newAmount = amount + 1
        setAmount(newAmount)
    }

    const onRemoveClicked = (event) => {
        if(amount === 1) return
        const newAmount = amount - 1
        setAmount(newAmount)
    }

    const onCartClicked = (event) => {
        if(currentUser == null){
            history.push("/login")
            return
        }
        const entry = {
            item: props.data,
            amount: amount,
        }
        addToCart(entry)
    }

    return(
        <>
            <Row className="margin">
                <Col lg={3}></Col>
                <Col lg={3}>
                <div className="item">
                        <img className="menu-img" src={process.env.PUBLIC_URL + '/futomaki.png'} alt="futomaki"/>
                        <div className="item-desc">
                            <h3 className="red-span item-name">{props.data.name}</h3>
                            <p className="item-ingredient">{props.data.ingredient}</p>
                            <p className="item-price">
                                <b>${props.data.price}</b>
                            </p>
                        </div>
                    </div>
                </Col>
                <Col lg={3}>
                    <Row>
                        <Col>
                            <h4>{props.data.description}</h4>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col lg={3}></Col>
                        <Col lg={2}>
                            <Button onClick={onRemoveClicked}>
                                -
                            </Button>
                        </Col>
                        <Col lg={2}>
                            <p>
                                {amount}
                            </p>
                        </Col>
                        <Col lg={2}>
                            <Button onClick={onAddClicked}>
                                +
                            </Button>
                        </Col>
                        <Col lg={3}></Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                            <Button onClick={onCartClicked} variant="primary">
                                Add to cart
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>   
    )
}

export default MenuListElement