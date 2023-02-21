// import React,{useState,useEffect} from 'react';
// import { Link } from 'react-router-dom';

// import Navbar from '../../components/Navbar/Navbar';
// import Topbar from '../../components/Topbar/Topbar'
// import { db } from '../../firebase';
// import '../FirebaseTable/Firebase.css'

// function FirebaseTable() {
//   const [userData, setUserData] = useState({
//     device:'',temperature:'',email:'',user:''
//   })
//   const [userValue,setUserValue] = useState([])

// const postUserData = (e) => {
//  var name = e.target.name;
//  var value = e.target.value;
// setUserData({...userData, [name]:value})
// }
//   const AddDetails = async (e) => {

//     db.ref().child("userdetails").push(userData)

//   }
//   useEffect(()=> {
//     db.ref().child("userdetails").on('value',data=> {
//         const getData=Object.values(data.val( ))
//         setUserValue(getData)
//     })
//   },[])

//   console.log(userValue)
  
// //   const rows = props.userValue.map((row, index) => {
// //     return (
// //       <tr key={index}>
// //         <td>{row.battery}</td>
// //         <td>{row.temperature}</td>
// //       </tr>
// //     );
// //   });

  
//   return (
// <div className="Maincontainer" >
//          <div className="leftBox">

// <Navbar/>
// </div>
// <div className="rightBox">
//     <Topbar/>
//     <div className="Container">
//      <h3>Add details</h3>

     
     
//      <div className='input'>
        
//       <input style={{margin:'10px'}} type='text' name='user' value={userData.user} placeholder='user' onChange={postUserData}/>
//       <input style={{margin:'10px'}} type='text' name='email' value={userData.email} placeholder='email' onChange={postUserData}/>
//       <input style={{margin:'10px'}} type='text' name='device' value={userData.device} placeholder='device' onChange={postUserData}/>
//       <input style={{margin:'10px'}} type='text'name='temperature'  value={userData.temperature} placeholder='temperature' onChange={postUserData}/>
//      </div>
//      <div className="btn">

//      <button className='button' onClick={AddDetails}>Add</button>
//      </div>
     

     
     
//      <ul className="collection">
//         <table>
//         <thead>
//           <tr>
//               <th>User</th>
//               <th>Email</th>
//               <th>Device</th>
//               <th>Temperature</th>
//           </tr>
//         </thead>
//         <tbody>
//         {userValue.map((valData,i)=>
//       <tr className="collection-item" key={i}>
//         <td><Link exact to="/dashboard">{valData.user}</Link></td>
//         <td><Link  to="/dashboard">{valData.email}</Link></td>
//         <td><Link  to="/dashboard">{valData.device}</Link></td>
//         <td><Link  to="/dashboard">{valData.temperature}</Link></td>
        

//         <tr>




// </tr>
        
//         </tr>

//          )}
//         </tbody>
//         </table>
       
     
//     </ul>
//     </div>
//     </div>

//     </div>
//   );
// }

// export default FirebaseTable;
