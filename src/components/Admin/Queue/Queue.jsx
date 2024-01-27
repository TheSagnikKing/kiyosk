import React, { useEffect, useState } from 'react'
import "./Queue.css"

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { GiCancel } from "react-icons/gi";
import { PiQueueBold } from "react-icons/pi"
import { customerApiAction, queueListAction } from '../../Redux/Actions/QueueActions'
import { AdminLogoutAction } from '../../Redux/Actions/AuthActions';
import AdvertisementSlider from '../Kiyosk/AdvertisementSlider/AdvertisementSlider';

const Queue = () => {

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const salonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId;

    const dispatch = useDispatch()

    useEffect(() => {
        if (salonId) {
            dispatch(queueListAction(Number(salonId)))

            dispatch(customerApiAction(Number(salonId)))
        }
    }, [dispatch, salonId])

    const queueList = useSelector(state => state.queueList)

    const navigate = useNavigate()

    const logoutHandler = async () => {
        dispatch(AdminLogoutAction(navigate))
    }

    const customerApi = useSelector(state => state.customerApi)


    return (
        <div className='queue-wrapper'>
            <div className='top-upper-head'>
                <div><div><img src={customerApi?.response?.salonInfo?.salonLogo[0].url} alt="Salon Logo" /> </div> <h3>{customerApi?.response?.salonInfo?.salonName}</h3> </div>

                <div>
                    <b>Barber On Duty : <span style={{ color: "red" }}>{customerApi?.response?.barberOnDuty}</span></b>
                    <b>Total Queue Count : <span style={{ color: "red" }}>{customerApi?.response?.totalQueueCount}</span></b>
                    <b>Least In Queue : <span style={{ color: "red" }}>{customerApi?.response?.leastQueueCount}</span></b>
                    <b>Least Barber EWT : <span style={{ color: "red" }}>{customerApi?.response?.leastBarberEWT}</span></b>
                </div>
            </div>
            <button onClick={() => logoutHandler()}>Logout</button>
            <div>
                <h2>Queue List </h2>
                
                <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                <p><Link to="/kiosk">Join Queue</Link></p>
                <p><Link to="/autojoin">Auto Join</Link></p>
                </div>
            </div>

            <div className='queue-list-table'>

                <div className='que-lst-head'>
                    <b>#</b>
                    <b>TimeJoinedQ</b>
                    <b>Method-Used</b>
                    <b>Barber Name</b>
                    <b>Customer Name</b>
                    <b>Q Position</b>
                    <b>Estimated Wait Time</b>
                    <b>Services</b>
                </div>

                {
                    queueList?.response?.map((c, index) => (
                        <div className='que-lst-content' key={c._id}>

                            <p>{index + 1}</p>
                            <p>{c.methodUsed}</p>
                            <p>{c.timeJoinedQ}</p>
                            <p>{c.barberName}</p>
                            <p>{c.name}</p>
                            <p>{c.qPosition}</p>
                            <p>{c.customerEWT}</p>
                            <p>{c.serviceName}</p>
                        </div>
                    ))
                }


            </div>

            <div className='advertisement'>

                <AdvertisementSlider />
            </div>
        </div>

    )
}

export default Queue