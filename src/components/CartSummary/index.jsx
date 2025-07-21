import CartContext from "../../context";
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalAmount = cartList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )

      return (
        <div className="cart-summary-container">
          <h1 className="cart-summary-heading">
            Order Total:{' '}
            <span className="summary-amount">Rs {totalAmount}/-</span>
          </h1>
          <p className="summary-items">{cartList.length} Items in cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
