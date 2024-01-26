import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoggedInMiddlewareAction, LoggedOutMiddlewareAction } from '../../Redux/Actions/AuthActions'


const Auth = ({ children }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(LoggedOutMiddlewareAction(navigate))
        dispatch(LoggedInMiddlewareAction(navigate))
    }, [dispatch])


    return (
        <div>{children}</div>
    )
}

export default Auth