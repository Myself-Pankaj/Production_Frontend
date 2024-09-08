import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../__redux__/slice/authSlice'
import { useMeQuery } from '../__redux__/api/authApi'

const useFetchUser = () => {
    const dispatch = useDispatch()
    const { data, error, isLoading } = useMeQuery(undefined, {
        refetchOnReconnect: true
    })

    const { user } = useSelector((state) => state.auth)

    React.useEffect(() => {
        if (data) {
            dispatch(setCredentials(data))
        }
    }, [data, dispatch])

    return { user, error, isLoading }
}

export default useFetchUser
