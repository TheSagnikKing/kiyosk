import { QUELIST_FAIL, QUELIST_REQ, QUELIST_SUCCESS, SINGLE_JOINQUEUE_FAIL, SINGLE_JOINQUEUE_REQ, SINGLE_JOINQUEUE_SUCCESS } from "../Constants/QueueConstants"

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