import { createSlice } from '@reduxjs/toolkit'
import { login, register, update, verify } from '../thunks/authThunk'

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
const isAuthenticated = localStorage.getItem('token') ? true : false

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        error: null,
        token,
        isAuthenticated
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
                state.isAuthenticated = true
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
            })
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = null
                state.isAuthenticated = false
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data
                state.token = action.payload.token
                state.isAuthenticated = action.payload.data.isVerified
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
            })
            .addCase(verify.pending, (state) => {
                state.loading = true
                state.error = null
                state.isAuthenticated = false
            })
            .addCase(verify.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data
                localStorage.setItem('token', action.payload.token)
                state.isAuthenticated = true
            })
            .addCase(verify.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
            })
            .addCase(update.pending, (state) => {
                state.loading = true
                state.error = null
                state.isAuthenticated = true
            })
            .addCase(update.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data
                state.isAuthenticated = true
            })
            .addCase(update.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
            })
    }
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer
