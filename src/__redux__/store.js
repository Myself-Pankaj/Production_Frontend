import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slice/authSlice'
import { authAPI } from './api/authApi'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authAPI.reducerPath]: authAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware)
})
