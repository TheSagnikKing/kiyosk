import { QUELIST_FAIL, QUELIST_REQ, QUELIST_SUCCESS } from "../Constants/QueueConstants"

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