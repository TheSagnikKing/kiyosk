// import React, { useState } from 'react'
// import KyskModal from './KyskModal/KyskModal'

// const Kiyosk = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   return (
//     <>
//     <h1>kiyosks</h1>
//     <button onClick={() => setIsOpen(true)}>toggle</button>
//     <KyskModal isOpen={isOpen} setIsOpen={setIsOpen}/>
//     </>
//   )
// }

// export default Kiyosk


import React, { useEffect, useState } from 'react'
import "./Kiyosk.css"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoIosAddCircle } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { barberListAction, getAllSalonServicesAction, getBarberByMultipleServicesAction, getbarberServicesbyBarberIdAction } from '../../Redux/Actions/BarberActions';
import BarberModal from './BarberModal/BarberModal'
import ServiceModal from './ServiceModal/ServiceModal';
import { singleJoinQueueAction } from '../../Redux/Actions/QueueActions';

const Kiyosk = () => {

  const [isOpen1, setIsOpen1] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)

  const [getBarberServicesBybarberIdLength, setGetBarberServicesBybarberIdLength] = useState(false)
  const [getAllSalonServicesLength, setGetAllSalonServicesLength] = useState(false)
  const [getBarberServicesOfSalonLength, setGetBarberServicesOfSalonLength] = useState(false)

  console.log("GetAllSalon", getAllSalonServicesLength)

  const dispatch = useDispatch()

  const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

  const salonId = LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId


  const [model1, setModel1] = useState(false)
  const [model1services, setModelservices] = useState(false)

  const [model2, setModel2] = useState(false)
  const [model2barber, setModel2barber] = useState(false)


  useEffect(() => {
    if (isOpen1 == true) {
      const fetchAllBarbers = () => {

        setCurrentbarberName("")
        dispatch(barberListAction(salonId))

      }

      fetchAllBarbers()
    }
  }, [isOpen1])

  const barberList = useSelector(state => state.barberList)

  const [selectedbarberId, setSelectedBarberid] = useState(null)
  const [selectedbarberName, setSelectedBarberName] = useState("")
  const [name, setName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")

  const [currentbarberName, setCurrentbarberName] = useState("")

  const barberServiceCallHandler = (barberId, name) => {

      setSelectedBarberid(Number(barberId))
      setSelectedBarberName(name)
      setCurrentbarberName(name)
      dispatch(getbarberServicesbyBarberIdAction(Number(barberId), setModelservices, setGetBarberServicesBybarberIdLength))
      setSelectedService([])

  }

  useEffect(() => {
    if (isOpen2 == true) {
      const fetchAllServices = () => {
        dispatch(getAllSalonServicesAction(Number(salonId), setModel1, setModelservices, setCurrentbarberName, setModel2, setGetAllSalonServicesLength))
        setSelectedService([])
      }

      fetchAllServices()
    }
  }, [isOpen2])


  const getBarberServicesBybarberId = useSelector(state => state.getBarberServicesBybarberId)
  const getAllSalonServices = useSelector(state => state.getAllSalonServices)

  const [selectedService, setSelectedService] = useState([])

  const selectedServiceHandler = (ser) => {

    setSelectedService((prevSelected) => {
      const servicePresent = prevSelected.find((s) => s._id === ser._id);

      if (!servicePresent) {
        return [...prevSelected, ser];
      }

      return prevSelected;
    });
  }

  const selectedServiceDelete = (ser) => {
    const deleteService = selectedService.filter((f) => f._id !== ser._id)
    setSelectedService(deleteService)
  }


  const getBarberByMultipleServices = useSelector(state => state.getBarberByMultipleServices)

  const navigate = useNavigate()

  const joinqueueHandler = () => {

    const queuedata = {
      salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
      name,
      customerEmail,
      mobileNumber,
      joinedQType: "Single-Join",
      methodUsed: "Walk-In",
      barberName: selectedbarberName,
      barberId: selectedbarberId,
      services: selectedService
    }

    // console.log(queuedata)

    const confirm = window.confirm("Are you sure ? ")

    if (confirm) {
      console.log(queuedata)
      dispatch(singleJoinQueueAction(queuedata, setSelectedService, navigate))
      setName("")
    }

  }

  console.log("Today 26/01 selectService", selectedService)
  console.log("Today 26/01 selectedbarberId", selectedbarberId)
  console.log("Today 26/01 selectedbarberName", selectedbarberName)

  const singleJoinQueue = useSelector(state => state.singleJoinQueue)

  const barberServiceCallHandler2 = (barberId, barbername) => {
    const confirm = window.confirm(`Selected barber ${barbername}`)
    if (confirm) {
      setSelectedBarberid(Number(barberId))
      setSelectedBarberName(barbername)
    }

  }


  const fetchSelectedServices = () => {
    const serviceIds = selectedService.map(item => item.serviceId);
    // console.log(serviceIds, salonId)

    setCurrentbarberName("")
    dispatch(getBarberByMultipleServicesAction(salonId, serviceIds, setModel2barber))
    setGetAllSalonServicesLength(false)
    setGetBarberServicesOfSalonLength(true)
  }

  return (

    <div className="singlejoin-barber-quebarber-wrapper">

      <h2>Join Queue</h2>

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
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>


        <div className='kyosk-container'>
          <div className='barber-single-join-dropdown'>
            <p>Barber Name : <b>{currentbarberName && currentbarberName || selectedbarberName && selectedbarberName}</b></p>

            <button onClick={() => setIsOpen1(true)}>Show Barber</button>
            <BarberModal isOpen={isOpen1} setIsOpen={setIsOpen1} barberList={barberList} currentbarberName={currentbarberName} barberServiceCallHandler={barberServiceCallHandler} getBarberServicesBybarberIdLength={getBarberServicesBybarberIdLength} getBarberServicesBybarberId={getBarberServicesBybarberId} selectedService={selectedService} selectedServiceHandler={selectedServiceHandler} selectedServiceDelete={selectedServiceDelete} setGetBarberServicesBybarberIdLength={setGetBarberServicesBybarberIdLength} />
          </div>

          <div className='barber-single-join-dropdown'>
          <p>Choose Services: {selectedService && selectedService.map((s, index) => <span key={index}>{s.serviceName}{index < selectedService.length - 1 ? ',' : ''}</span>)}</p>

            <button onClick={() => setIsOpen2(true)}>Show Services</button>
            <ServiceModal isOpen={isOpen2} setIsOpen={setIsOpen2} getAllSalonServices={getAllSalonServices} getAllSalonServicesLength={getAllSalonServicesLength} selectedService={selectedService} selectedServiceDelete={selectedServiceDelete} selectedServiceHandler={selectedServiceHandler} fetchSelectedServices={fetchSelectedServices} getBarberServicesOfSalonLength={getBarberServicesOfSalonLength} getBarberByMultipleServices={getBarberByMultipleServices} setCurrentbarberName={setCurrentbarberName} setSelectedBarberid={setSelectedBarberid} currentbarberName={currentbarberName} setGetAllSalonServicesLength={setGetAllSalonServicesLength} setGetBarberServicesOfSalonLength={setGetBarberServicesOfSalonLength} setSelectedBarberName={setSelectedBarberName} />
          </div>

        </div>



        <button onClick={joinqueueHandler} className='join-queue-btn'>{
          singleJoinQueue?.loading == true ? <h2>Loading...</h2> : "Join Queue"
        }</button>
      </div>
    </div>
  )
}

export default Kiyosk


