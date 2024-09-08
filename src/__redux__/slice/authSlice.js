import { createSlice } from '@reduxjs/toolkit'
import { login, register, update, verify } from '../thunks/authThunk'

// Create slice

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        error: null,
        token
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.error = null
            localStorage.removeItem('token')
        },
        setCredentials: (state, { payload }) => {
            state.user = payload.data
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data
                state.token = action.payload.token
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data
                state.token = action.payload.token
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(verify.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(verify.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(verify.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(update.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(update.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data
            })
            .addCase(update.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer
