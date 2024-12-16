import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSignedIn: false,
    userProfile: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.isSignedIn = true;
            state.userProfile = action.payload;
        },
        signOut: (state, action) => {
            state.isSignedIn = false;
            state.userProfile = null;
        },
    },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;