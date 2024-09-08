import { createAsyncThunk } from '@reduxjs/toolkit'

const server = import.meta.env.VITE_SERVER

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await fetch(`${server}/api/v1/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Login failed')
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${server}/api/v1/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            credentials: 'include'
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Registration failed')
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const verify = createAsyncThunk('auth/verify', async (verificationData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${server}/api/v1/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(verificationData),
            credentials: 'include'
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Verification failed')
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const update = createAsyncThunk('auth/update', async (newData, { rejectWithValue, getState }) => {
    try {
        const token = getState().auth.token
        const response = await fetch(`${server}/api/v1/modify`, {
            method: 'PUT',
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: newData,
            credentials: 'include'
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Update failed')
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
