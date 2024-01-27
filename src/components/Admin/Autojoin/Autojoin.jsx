import React, { useEffect, useState } from 'react'
import "./Autojoin.css"
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from "react-router-dom"
import { getbarberServicesbyBarberIdAction } from '../../Redux/Actions/BarberActions'
import { autoGetAllSalonServicesAction, autojoinAction } from '../../Redux/Actions/QueueActions'


const Autojoin = () => {

  const dispatch = useDispatch()

  const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

  const currentAdminSalonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId

  useEffect(() => {
    if (currentAdminSalonId) {
      dispatch(autoGetAllSalonServicesAction(Number(currentAdminSalonId)))
    }
  }, [dispatch, currentAdminSalonId])

  const autoGetAllSalonServices = useSelector(state => state.autoGetAllSalonServices)


  const [selectedbarberId, setSelectedBarberid] = useState(null)
  const [selectedbarberName, setSelectedBarberName] = useState("")
  const [name, setName] = useState("")
  const [customerEmail,setCustomerEmail] = useState("")
  const [customerMobile, setCustomerMobile] = useState("")

  const barberServiceCallHandler = (barberId, name) => {
    const selectbarber = window.confirm("Are you sure ?")
    if (selectbarber) {
      setSelectedBarberid(Number(barberId))
      setSelectedBarberName(name)
      dispatch(getbarberServicesbyBarberIdAction(Number(barberId)))
    }

  }

  const getBarberServicesBybarberId = useSelector(state => state.getBarberServicesBybarberId)


  const [selectedService, setSelectedService] = useState([])

  const selectedServiceHandler = (ser) => {
    const servicepresent = selectedService.find((s) => s._id === ser._id)

    if (!servicepresent) {
      const serviceWithEWT = { ...ser, barberServiceEWT: Number(ser.serviceEWT) };

      setSelectedService([...selectedService, serviceWithEWT]);
    }
  }

  const selectedServiceDelete = (ser) => {
    const deleteService = selectedService.filter((f) => f._id !== ser._id)
    setSelectedService(deleteService)
  }

  console.log(selectedService)

  const navigate = useNavigate()

  const joinqueueHandler = () => {
    const joindata = {
      name,
      customerEmail,
      customerMobile,
      joinedQType: "Auto-Join",
      methodUsed: "Walk-In",
      salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
      services: selectedService,
      isOnline: true
    }
    console.log("Autojoi",joindata)

    const confirm = window.confirm("Are you Sure ? ")

    if (confirm) {
      dispatch(autojoinAction(joindata,navigate))
    }
  }

  const autojoin = useSelector(state => state.autojoin)

  return (
      <div className="singlejoin-barber-quebarber-wrapper">

        <h2>Auto Join</h2>

        <div className='barber-single-join'>
          <div>
            <p>Customer Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter Your Customer Name'
            />
          </div>

          <div>
            <p>Customer Email</p>
            <input
              type="text"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder='Enter Your Customer Email'
            />
          </div>

          <div>
            <p>Mobile Number</p>
            <input 
            type="text" 
            placeholder='Enter Customer Mobile Number'
            value={customerMobile}
            onChange={(e) => setCustomerMobile(e.target.value)}
            />
          </div>

          <p>Choose Barber Services</p>
          <div className='barber-single-join-services'>
            <div className='barber-single-join-quebarberserv-content'>
              <p>Service ID</p>
              <p>Service Name</p>
              <p>Service Price</p>
              <p>Estimated Wait Time</p>
              <p>Action</p>
            </div>
            {
              autoGetAllSalonServices?.response?.map((b, index) => (
                <div className='barber-single-join-quebarberserv-content' key={b._id}>
                  <p>{b.serviceId}</p>
                  <p>{b.serviceName}</p>
                  <p>{b.servicePrice}</p>
                  <p>{b.serviceEWT}</p>
                  <button onClick={() => selectedServiceHandler(b, index)}>Add</button>
                </div>
              ))
            }

          </div>


          <p>Your Selected Services</p>
          <div className='barber-single-join-services'>

            <div className='barber-single-join-quebarberserv-content'>
              <p>Service Id</p>
              <p>Service Name</p>
              <p>Service Price</p>
              <p>Estimated Wait Time</p>
              <p>Action</p>
            </div>

            {
              selectedService && selectedService.length > 0 ? selectedService.map((b, index) => (
                <div className='barber-single-join-quebarberserv-content' key={b._id}>
                  <p>{b.serviceId}</p>
                  <p>{b.serviceName}</p>
                  <p>{b.servicePrice}</p>
                  <p>{b.barberServiceEWT}</p>
                  <button onClick={() => selectedServiceDelete(b)}>Del</button>
                </div>
              )) : <p>No Services Available</p>
            }
          </div>

          <button onClick={joinqueueHandler}>{
            autojoin?.loading == true ? <h2>loading...</h2> : "Join Queue"
          }</button>
        </div>
      </div>
  )
}

export default Autojoin

