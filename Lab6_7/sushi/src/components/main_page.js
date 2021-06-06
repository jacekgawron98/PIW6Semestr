import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import {NavLink} from 'react-router-dom'
class MainPage extends React.Component{
    render(){
        return(
            <>
                <Jumbotron>
                    <div className="rel">
                        <img className="relative-img" src={process.env.PUBLIC_URL + '/sushi.jpg'} alt="sushi"/> 
                        <div className="rel-text">
                            <h1 id="jumbo-title">
                                <span class="red-span">BEST SUSHI</span> IN TOWN!
                            </h1>
                            <h2>
                                Try it out!
                            </h2>
                            <NavLink className="nav-link-no-pad" to="/menu">
                                <Button>
                                    ORDER NOW
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                </Jumbotron>
            </>
        )
    }
}

export default MainPage