import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import './style/cart.scss'
import { addToCart, removeFromCart, decreaseCart, clearCart, getTotal } from "../features/cartSlice"
import { useEffect } from "react"
// import { useState, useEffect } from "react"
const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const handleRemoveCart = (item) => {
    dispatch(removeFromCart(item))
  }
  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseCart(item))
  }
  const handleAddToCart = (item) => {
    dispatch(addToCart(item))
  }
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  useEffect(() => { dispatch(getTotal()) }, [cart])
  // const [totalPrice, setTotalPrice] = useState(0)
  // useEffect(() => {
  //   setTotalPrice(cart.cartItem.reduce((total, product) =>
  //     total + (product.price * product.cartQuantity), 0
  //   ))
  // }, [])

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItem.length === 0 ? (
        <div className="cart-empty">
          Your Cart Is Currently Empty
          <div className="start-shopping">
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItem?.map(cartItem => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={cartItem.img} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.desc}</p>
                    <button onClick={() => handleRemoveCart(cartItem)}>Remove</button>
                  </div>
                </div>
                <div className="cart-product-price">
                  ${cartItem.price}
                </div>
                <div className="cart-product-quantity">
                  <button onClick={() => handleDecreaseQuantity(cartItem)}>-</button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={() => handleAddToCart(cartItem)}>+</button>
                </div>
                <div className="cart-product-total-price">
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-cart" onClick={() => handleClearCart()}>Clear Cart</button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal:</span>
                <span className="amount">${cart.cartTotalAmount}</span>
                {/* <span>${totalPrice}</span> */}
              </div>
              <p>Taxes and shipping calculated at Checkout</p>
              <button>Check Out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;