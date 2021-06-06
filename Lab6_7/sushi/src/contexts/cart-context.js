import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/auth-context'
import FirebaseApp from '../firebase'

export const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
    const [cart,setCart] = useState([])
    const { currentUser } = useContext(AuthContext)

    const addToCart = (entry) => {
        let newCart = [...cart]
        newCart.push(entry)
        setCart(newCart)
        alert("Added to cart")
    }

    const removeFromCart = (index) => {
        let newCart = [...cart]
        newCart.splice(index,1)
        setCart(newCart)
    }

    const updateEntry = (index,amount) => {
        alert(index + " " + amount)
        cart[index].amount = amount
        setCart(cart)
    }

    const placeOrder = () => {
        alert("Your order has been placed")
        const order = {
            uid: currentUser.uid,
            date: Date.now(),
            cart: cart
        }
        const ordersRef = FirebaseApp.database().ref("orders")
        ordersRef.push(order)
        setCart([])
    }

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateEntry,
        placeOrder
    }

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
} 