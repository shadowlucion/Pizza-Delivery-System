import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromcart: (state, action) => {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQty: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQty: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0)
        cartSlice.caseReducers.removeFromcart(state, action);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromcart,
  increaseItemQty,
  decreaseItemQty,
  clearCart,
} = cartSlice.actions;

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((price, item) => price + item.totalPrice, 0);

export const getTotalCartQty = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentPizzaQtyById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// (id = (state) =>
//   state.cart.find((item) => item.pizzaId === id)?.item.quantity ?? 0);

export default cartSlice.reducer;

// reselect library for optimizing
