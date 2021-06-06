import React from 'react'
import Form  from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContext } from '../contexts/auth-context'

class LoginForm extends React.Component{
    static contextType = AuthContext
    
    state = {
        login: "",
        password: "",
        error: ""
    }

    onEmailChange = (event) => {
        const input = event.target.value
        this.setState({
            login: input
        })
    }

    onPasswordChange = (event) => {
        const input = event.target.value
        this.setState({
            password: input
        })
    }

    onLogin = async (event) => {
        this.setState({
            error: ""
        })
        
        try{
            await this.context.signin(this.state.login,this.state.password)
            this.props.history.push("/")
        }catch(error){
            this.setState({
                error: error.message
            })
        }
    }

    render(){
        return(
            <>
            <Row>
                <Col lg={6}>
                    <img className="relative-img" src={process.env.PUBLIC_URL + '/sushi2.jpg'} alt="sushi"/> 
                </Col>
                <Col lg={6}>

                    <Row>
                        <Col lg={3}></Col>
                        <Col lg={6} className = "content-center">
                            <div className="top-margin">
                                <h1><span className="red-span">Sign in</span> to your account</h1>
                            </div>
                            {this.state.error && 
                                <Alert variant="danger">
                                    {this.state.error}
                                </Alert>
                            }
                            <Form>
                                <Form.Group>
                                    <Form.Label>
                                        Email address
                                    </Form.Label>
                                    <Form.Control onChange={this.onEmailChange} 
                                                    value={this.state.login} 
                                                    type = "email" 
                                                    placeholder="Email address">
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Password
                                    </Form.Label>
                                    <Form.Control onChange={this.onPasswordChange} 
                                                    value={this.state.password} 
                                                    type="password" 
                                                    placeholder="Password">  
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Button onClick={this.onLogin} variant="primary">
                                    Sign in
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </>
        )
    }
}

export default LoginForm