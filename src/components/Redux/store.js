import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { AdminLoginReducer, AdminLogoutReducer, LoggedInMiddlewareReducer, LoggedOutMiddlewareReducer } from "./Reducers/AuthReducers";
import { queueListReducer, singleJoinQueueReducer } from "./Reducers/QueueReducers";
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
  singleJoinQueue:singleJoinQueueReducer
});

const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;