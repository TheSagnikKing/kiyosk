import { GET_ALL_SALON_SERVICES_FAIL, GET_ALL_SALON_SERVICES_REQ, GET_ALL_SALON_SERVICES_SUCCESS, GET_BARBERLIST_FAIL, GET_BARBERLIST_REQ, GET_BARBERLIST_SUCCESS, GET_BARBERS_BY_MULTIPLE_SERVICES_FAIL, GET_BARBERS_BY_MULTIPLE_SERVICES_REQ, GET_BARBERS_BY_MULTIPLE_SERVICES_SUCCESS, GET_BARBER_SERVICES_FAIL, GET_BARBER_SERVICES_REQ, GET_BARBER_SERVICES_SUCCESS } from "../Constants/BarberConstants"

export const barberListReducer = (state = {},action) => {
    switch(action.type){
        case GET_BARBERLIST_REQ:
            return {loading:true}
        case GET_BARBERLIST_SUCCESS:
            return {loading:false,...action.payload}
        case GET_BARBERLIST_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const getBarberServicesBybarberIdReducer = (state = {response:[]},action) => {
    switch(action.type){
        case GET_BARBER_SERVICES_REQ:
            return {loading:true}
        case GET_BARBER_SERVICES_SUCCESS:
            return {loading:false,...action.payload}
        case GET_BARBER_SERVICES_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const getAllSalonServicesReducer = (state = {},action) => {
    switch(action.type){
        case GET_ALL_SALON_SERVICES_REQ:
            return {loading:true}
        case GET_ALL_SALON_SERVICES_SUCCESS:
            return {loading:false,...action.payload}
        case GET_ALL_SALON_SERVICES_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}


export const getBarberByMultipleServicesReducer = (state = {},action) => {
    switch(action.type){
        case GET_BARBERS_BY_MULTIPLE_SERVICES_REQ:
            return {loading:true}
        case GET_BARBERS_BY_MULTIPLE_SERVICES_SUCCESS:
            return {loading:false,...action.payload}
        case GET_BARBERS_BY_MULTIPLE_SERVICES_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}
