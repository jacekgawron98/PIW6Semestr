import { useState, useEffect, useContext } from 'react'
import FirebaseApp from '../firebase'
import { AuthContext } from '../contexts/auth-context'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HistoryItem from './history_item'
import '../css/history.css'
const HistoryPage = (props) => {
    const [history,setHistory] = useState([])
    const { currentUser } = useContext(AuthContext)

    const fetchHistory = () =>{
        const ordersRef = FirebaseApp.database().ref("orders")
        ordersRef.on("value", (snapshot) =>{
            const items = snapshot.val()
            const historyList = []
            for(let id in items){
                if(items[id].uid === currentUser.uid)
                    historyList.push(items[id])
            }
            setHistory(historyList)
        })
    }
    
    useEffect(() => {
        fetchHistory()
    })

    const historyItems = history.map( (item,index) => (
        <HistoryItem key={index+item.date} data={item} index={index}/>
    ))

    return(
        <>
            <Row className="history-margin">
                <Col lg={3}></Col>
                <Col lg={6}>
                    {historyItems}
                </Col>
                <Col lg={3}></Col>
            </Row>
        </>
    )
}

export default HistoryPage