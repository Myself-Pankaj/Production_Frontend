import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    from: '',
    to: '',
    pickupDate: null,
    dropOffDate: null,
    cabType: 'OneWay',
    distance: 0
}
const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        updateFormField: (state, action) => {
            const { field, value } = action.payload
            state[field] = value
            sessionStorage.setItem('infoForm', JSON.stringify(state))
        },
        resetForm: (state) => {
            Object.assign(state, initialState)
            sessionStorage.removeItem('infoForm')
        }
    }
})
export const { updateFormField, resetForm } = infoSlice.actions

export default infoSlice.reducer
