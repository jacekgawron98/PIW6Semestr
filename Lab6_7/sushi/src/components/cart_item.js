import { useState, useContext } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { CartContext } from '../contexts/cart-context'
import '../css/cart.css'


const CartItem = (props) => {
    const [amount,setAmount] = useState(props.data.amount)
    const { updateEntry, removeFromCart } = useContext(CartContext)

    const onAddClicked = (event) => {
        const newAmount = amount + 1
        setAmount(newAmount)
        updateEntry(props.index,newAmount)
    }

    const onRemoveClicked = (event) => {
        if(amount === 1) return
        const newAmount = amount - 1
        setAmount(newAmount)
        updateEntry(props.index,newAmount)
    }

    const onDeleteClicked = (event) => {
        removeFromCart(props.index)
    }

    return(
        <>
            <Card className="item-card">
                <Card.Body className="item-card-body">
                    <Row>
                        <Col lg={3}>
                            <h3 className="red-span item-name">{props.data.item.name}</h3>
                            <p className="item-ingredient">{props.data.item.ingredient}</p>
                        </Col>
                        <Col lg={5}>
                            <Row>
                                <Col lg={2}></Col>
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
                        </Col>
                        <Col lg={2}>
                            ${amount*props.data.item.price}
                        </Col>
                        <Col lg={2}>
                            <Row>
                                <Col lg={11}></Col>
                                <Col lg={1}>
                                    <Button onClick={onDeleteClicked}>
                                        X
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default CartItem