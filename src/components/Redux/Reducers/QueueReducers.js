import { QUELIST_FAIL, QUELIST_REQ, QUELIST_SUCCESS, SINGLE_JOINQUEUE_FAIL, SINGLE_JOINQUEUE_REQ, SINGLE_JOINQUEUE_SUCCESS } from "../Constants/QueueConstants"

export const queueListReducer = (state = {},action) => {
    switch(action.type){
        case QUELIST_REQ:
            return {loading:true}
        case QUELIST_SUCCESS:
            return {loading:false,...action.payload}
        case QUELIST_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const singleJoinQueueReducer = (state = {},action) => {
    switch(action.type){
        case SINGLE_JOINQUEUE_REQ:
            return {loading:true}
        case SINGLE_JOINQUEUE_SUCCESS:
            return {loading:false,...action.payload}
        case SINGLE_JOINQUEUE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}