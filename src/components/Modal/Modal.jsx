// Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { MdClose } from "react-icons/md";
import { GET_ALL_SALON_SERVICES_SUCCESS, GET_BARBERLIST_SUCCESS, GET_BARBERS_BY_MULTIPLE_SERVICES_SUCCESS, GET_BARBER_SERVICES_SUCCESS } from '../Redux/Constants/BarberConstants';
import { useDispatch } from 'react-redux';

const Modal = ({ isOpen, setIsOpen, children, setGetBarberServicesBybarberIdLength, setGetAllSalonServicesLength, setGetBarberServicesOfSalonLength }) => {
  if (!isOpen) {
    return null;
  }

  const dispatch = useDispatch()

  const closeModal = () => {

    dispatch({
      type: GET_BARBERLIST_SUCCESS,
      payload: {}
    })

    dispatch({
      type: GET_BARBER_SERVICES_SUCCESS,
      payload: { response: [] }
    })

    dispatch({
      type: GET_ALL_SALON_SERVICES_SUCCESS,
      payload: {}
    })

    dispatch({
      type: GET_BARBERS_BY_MULTIPLE_SERVICES_SUCCESS,
      payload: {}
    })
    setIsOpen(false)

    if (setGetBarberServicesBybarberIdLength) {
      setGetBarberServicesBybarberIdLength(false)
    }

    if (setGetAllSalonServicesLength) {
      setGetAllSalonServicesLength(false)
    }

    if (setGetBarberServicesOfSalonLength) {
      setGetBarberServicesOfSalonLength(false)
    }
  }

  return ReactDOM.createPortal(
    <div className="main-modal-container">
      <div>
        <div className="modal-content"><button onClick={closeModal} className='main-modal-close'><MdClose /></button>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('overlays') // Ensure you have a div with id="modal-root" in your HTML file
  );
};

export default Modal;


