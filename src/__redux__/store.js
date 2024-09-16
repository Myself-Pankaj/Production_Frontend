import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slice/authSlice'
import infoReducer from './slice/infoSlice'
import { authAPI } from './api/authApi'
import { cabAPI } from './api/cabApi'
import { otherAPI } from './api/otherApi'
import { orderAPI } from './api/orderApi'
import { driverAPI } from './api/driverApi'
import { adminAPI } from './api/adminApi'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        info: infoReducer,
        [adminAPI.reducerPath]: adminAPI.reducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [cabAPI.reducerPath]: cabAPI.reducer,
        [driverAPI.reducerPath]: driverAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [otherAPI.reducerPath]: otherAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authAPI.middleware)
            .concat(cabAPI.middleware)
            .concat(otherAPI.middleware)
            .concat(orderAPI.middleware)
            .concat(driverAPI.middleware)
            .concat(adminAPI.middleware)
})
