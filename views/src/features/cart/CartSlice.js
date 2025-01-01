import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks for making API calls
export const getCart = createAsyncThunk('cart/getCart', async (userId) => {
  const response = await fetch(`http://localhost:3001/api/cart/${userId}`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch cart');
  }
});

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (itemData) => {
    const response = await fetch('http://localhost:3001/api/cart/add-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to add item to cart');
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async ({ itemId, quantity }) => {
    const response = await fetch(`http://localhost:5000/api/cart/item/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to update item quantity');
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (itemId) => {
    const response = await fetch(`http://localhost:5000/api/cart/item/${itemId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return itemId;
    } else {
      throw new Error('Failed to remove item from cart');
    }
  }
);

export const clearCart = createAsyncThunk('cart/clearCart', async (cartId) => {
  const response = await fetch(`http://localhost:5000/api/cart/${cartId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    return cartId;
  } else {
    throw new Error('Failed to clear cart');
  }
});

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    status: 'idle', // or 'loading' or 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.items.push(action.payload);
        }
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        const item = state.cart.items.find((item) => item.cart_item_id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.cart.items = state.cart.items.filter((item) => item.cart_item_id !== action.payload);
      })
    //   .addCase(syncCart.fulfilled, (state, action) => {
    //     state.cart = action.payload;
    //   })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart.items = [];
      });
  },
});

export default cartSlice.reducer;
