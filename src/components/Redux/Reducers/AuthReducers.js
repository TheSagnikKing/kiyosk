import { ADMIN_GOOGLE_SIGNIN_FAIL, ADMIN_GOOGLE_SIGNIN_REQ, ADMIN_GOOGLE_SIGNIN_SUCCESS, ADMIN_GOOGLE_SIGNUP_SUCCESS, ADMIN_LOGOUT_FAIL, ADMIN_LOGOUT_REQ, ADMIN_LOGOUT_SUCCESS, ADMIN_SIGNIN_FAIL, ADMIN_SIGNIN_REQ, ADMIN_SIGNIN_SUCCESS, LOGGED_IN_MIDDLEWARE_FAIL, LOGGED_IN_MIDDLEWARE_REQ, LOGGED_IN_MIDDLEWARE_SUCCESS, LOGGED_OUT_MIDDLEWARE_FAIL, LOGGED_OUT_MIDDLEWARE_REQ, LOGGED_OUT_MIDDLEWARE_SUCCESS } from "../Constants/AuthConstants";


export const AdminLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_SIGNIN_REQ:
            return { ...state, loading: true };
        case ADMIN_SIGNIN_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case ADMIN_SIGNIN_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const AdminGoogleLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GOOGLE_SIGNIN_REQ:
            return { ...state, loading: true };
        case ADMIN_GOOGLE_SIGNIN_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case ADMIN_GOOGLE_SIGNUP_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case ADMIN_GOOGLE_SIGNIN_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export const AdminLogoutReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_LOGOUT_REQ:
            return { ...state, loading: true };
        case ADMIN_LOGOUT_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case ADMIN_LOGOUT_FAIL:
            return { ...state, loading: false, error: action.payload }; 
        default:
            return state;
    }
};


//Global refresh token not present error handling middleware
export const LoggedOutMiddlewareReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGGED_OUT_MIDDLEWARE_REQ:
            return { ...state, loading: true };
        case LOGGED_OUT_MIDDLEWARE_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case LOGGED_OUT_MIDDLEWARE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const LoggedInMiddlewareReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGGED_IN_MIDDLEWARE_REQ:
            return { ...state, loading: true };
        case LOGGED_IN_MIDDLEWARE_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case LOGGED_IN_MIDDLEWARE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


