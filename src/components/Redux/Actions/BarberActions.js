import { GET_ALL_SALON_SERVICES_FAIL, GET_ALL_SALON_SERVICES_REQ, GET_ALL_SALON_SERVICES_SUCCESS, GET_BARBERLIST_FAIL, GET_BARBERLIST_REQ, GET_BARBERLIST_SUCCESS, GET_BARBERS_BY_MULTIPLE_SERVICES_FAIL, GET_BARBERS_BY_MULTIPLE_SERVICES_REQ, GET_BARBERS_BY_MULTIPLE_SERVICES_SUCCESS, GET_BARBER_SERVICES_FAIL, GET_BARBER_SERVICES_REQ, GET_BARBER_SERVICES_SUCCESS } from "../Constants/BarberConstants"
import api from "../api/Api"

export const barberListAction = (salonId,setModel1,setModel2barber,setModel2) => async(dispatch) => {
    try {
        dispatch({type:GET_BARBERLIST_REQ})

        const {data} = await api.post(`/api/queue/getAvailableBarbersForQ?salonId=${salonId}`)

        // dispatch({
        //     type:GET_BARBER_SERVICES_SUCCESS,
        //     payload:{}
        // })

        // dispatch({
        //     type:GET_BARBERLIST_SUCCESS,
        //     payload:{}
        // })

        dispatch({
            type:GET_BARBERLIST_SUCCESS,
            payload:data
        })


    } catch (error) {
        dispatch({
            type:GET_BARBERLIST_FAIL,
            error: error.response
        })
    }
}


export const getbarberServicesbyBarberIdAction = (barberId,setModelservices,setGetBarberServicesBybarberIdLength) => async(dispatch) => {
    try {
        dispatch({type:GET_BARBER_SERVICES_REQ})

        const {data} = await api.get(`/api/barber/getBarberServicesByBarberId?barberId=${barberId}`)

        dispatch({
            type:GET_BARBER_SERVICES_SUCCESS,
            payload:data
        })

        setModelservices(true)
        setGetBarberServicesBybarberIdLength(true)
    } catch (error) {
        dispatch({
            type:GET_BARBER_SERVICES_FAIL,
            payload: error.response.data
        })
    }
}

export const getAllSalonServicesAction = (salonid,setModel1,setModelservices,setCurrentbarberName,setModel2,setGetAllSalonServicesLength) => async(dispatch) => {

    try {
        dispatch({type:GET_ALL_SALON_SERVICES_REQ})

        const {data} = await api.get(`/api/salon/allSalonServices?salonId=${salonid}`)

        dispatch({
            type:GET_BARBER_SERVICES_SUCCESS,
            payload:{}
        })

        dispatch({
            type:GET_BARBERLIST_SUCCESS,
            payload:{}
        })

        dispatch({
            type:GET_BARBERS_BY_MULTIPLE_SERVICES_SUCCESS,
            payload:{}
        })

        setModel1(false)
        setModelservices(false)
        setCurrentbarberName("")

        setModel2(true)

        dispatch({
            type:GET_ALL_SALON_SERVICES_SUCCESS,
            payload:data
        })

        setGetAllSalonServicesLength(true)
    } catch (error) {
        dispatch({
            type:GET_ALL_SALON_SERVICES_FAIL,
            payload: error.response.data
        })
    }
}


export const getBarberByMultipleServicesAction = (salonId,serviceIds,setModel2barber) => async(dispatch) => {
    try {
        dispatch({type:GET_BARBERS_BY_MULTIPLE_SERVICES_REQ})

        const {data} = await api.post(`/api/queue/getBarberByMultipleServiceId?salonId=${salonId}&serviceIds=${serviceIds.join(',')}`)
        console.log(data)
        
        dispatch({
            type:GET_BARBERS_BY_MULTIPLE_SERVICES_SUCCESS,
            payload:data
        })

        setModel2barber(true)
    } catch (error) {
        dispatch({
            type:GET_BARBERS_BY_MULTIPLE_SERVICES_FAIL,
            payload: error.response.data
        })

        console.log(error)
    }
}
