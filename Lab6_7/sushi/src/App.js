import './css/App.css'
import MainPage from './components/main_page'
import LoginForm from './components/login_form'
import RegisterForm from './components/register_form'
import {BrowserRouter as Router, NavLink, Route, Switch, useHistory} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {useContext, useState} from 'react'
import { AuthContext } from './contexts/auth-context'
import PrivateRoute from './components/private-route'
import OurMenu from './components/our-menu'
import CartPage from './components/cart_page'
import HistoryPage from './components/history_page'

function App() {
  // eslint-disable-next-line
  const [error, setError ] = useState()
  const { currentUser, signout } = useContext(AuthContext)
  const history = useHistory()
  const onsignOutClicked = async () => {
    setError("")
    try{
      await signout()
      history.push("/")
    }catch{
      setError("Failed to sign out")
    }
  }

  return (
    <>  
        <Router basename={process.env.PUBLIC_URL}>
          <Container fluid>
            <Row>
              <Navbar variant="dark" fixed="top">
                <Col lg={4} className="d-flex justify-content-start">
                  <Nav className="mr-auto">
                    <Nav.Link>
                      <NavLink className="nav-link" to="/" exact>Home</NavLink>
                    </Nav.Link>
                    <Nav.Link>
                      <NavLink className="nav-link" to="/menu">Our menu</NavLink>
                    </Nav.Link>
                  </Nav>
                </Col>
                <Col lg={4} className="d-flex justify-content-center">
                  <Navbar.Brand>Sushi Shop</Navbar.Brand>
                </Col>
                <Col lg={4} className="d-flex justify-content-end">
                  {!(!!currentUser) &&
                    <Nav className="mr-auto">
                      <Nav.Link>
                        <NavLink className="nav-link" to="/login">Sign in</NavLink>
                      </Nav.Link>
                      <Nav.Link>
                        <NavLink activeClassName="active" className="nav-link" to="/register">SIGN UP</NavLink>
                      </Nav.Link>
                    </Nav>
                  }
                  {!!currentUser &&
                    <Nav className="mr-auto">
                      <Nav.Link>
                        <NavLink className="nav-link" to="/history">Order history</NavLink>
                      </Nav.Link>
                      <Nav.Link>
                        <NavLink activeClassName="active" className="nav-link" to="/cart">Cart</NavLink>
                      </Nav.Link>
                      <Nav.Link>
                        <Button variant="link" className="nav-link" id="sign-out" onClick={onsignOutClicked}>SIGN OUT</Button>
                      </Nav.Link>
                    </Nav>
                  }
                </Col>
              </Navbar>
            </Row>
            <Row fluid>
              <Col>
                <Switch>
                  <Route path="/" exact component={MainPage}/>
                  <Route path="/login" exact component={LoginForm}/>
                  <Route path="/register" exact component={RegisterForm}/>
                  <Route path="/menu" exact component={OurMenu}/>
                  <PrivateRoute path="/history" exact component={HistoryPage}/>
                  <PrivateRoute path="/cart" exact component={CartPage}/>
                </Switch>
              </Col>
            </Row>
          </Container>
        </Router>
    </>
  )
}

export default App
