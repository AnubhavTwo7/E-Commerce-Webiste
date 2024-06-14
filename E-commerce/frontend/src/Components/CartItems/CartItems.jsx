import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
        const {getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext)
        const [showCheckoutPopup, setShowCheckoutPopup] = useState(false)
        const [orderNumber, setOrderNumber] = useState(null)

        const handleCheckout = () => {
            setShowCheckoutPopup(true)
            setOrderNumber(Math.floor(Math.random() * 100000)) 
        }

    return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id] > 0)
            {
                return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon'/>
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price*cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                            </div>
                            <hr />
                        </div>
                        );
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code'/>
                    <button>SUBMIT</button>
                </div>
            </div>
            {showCheckoutPopup && (
                <div className="checkout-popup">
                    <h2>Order Placed!</h2>
                    <p>Your order number is: #{orderNumber}</p>
                    <button onClick={() => setShowCheckoutPopup(false)}>Close</button>
            </div>
      )}
        </div>
    </div>
  )
}

export default CartItems