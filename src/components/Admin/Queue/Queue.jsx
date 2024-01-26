import React, { useEffect } from 'react'
import "./Queue.css"

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { GiCancel } from "react-icons/gi";
import { PiQueueBold } from "react-icons/pi"
import { queueListAction } from '../../Redux/Actions/QueueActions'
import { AdminLogoutAction } from '../../Redux/Actions/AuthActions';

const Queue = () => {

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const salonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId;

    const dispatch = useDispatch()

    useEffect(() => {
        if (salonId) {
            dispatch(queueListAction(Number(salonId)))
        }
    }, [dispatch, salonId])

    const queueList = useSelector(state => state.queueList)

    const navigate = useNavigate()

    const logoutHandler = async () => {
        dispatch(AdminLogoutAction(navigate))
    }

    return (
        <div className='queue-wrapper'>
            <button onClick={() => logoutHandler()}>Logout</button>
            <div>
                <h2>Queue List </h2>

                <p><Link to="/kiosk">Join Queue</Link></p>
            </div>

            <div className='queue-list-table'>

                <div className='que-lst-head'>
                    <p>Serial Number</p>
                    <p>TimeJoinedQ</p>
                    <p>Barber Name</p>
                    <p>Customer Name</p>
                    <p>Q Position</p>
                    <p>Estimated Wait Time</p>
                </div>

                {
                    queueList?.response?.map((c,index) => (
                        <div className='que-lst-content' key={c._id}>

                            <p>{index + 1}</p>
                            <p>{c.timeJoinedQ}</p>
                            <p>{c.barberName}</p>
                            <p>Not Available</p>
                            <p>{c.qPosition}</p>
                            <p>{c.customerEWT}</p>
                        </div>
                    ))
                }


            </div>
        </div>

    )
}

export default Queue