import React from 'react'
import CartItem from './CartItem'

function CartItemsContainer({cartItems}) {
    console.log(cartItems)
  return (
    <div className="container">
        <div className="h3 w-75 text-center">Item List</div>
        {cartItems.map(course => (
            <CartItem key={course.id} courseItem={course}/>
        ))}
    </div>
  )
}

export default CartItemsContainer