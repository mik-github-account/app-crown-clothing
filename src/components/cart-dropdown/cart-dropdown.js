import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CartContext } from '../../contexts/cart-context'
import Button from '../button/button.js'
import CartItem from '../cart-item/cart-item'
import './cart-dropdown.scss'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items' />
            {cartItems.map((item) =>
                <CartItem key={item.id} cartItem={item} />
            )}
            <Button onClick={goToCheckoutHandler}>Checkout</Button>
        </div>
    )
}

export default CartDropdown;