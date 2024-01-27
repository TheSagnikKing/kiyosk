import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { AdminLoginReducer, AdminLogoutReducer, LoggedInMiddlewareReducer, LoggedOutMiddlewareReducer } from "./Reducers/AuthReducers";
import { autoGetAllSalonServicesReducer, autoJoinReducer, customerApiReducer, queueListReducer, singleJoinQueueReducer } from "./Reducers/QueueReducers";
import { barberListReducer, getAllSalonServicesReducer, getBarberByMultipleServicesReducer, getBarberServicesBybarberIdReducer } from "./Reducers/BarberReducers";

const rootReducer = combineReducers({
  AdminLogin: AdminLoginReducer,
  AdminLogout: AdminLogoutReducer,
  LoggedInMiddleware: LoggedInMiddlewareReducer,
  LoggedOutMiddleware: LoggedOutMiddlewareReducer,
  queueList:queueListReducer,

  barberList:barberListReducer,
  getBarberServicesBybarberId:getBarberServicesBybarberIdReducer,
  getAllSalonServices:getAllSalonServicesReducer,
  getBarberByMultipleServices:getBarberByMultipleServicesReducer,
  singleJoinQueue:singleJoinQueueReducer,
  customerApi:customerApiReducer,
  autoJoin:autoJoinReducer,
  autoGetAllSalonServices:autoGetAllSalonServicesReducer
});

const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;