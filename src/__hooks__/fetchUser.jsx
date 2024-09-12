import React from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../__redux__/slice/authSlice'
import { useMeQuery } from '../__redux__/api/authApi'
import { toast } from 'react-toastify'
import MessageDisplay from '../__components__/Error/messageDisplay'

export const useFetchUser = () => {
    const dispatch = useDispatch()
    const { data, error, isLoading } = useMeQuery(undefined, {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true
    })
    if (!data) {
        ;<MessageDisplay
            message="Login to access our servies !"
            type="info"
        />
    }

    React.useEffect(() => {
        if (data) {
            dispatch(setCredentials(data))
        }
        if (error) {
            toast.info(error.message)
        }
    }, [data, error, dispatch])

    return { error, isLoading }
}
