import React from 'react'
import Modal from '../../../Modal/Modal'
import { TiTick } from 'react-icons/ti'
import { RxCross2 } from 'react-icons/rx'
import { IoIosAddCircle } from 'react-icons/io'
import { FaRegClock } from 'react-icons/fa'
import ClipLoader from "react-spinners/ClipLoader";

const ServiceModal = ({isOpen, setIsOpen, getAllSalonServices, getAllSalonServicesLength,selectedService,selectedServiceDelete,selectedServiceHandler,fetchSelectedServices, getBarberServicesOfSalonLength, getBarberByMultipleServices,setCurrentbarberName,setSelectedBarberid, currentbarberName,setGetAllSalonServicesLength,setGetBarberServicesOfSalonLength, setSelectedBarberName}) => {

  return (
    <>
    {
      getAllSalonServicesLength == true && <Modal isOpen={isOpen} setIsOpen={setIsOpen} setGetAllSalonServicesLength={setGetAllSalonServicesLength}><div className='model2'>
      {
        getAllSalonServices?.loading == false && getAllSalonServices?.response ? getAllSalonServices?.response?.map((b, index) => (
          <div key={b._id}>
            <div>
              <div>
                <h3>{b.serviceName}</h3>
                <p>(4.0) 20  reviews</p>
              </div>

              {
                selectedService.includes(b) ? (
                  <div className='model1-barber-icons'>
                    <div style={{
                      fontSize: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "green",
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                      boxShadow: "0px 0px 4px rgba(0,0,0,0.5)"

                    }}><TiTick /></div>
                    <div style={{
                      fontSize: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "red",
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                      boxShadow: "0px 0px 4px rgba(0,0,0,0.5)"
                    }} onClick={() => selectedServiceDelete(b)}><RxCross2 /></div>
                  </div>
                ) : (
                  <div onClick={() => selectedServiceHandler(b)}>
                    <IoIosAddCircle />
                  </div>
                )
              }


            </div>

            <div>
              <div>
                <p>Hair cut</p>
                <p>Hair Spa</p>
              </div>

              <div>
                <h2>${b.servicePrice}</h2>
                <div>
                  <div><FaRegClock /></div>
                  <p>{b.barberServiceEWT} mins</p>
                </div>
              </div>
            </div>
          </div>
        )) : <div className='kiyosk-loader'><ClipLoader size={50}/></div>
      }

      {
        selectedService.length > 0 && <button onClick={() => fetchSelectedServices()} className='services-search-btn' >Search</button>
      }

    </div></Modal> 
    }

    {
      getBarberServicesOfSalonLength == true && <Modal isOpen={isOpen} setIsOpen={setIsOpen} setGetBarberServicesOfSalonLength={setGetBarberServicesOfSalonLength}><div className='model1'>

      {getBarberByMultipleServices?.loading == false && getBarberByMultipleServices?.response ? getBarberByMultipleServices?.response?.map((barber) => (
        <div key={barber._id}>
          <div >
            <div>
              <div><img src="https://png.pngtree.com/background/20230530/original/pngtree-man-looking-for-a-good-mens-beauty-look-picture-image_2791625.jpg" alt="" /></div>

              <div>
                <h3>{barber.name}</h3>
                <p>(4.5)</p>
                <p>Cutting, Styling,Hair color, Hair Straightening</p>
              </div>
            </div>
            <div>
              <p>Queued</p>
              <h2>{barber.queueCount}</h2>
            </div>

            {currentbarberName == barber.name ? <div style={{
              fontSize: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "green",
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              boxShadow: "0px 0px 4px rgba(0,0,0,0.5)"
            }}><TiTick /></div> : <div onClick={() => {
              setSelectedBarberName(barber.name)
              setCurrentbarberName(barber.name)
              setSelectedBarberid(barber.barberId)
            }}>
              <IoIosAddCircle />
            </div>}

          </div>

          <div>
            <div>
              <p>Next available position</p>
              <h2>3</h2>
            </div>
            <div>
              <p>Estimated Time</p>
              <h2>{barber.barberEWT} mins</h2>
            </div>
          </div>

        </div>
      )) : <div className='kiyosk-loader'><ClipLoader size={50}/></div>} 


    </div> </Modal>
    }
    </>
  )
}

export default ServiceModal