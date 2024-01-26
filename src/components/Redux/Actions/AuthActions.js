import { ADMIN_GOOGLE_SIGNIN_FAIL, ADMIN_GOOGLE_SIGNIN_REQ, ADMIN_GOOGLE_SIGNIN_SUCCESS, ADMIN_GOOGLE_SIGNUP_SUCCESS, ADMIN_LOGOUT_FAIL, ADMIN_LOGOUT_REQ, ADMIN_LOGOUT_SUCCESS, ADMIN_SIGNIN_REQ, ADMIN_SIGNIN_SUCCESS, LOGGED_IN_MIDDLEWARE_FAIL, LOGGED_IN_MIDDLEWARE_REQ, LOGGED_IN_MIDDLEWARE_SUCCESS, LOGGED_OUT_MIDDLEWARE_FAIL, LOGGED_OUT_MIDDLEWARE_REQ, LOGGED_OUT_MIDDLEWARE_SUCCESS } from "../Constants/AuthConstants";
import api from "../api/Api"

export const AdminLoginAction = (loginData,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_SIGNIN_REQ
        });

        const { data } = await api.post("/api/admin/login", loginData );

        localStorage.setItem("userLoggedIn","true")

        dispatch({
            type: ADMIN_SIGNIN_SUCCESS,
            payload: data
        });

        navigate("/queue")
    } catch (error) {

        dispatch({
            type: LOGIN_FAIL,
            payload:error.response.data
        });
    }
};

export const AdminGoogleloginAction = (token,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_GOOGLE_SIGNIN_REQ
        });

        const { data } = await api.post("/api/admin/google-login",{token:token});

        console.log(data)

        localStorage.setItem("userLoggedIn","true")

        if(data?.message == "Admin registered successfully"){
            dispatch({
                type: ADMIN_GOOGLE_SIGNUP_SUCCESS,
                payload: data
            });
            navigate("/adminaccountdetail")
        }else{
            dispatch({
                type: ADMIN_GOOGLE_SIGNIN_SUCCESS,
                payload: data
            });
            navigate("/queue")
        }
    } catch (error) {

        dispatch({
            type: ADMIN_GOOGLE_SIGNIN_FAIL,
            payload:error.response.data
        });
    }
};

export const AdminLogoutAction = (navigate) => async (dispatch) => {

    try {
         dispatch({
             type: ADMIN_LOGOUT_REQ
         })

         const {data} = await api.post("/api/admin/logout")

         dispatch({
             type: ADMIN_LOGOUT_SUCCESS,
             payload:data
         })
         localStorage.setItem("userLoggedIn","false")
         navigate("/")
    } catch (error) {
         dispatch({
             type: ADMIN_LOGOUT_FAIL,
             payload:error.response.data
         })
    }
}


export const LoggedOutMiddlewareAction = (navigate) => async (dispatch) => {
    try {
        dispatch({
            type:LOGGED_OUT_MIDDLEWARE_REQ
        })
        const { data } = await api.get(`/api/admin/loggedoutmiddleware`);

        dispatch({
            type: LOGGED_OUT_MIDDLEWARE_SUCCESS,
            payload: data
        });
    } catch (error) {
    
        dispatch({
            type: LOGGED_OUT_MIDDLEWARE_FAIL,
            payload:error?.response?.data
        });

        if(error?.response?.data?.message == "Refresh Token not present.Please Login Again"){
            localStorage.setItem("userLoggedIn", "false")
            navigate("/")
        }
    }
};


export const LoggedInMiddlewareAction = (navigate) => async (dispatch) => {
    try {
        dispatch({
            type:LOGGED_IN_MIDDLEWARE_REQ
        })
        const { data } = await api.get(`/api/admin/loggedinmiddleware`);

        dispatch({
            type: LOGGED_IN_MIDDLEWARE_SUCCESS,
            payload: data
        });


    } catch (error) {
    
        dispatch({
            type: LOGGED_IN_MIDDLEWARE_FAIL,
            payload:error?.response?.data
        });

        const userLoggedIn = localStorage.getItem("userLoggedIn")

        if(error?.response?.data && error?.response?.data.user[0] == null && userLoggedIn == "false"){
            console.log("From Admin Auth ")
            navigate("/barber-dashboard")
            window.location.reload()
        }
    }
};





