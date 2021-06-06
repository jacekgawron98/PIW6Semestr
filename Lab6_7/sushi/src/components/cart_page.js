import { useContext } from 'react'
import { CartContext } from '../contexts/cart-context'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CartItem from './cart_item'
import '../css/cart.css'


const CartPage = (props) => {
    const { cart, placeOrder} = useContext(CartContext)

    const cartItems = cart.map( (item,index) => (
        <CartItem key={index+item.amount+item.item.name} data={item} index={index}/>
    ))

    const totalPrice = () => {
        let total = 0
        cart.forEach((item,index) => {
            total += item.item.price * item.amount
        })
        return total
    }

    const onPlaceOrder = () => {
        placeOrder()
    }

    return(
        <>
            <Row className="cart-margin">
                {(cart.length > 0) && <>
                    <Col lg={2}></Col>
                    <Col lg={5}>
                        {cartItems}
                    </Col>
                    <Col lg={3}>
                        <Card>
                            <Card.Body>
                                <h3>Order details</h3>
                                <hr/>
                                <h3>
                                    Total to pay: ${totalPrice()}
                                </h3>
                                <hr/>
                                <Button variant="secondary" onClick={onPlaceOrder}>
                                    Order
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={2}></Col>
                </>}
                {(cart.length === 0 || cart === null) && <>
                    <Col lg={4}></Col>
                    <Col lg={4}>
                        <Card>
                            <Card.Body>
                                Your cart is empty
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4}></Col>
                </>}
            </Row>
        </>
    )
}

export default CartPage