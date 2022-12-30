// import React from 'react'
// import axios from 'axios'
// import  { useState } from 'react'


// export default function Signup() {
//    const [name,setName]= useState("")
//    const [email,setEmail]= useState("")
//    const [password,setPassword]= useState("")
// const handleUserName = (e) => {
//     setName(e.target.value)
// }
// const handleEmail = (e) => {
//     setEmail(e.target.value)
// }
// const handlePassword = (e) => {
//     setPassword(e.target.value)
// }

// const handleOnSubmit = () => {
  
    
//     axios.post("http://localhost:6068/api/v1/auth/home/register",
//     // console.log(name,email,password),
//     {name,email,password})
//     // axios.post("https://reqres.in/api/register", 
//     // {password,userName,})
//     .then(res => {
//         console.log(res.data)
//     })
//     .catch(err => {
//         console.log(err)
//         console.log(name,email,password)
//     })
// }

//   return (
//     <div>
//         <h3>Signup</h3>
//         UserName: <input type="text" value={name} onChange={handleUserName}/>
//         Email: <input type="email" value={email} onChange={handleEmail}/>
//         Password: <input type="password" value={password} onChange={handlePassword}/>
//         {/* ConfirmPassword: <input type="password" value={confirmPassword} onChange={handleConfirmPassword}/> */}
//         <button onClick={handleOnSubmit}>Register</button>
//     </div>
//   )
// }











// import React, { useState } from "react";
// import './Signup.css'
// import {  NavLink } from "react-router-dom";
// import axios from "axios"
// const Signup = () => {
// //    const [userName,setUserName] = useState("")
//    const [email,setEmail] = useState("")
//    const [password,setPassword] = useState("")
// //    const [confirmPassword,setConfirmPassword] = useState("")

// //    const handleUserName = (e) => {
// //             setUserName(e.target.value)
// //    }
//    const handleEmail = (e) => {
//             setEmail(e.target.value)
//    }
//    const handlePassword = (e) => {
//             setPassword(e.target.value)
//    }
// //    const handleConfirmPassword = (e) => {
// //             setConfirmPassword(e.target.value)
// //    }
        

  
//         const handleOnSubmit = (e) => {
//                 e.preventDefault();
//                 // console.log(userName,email,password,confirmPassword);
                
//                 axios.post(
//                     "https://reqres.in/api/register",{
//                         // userName:userName,
//                         email:email,
//                         password:password,
//                         // confirmPassword:confirmPassword,

//                     }
//                 )
//                 .then(res => {
//                     console.log(res.data);})
//                     .catch(err => {
//                     console.log(err);
//                 })
                    
//             }

// // const [userName,setUserName] = useState(" ")
// // const [email,setEmail] = useState(" ")
// // const [password,setPassword] = useState(" ")
// // const [confirmPassword,setConfirmPassword] = useState(" ")

   
//     return (
//         <>
//             <div className="signup">
//                 <form className="signup-form-layout"  >
//                     <h2 className=" mb-6">Signup</h2>
//                     {/* <div className="mb-3" >
//                         <label for="exampleInputFullName" className="form-label">UserName</label>
//                         <input type="text" value={userName} onChange={handleUserName} name='userName' className="form-control" id="exampleInputFullName" aria-describedby="emailHelp" />
//                     </div> */}
//                     <div className="mb-3" >
//                         <label for="exampleInputEmail1" className="form-label">Email Address</label>
//                         <input type="email" value={email} onChange={handleEmail} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//                     </div>
//                     <div className="mb-3">
//                         <label for="exampleInputPassword1" className="form-label">Password</label>
//                         <input type="password" value={password} onChange={handlePassword} name='password' className="form-control" id="exampleInputPassword1" />
//                         {/* <input type="text" value={user.password} onChange={handleInputs} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" /> */}

//                     </div>
//                     {/* <div className="mb-3">
//                         <label for="exampleInputConfirmPassword1" className="form-label">Confirm Password</label>
//                         <input type="password" value={confirmPassword} onChange={handleConfirmPassword} name='confirmPassword' className="form-control " id="exampleInputConfirmPassword1" />
//                     </div> */}

//                     <button type="submit" onClick={handleOnSubmit} className="btn btn-primary col-lg-4">Signup</button>
//                     <p className="mt-3">Already Have an Account <span><NavLink to="/Signin">SignIn</NavLink></span></p>

//                 </form>
//             </div>
//         </>
//     )
// }
// export default Signup





import React, { useEffect, useState } from "react";
import './Signup.css'
import { NavLink } from "react-router-dom";
import axios from "axios";
const Signup = () => {
    const initialValues = { name: '', email: '', password: '' }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
   
    // const [data, setData] = useState()
    const getData = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }


    const submitData = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmit(true)
        // const {userData,emailData,passwordData,confirmPasswordData} =formValues
        axios.post("http://localhost:6068/api/v1/auth/home/register",
        {name:formValues.name,email:formValues.email,password:formValues.password },
        // console.log("formValues:",formValues.name)
        // {name,email,password},
        // {getData}
        
        )
        .then(res => {
            console.log("res:",res.data)
        })
        .catch(err => {

            console.log("err:",err);
        })
    }
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("formErrors:",formErrors);
        }
    }, [formErrors])
    const validate = (values) => {
        const errors = {};
        // const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
        if (!values.name) {
            errors.name = 'UserName is required!'
        }
        if (!values.email) {
            errors.email = 'Email is required!'
        }
        //  else if (!regex.test(values.email)) {

        //     errors.email = 'Email is not valid!'
        // }

        if (!values.password) {
            errors.password = 'Password is required!'
        } else if (values.password.length < 4) {
            errors.password = 'password must be atleast 4 characters!'
        } else if (values.password.length > 10) {
            errors.password = 'password must not exceed 10 characters!'
        }
       
        return errors
    }

    return (
        <>
            <div className="signup">
                <form className="signup-form-layout" onSubmit={submitData}>
                    <h2 className=" mb-6">Signup</h2>
                    <div className="mb-3" >
                        <label htmlFor="exampleInputFullName" className="form-label">UserName</label> <br />
                        <input type="text" name='name' value={formValues.name} onChange={getData} className="form-control" id="exampleInputFullName" aria-describedby="emailHelp" />
                        <p style={{ color: 'red' }}>{formErrors.name}</p>

                    </div>
                    <div className="mb-3" >
                        <label htmlFor="exampleInputEmail1" className="form-label">Email </label> <br />
                        <input type="email" name='email' value={formValues.email} onChange={getData} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <p style={{ color: 'red' }}>{formErrors.email}</p>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label><br />
                        <input type="password" name='password' value={formValues.password} onChange={getData} className="form-control" id="exampleInputPassword1" />
                        <p style={{ color: 'red' }}>{formErrors.password}</p>
                    </div>

                 


                    <button type="submit" className="btn btn-primary col-lg-4">Sign up</button>
                    <p className="mt-3">Already Have an Account <span><NavLink to="/">SignIn</NavLink></span></p>
                </form>

            </div>
        </>
    )
}
export default Signup








