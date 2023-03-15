
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.style.js'

import { useContext, useState } from 'react'
import { CartContext } from '../../contexts/cart-context.js'

const CartIcon = () => {

    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;