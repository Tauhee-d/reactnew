

import React, { useEffect, useState } from "react";
import './Signin.css'
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'
import App from "../../App";

const Signin = (props) => {
    // const [show , setShow] =useState(false)
    const getUserData = localStorage.getItem("userDetails")
    const navigation = useNavigate();
    
    
    
    
    const initialValues = { email: '', password: '' }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    // const [data, setData] = useState([])
    const [role , setRole] = useState('')
    
    const getData = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }
    
    
    
    const submitData = async (e) => {
        e.preventDefault()
        sessionStorage.clear()
        
        
        setFormErrors(validate(formValues))
        setIsSubmit(true)
    

        await axios.post("https://dashboard-login.onrender.com/signin",
        // await axios.post("http://localhost:3055/signin",
        // axios.post("https://yantram-backend.onrender.com/api/v1/auth/home/login",
        {email:formValues.email,password:formValues.password },
        
        
        
        )
        
        .then(res => {
            // const response = res.data.user
            sessionStorage.setItem('user', res.data.user);
            
            
            setRole(res.data.user);
            console.log("response2",res.data.user)
            console.log("response1",role)
            props.onSubmit(role)
            navigation("/dashboard")
            
        })
        .catch(err => {
            console.log("err:",err);
        })
        
    }
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors])
    const validate = (values) => {

        const errors = {};
        // const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"

        if (!values.email) {
            errors.email = 'Email is required!'
        }
        //  else if (!regex.test(values.email)) {

        //     errors.email = 'Email is not valid!'
        // }

        if (!values.password) {
            errors.password = 'Password is required!'
        } else {


            if (getUserData && getUserData.length) {
                const UserData = JSON.parse(getUserData)
                const userLogin = UserData.filter((el, k) => {
                    return el.email === values.email && el.password === values.password
                })
                if (userLogin.length === 0) {
                    alert("Invalid username or password")
                } else {
                    console.log("user login sucessfully");
                    // navigate('/Home')
                }
            }
        }
        return errors


    }

    return (
        <>
        {/* {show === <App role={role}/>} */}

            <div className="signup">
                {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
                <form className="signup-form-layout" onSubmit={submitData} >
                    <h1 className=" mb-6">Signin</h1>

                    <div className="mb-3" >
                        <label for="exampleInputEmail1" className="form-label">Email </label> <br />
                        <input type="email" name='email' value={formValues.email} onChange={getData} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <p style={{ color: 'red' }}>{formErrors.email}</p>
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label> <br />
                        <input type="password" name='password' value={formValues.password} onChange={getData} className="form-control" id="exampleInputPassword1" />
                        <p style={{ color: 'red' }}>{formErrors.password}</p>
                    </div>




                    <button type="submit"  className="btn btn-primary col-lg-4">Sign in</button>
                    <p className="mt-3">Already Have an Account <span><NavLink to="/Signup">SignUp</NavLink></span></p>

                </form>
            </div>
        </>
    )
}
export default Signin