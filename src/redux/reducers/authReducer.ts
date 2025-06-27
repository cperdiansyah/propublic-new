import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state, action) => {
      state.user = null
      state.token = null
    },
  },
  // extraReducers: {
  //   [getUser.fulfilled]: (state, action) => {
  //     state.user = action.payload.user;
  //   },
  //   [updateUser.fulfilled]: (state, action) => {
  //     state.user = action.payload.user;
  //   },
  // },
})

export const authAction = { ...authSlice.actions }

export default authSlice.reducer
