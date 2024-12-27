import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// thunk for fetching cart from the api backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const response = await fetch(
    `http://localhost:3001//api/carts?user_id=${userId}`
  );
  return response.data;
});

// thunk for syncing the cart with the backend

export const syncCartWithBackend = createAsyncThunk(
  "cart/syncCartWithBackend",
  async (cart) => {
    const response = await axios.post("http://localhost:3001/api/carts/sync");
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart_id: null,
    user_id: null,
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    status: "idle",
    error: null,
  },

  reducers: {
    addItem(state, action) {
      const { cart_id, product_id, quantity, price } = action.payload;
      if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
      }
      if (price < 0) {
        throw new Error("Price must be non-negative");
      }

      const existingItem = state.items.find(
        (item) => item.product_id === product_id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * price;
        existingItem.updated_at = new Date().toISOString;
      } else {
        state.items.push({
          cart_id,
          product_id,
          quantity,
          price,
          totalPrice: quantity * price,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
      state.totalQuantity += quantity;
      state.totalPrice += quantity * price;
      state.updated_at = new Date().toISOString();
    },
    updateItemQuantity(state, action) {
      const { product_id, quantity } = action.payload;

      if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
      }

      const existingItem = state.items.find(
        (item) => item.product_id === product_id
      );
      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalPrice +=
          (quantity - existingItem.quantity) * existingItem.price;

        existingItem.quantity = quantity;
        existingItem.totalPrice = quantity * existingItem.price;
        existingItem.updated_at = new Date().toISOString();
        state.updated_at = new Date().toISOString();
      } else {
        throw new Error("Item not found in the cart");
      }
    },
    removeItem(state, action) {
      const { product_id } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product_id === product_id
      );
      if (itemIndex >= 0) {
        const removedItem = state.items[itemIndex];
        state.totalQuantity -= removedItem.quantity;
        state.totalPrice -= removedItem.totalPrice;
        state.items.splice(itemIndex, 1);
        state.updated_at = new Date().toISOString();
      } else {
        throw new Error("Item not found in the cart");
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.updated_at = new Date().toISOString;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        const {
          cart_id,
          user_id,
          items,
          totalQuantity,
          totalPrice,
          created_at,
          updated_at,
        } = action.payload;

        state.cart_id = cart_id;
        state.user_id = user_id;
        state.items = items;
        state.totalQuantity = totalQuantity;
        state.totalPrice = totalPrice;
        state.created_at = created_at;
        state.updated_at = updated_at;
        state.status = "succeeded";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(syncCartWithBackend.fulfilled, (state, action) => {
        const { cart_id, user_id, items, totalQuantity, totalPrice, created_at, updated_at } = action.payload;

        state.cart_id = cart_id;
        state.user_id = user_id;
        state.items = items;
        state.totalQuantity = totalQuantity;
        state.totalPrice = totalPrice;
        state.created_at = created_at;
        state.updated_at = updated_at;
        state.status = "succeeded";
    })
    .addCase(syncCartWithBackend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    });
  },
});

export const { addItem, updateItemQuantity, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
