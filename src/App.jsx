import {Component} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from "./context";

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const quantityToAdd = product.quantity || 1

    this.setState(prevState => {
      const existingItem = prevState.cartList.find(
        item => item.id === product.id,
      )

      if (existingItem) {
        return {
          cartList: prevState.cartList.map(item =>
            item.id === product.id
              ? {...item, quantity: item.quantity + quantityToAdd}
              : item,
          ),
        }
      }

      const newItem = {...product, quantity: quantityToAdd}
      return {cartList: [...prevState.cartList, newItem]}
    })
  }
  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(item =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter(item => item.quantity > 0),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/products" element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } />
          <Route path="/products/:id" element={
            <ProtectedRoute>
              <ProductItemDetails />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </CartContext.Provider>
    )
  }
}

export default App
