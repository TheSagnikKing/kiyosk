import { AUTOJOIN_FAIL, AUTOJOIN_REQ, AUTOJOIN_SUCCESS, AUTO_GETALL_SALON_SERVICES_FAIL, AUTO_GETALL_SALON_SERVICES_REQ, AUTO_GETALL_SALON_SERVICES_SUCCESS, CUSTOMER_API_FAIL, CUSTOMER_API_REQ, CUSTOMER_API_SUCCESS, QUELIST_FAIL, QUELIST_REQ, QUELIST_SUCCESS, SINGLE_JOINQUEUE_FAIL, SINGLE_JOINQUEUE_REQ, SINGLE_JOINQUEUE_SUCCESS } from "../Constants/QueueConstants"

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


export const customerApiReducer = (state = {},action) => {
    switch(action.type){
        case CUSTOMER_API_REQ:
            return {loading:true}
        case CUSTOMER_API_SUCCESS:
            return {loading:false,...action.payload}
        case CUSTOMER_API_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}


export const autoJoinReducer = (state = {},action) => {
    switch(action.type){
        case AUTOJOIN_REQ:
            return {loading:true}
        case AUTOJOIN_SUCCESS:
            return {loading:false,...action.payload}
        case AUTOJOIN_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const autoGetAllSalonServicesReducer = (state = {},action) => {
    switch(action.type){
        case AUTO_GETALL_SALON_SERVICES_REQ:
            return {loading:true}
        case AUTO_GETALL_SALON_SERVICES_SUCCESS:
            return {loading:false,...action.payload}
        case AUTO_GETALL_SALON_SERVICES_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}