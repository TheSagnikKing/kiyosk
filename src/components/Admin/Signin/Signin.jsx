import React, { useEffect, useState } from 'react'
import './SignIn.css'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { BiHide, BiShow } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';

import { AdminLoginAction, AdminGoogleloginAction } from "../../Redux/Actions/AuthActions"
import { useDispatch, useSelector } from 'react-redux'

import { getToken } from "firebase/messaging";
import { messaging } from '../../firebase';

import ClipLoader from "react-spinners/ClipLoader";

const SignIn = () => {

    //For the notification part 

    const [webFcmToken, setWebFcmToken] = useState("")

    const requestPermission = async () => {
        const permission = await Notification.requestPermission()

        if (permission == 'granted') {
            //Generate Token
            const token = await getToken(messaging, {
                vapidKey: 'BEJORsiedr3Gss5oAiiNzWFpg0Zpnmt9Sw2VQe3K-GiBspoUJWyE9qzEv7ldcSkCq4d65SLL-HGt46OSzPWh550'
            });
            console.log('Token Gen iqb', token)
            setWebFcmToken(token)

        } else if (permission == 'denied') {
            alert("You denied for the notification")
        }
    }

    useEffect(() => {
        //Req user for notification permission
        requestPermission()
    }, [])

    //===========================

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const userLoggedIn = localStorage.getItem("userLoggedIn")

    useEffect(() => {
        if (userLoggedIn == "true") {
            navigate("/queue")
        }
    },[navigate, userLoggedIn])

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState(true)

    const adminsubmitHandler = async () => {

        console.log("Yes i am admin")
        try {
            if (!email) {
                alert('Email Required');
            } else if (!password) {
                alert('Password required');
            } else {
                const signindata = { email, password }
                dispatch(AdminLoginAction(signindata, navigate))
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Google Admin Action
    const responseMessage = async (response) => {
        console.log("admin")
        dispatch(AdminGoogleloginAction(response.credential, navigate))
    };

    const errorMessage = (error) => {
        console.log(error);
    };


    const AdminLogin = useSelector(state => state.AdminLogin)

    return (
        <main className="signup">
            <div className="left">
                <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000"
                    alt="signup" />
            </div>

            <div className="right">
                <div className="right_inner_container">



                    <div className="divone">
                        <h1>Sign In to your Admin Account</h1>
                        <p>Welcome back Admin! please enter your detail</p>
                    </div>

                    <div className="divtwo">
                        {error && <p>{error}</p>}
                        <div className="input_container">
                            <div>
                                <AiOutlineMail />
                            </div>
                            <input type="email" placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input_container_password">
                            <div className="password_icon">
                                <RiLockPasswordLine />
                            </div>
                            <input
                                type={visible ? "text" : "password"}
                                placeholder='Password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="password"
                            // style={{ border: error ? "1px solid red" : "" }}
                            />
                            <div className="toggle_password" onClick={() => setVisible(!visible)}>
                                {visible ? <BiShow /> : <BiHide />}
                            </div>
                        </div>

                        {/* <div className="error">
                                            <div>
                                                <RiErrorWarningLine />
                                            </div>
                                            <p>Your password is not strong enough.Use atleast 8 charecters.</p>
                                        </div> */}


                    </div>

                    <button className="divthree"
                        onClick={adminsubmitHandler}
                    >{AdminLogin?.loading == true ? <div className='kiyosk-loader'><ClipLoader color={"white"}/></div> : "Sign In"} </button>

                    <div className="divfour">
                        <div>

                        </div>
                        <p>Or sign in with</p>
                        <div>

                        </div>
                    </div>

                    <div className="divfive">
                        <GoogleLogin
                            onSuccess={responseMessage}
                            onError={errorMessage}
                            size='large'
                            shape='circle'
                            width={400}
                            logo_alignment='left'
                            text='continue_with'
                        />

                    </div>

                </div>
            </div>
        </main>
    )
}

export default SignIn





