import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
const initialState = {
  cartItem: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
}
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id
      )
      if (itemIndex >= 0) {
        state.cartItem[itemIndex].cartQuantity += 1
        toast.success("The product has been added to your cart.", {
          position: "bottom-left",
          autoClose: 1500
        })
      }
      else {
        const tempProduct = { ...action.payload, cartQuantity: 1 }
        state.cartItem.push(tempProduct)
        toast.success(`${action.payload.name} has been added to your cart.`, {
          position: "bottom-left",
          autoClose: 1500
        })
      }

      // state.cartTotalQuantity += 1;
      // state.cartTotalAmount = state.cartItem.reduce((total, product) =>
      //   total + (product.price * product.cartQuantity), 0
      // );
      // state.cartTotalAmount += item.cartQuantity;
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem))
    },
    removeFromCart(state, action) {
      const nextCartItem = state.cartItem.filter(
        (item) => item.id !== action.payload.id
      )
      if (nextCartItem) {
        state.cartTotalQuantity -= action.payload.cartQuantity
        // state.cartTotalAmount = state.cartItem.reduce((total, product) =>
        //   total + (product.price * product.cartQuantity), 0
        // );
        // // state.cartTotalAmount -= item.cartQuantity;
      }
      state.cartItem = nextCartItem
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem))

      toast.success(`${action.payload.name} has been remove to your cart.`, {
        position: "bottom-left",
        autoClose: 1500
      })
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItem.findIndex(
        (Item) => Item.id === action.payload.id
      )
      if (state.cartItem[itemIndex].cartQuantity > 1) {
        state.cartItem[itemIndex].cartQuantity -= 1
        toast.success(`Decrease ${action.payload.name} cart quantity.`, {
          position: "bottom-left",
          autoClose: 1500
        })
      }
      else {
        const nextCartItem = state.cartItem.filter(
          (item) => item.id !== action.payload.id
        )
        state.cartItem = nextCartItem
        // state.cartItem.splice(itemIndex, 1)
        toast.success(`${action.payload.name} has been remove to your cart.`, {
          position: "bottom-left",
          autoClose: 1500
        })
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem))
    },
    clearCart(state) {
      state.cartItem = []
      toast.success(`Cart Cleared`, {
        position: "bottom-left",
        autoClose: 1500
      })
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem))
    },
    getTotal(state, action) {
      let { total, quantity } = state.cartItem.reduce((cartTotal, item) => {
        const { price, cartQuantity } = item
        const itemTotal = price * cartQuantity
        cartTotal.total += itemTotal
        cartTotal.quantity += cartQuantity
        return cartTotal
      }, {
        total: 0,
        quantity: 0
      })
      state.cartTotalAmount = total
      state.cartTotalQuantity = quantity

    }
  }

})

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotal } = cartSlice.actions

export default cartSlice.reducer