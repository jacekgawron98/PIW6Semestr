import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../contexts/auth-context'

const PrivateRoute = ({component: RouteComponent, ...rest}) =>{
    const {currentUser} = useContext(AuthContext)

    return(
        <Route
            {...rest}
            render={props => {
            return currentUser ? <RouteComponent {...props} /> : <Redirect to="/login" />
            }}
        ></Route> 
    )
}

export default PrivateRoute