import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../css/history.css'

const HistoryItem = (props) => {
    const [visible,setVisible] = useState(false)

    const getDate = (time) => {
        const date = new Date(time)
        return date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes()
    }

    const onToggle = (event) => {
        setVisible(!visible)
    }

    const totalPrice = () => {
        let total = 0
        props.data.cart.forEach((item,index) => {
            total += item.item.price * item.amount
        })
        return total
    }

    const products = props.data.cart.map( (item, index) => (
        <>
            <Row>
                <Col lg={6}>
                    <h3 className="red-span item-name">{item.item.name}</h3>
                    <p className="item-ingredient">{item.item.ingredient}</p>
                </Col>
                <Col lg={6}>
                    <p className="item-ingredient">Amount: {item.amount}</p>
                    <p className="item-ingredient">Price: ${item.amount * item.item.price}</p>
                </Col>
            </Row>
        </>
    ))

    return (
        <div className="history-item">
            <Button className="dropdown-toggle history-toggle" onClick={onToggle}>
                <h2>Order: {props.data.date}</h2>
                Ordered: {getDate(props.data.date)}<br/>
                Total: ${totalPrice()}<br/>
                {!visible && <>Click to toggle details</>}
                {visible && <>Click to hide details</>}
            </Button>
            {visible && <Card>
                <Card.Body className="history-card">
                    {products}
                </Card.Body>    
            </Card>}
        </div>
    )
}

export default HistoryItem