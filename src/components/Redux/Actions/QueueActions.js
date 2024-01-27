import { AUTOJOIN_FAIL, AUTOJOIN_REQ, AUTOJOIN_SUCCESS, AUTO_GETALL_SALON_SERVICES_FAIL, AUTO_GETALL_SALON_SERVICES_REQ, AUTO_GETALL_SALON_SERVICES_SUCCESS, CUSTOMER_API_FAIL, CUSTOMER_API_REQ, CUSTOMER_API_SUCCESS, QUELIST_FAIL, QUELIST_REQ, QUELIST_SUCCESS, SINGLE_JOINQUEUE_FAIL, SINGLE_JOINQUEUE_REQ, SINGLE_JOINQUEUE_SUCCESS } from "../Constants/QueueConstants"

import api from "../api/Api"

export const queueListAction = (salonid) => async(dispatch) => {
    try {
        dispatch({type:QUELIST_REQ})

        const {data} = await api.get(`/api/queue/getQListBySalonId?salonId=${salonid}`)

        dispatch({
            type:QUELIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:QUELIST_FAIL,
            payload: error.response.data
        })
    }
}


export const singleJoinQueueAction = (singlejoindata,setSelectedService,navigate) => async(dispatch) => {
    try {
        dispatch({type:SINGLE_JOINQUEUE_REQ})

        const {data} = await api.post(`/api/queue/singleJoinQueue`,singlejoindata)

        dispatch({
            type:SINGLE_JOINQUEUE_SUCCESS,
            payload:data
        })

        setSelectedService([])
        navigate("/queue")
    } catch (error) {
        dispatch({
            type:SINGLE_JOINQUEUE_FAIL,
            payload: error.response.data
        })

        alert( error.response.data.message)
    }
}


export const customerApiAction = (salonId) => async(dispatch) => {
    try {
        dispatch({type:CUSTOMER_API_REQ})

        const {data} = await api.post(`/api/customer/customerDashboard`,{salonId:salonId})

        dispatch({
            type:CUSTOMER_API_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:CUSTOMER_API_FAIL,
            payload: error.response.data
        })

        alert( error.response.data.message)
    }
}


export const autojoinAction = (joindata,navigate) => async(dispatch) => {
    try {
        dispatch({type:AUTOJOIN_REQ})

        const {data} = await api.post(`/api/queue/autoJoin`, joindata)

        dispatch({
            type:AUTOJOIN_SUCCESS,
            payload:data
        })

        navigate("/queue")
    } catch (error) {
        dispatch({
            type:AUTOJOIN_FAIL,
            payload: error
        })
    }
}


export const autoGetAllSalonServicesAction = (salonid) => async(dispatch) => {

    try {
        dispatch({type:AUTO_GETALL_SALON_SERVICES_REQ})

        const {data} = await api.get(`/api/salon/allSalonServices?salonId=${salonid}`)

        dispatch({
            type:AUTO_GETALL_SALON_SERVICES_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:AUTO_GETALL_SALON_SERVICES_FAIL,
            payload: error.response.data
        })
    }
}