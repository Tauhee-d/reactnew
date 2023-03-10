import { useEffect, useState,useContext } from "react";
import { db } from "../../Firebase/firebase";
import { auth } from "../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import UserRoleContext from '../../components/ContextApi/UserRoleContext'
function SignIn() {

  const navigation = useNavigate();
  const { userRole,setUserRole } = useContext(UserRoleContext);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.clear()

   

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("first", userCredential);
        const uId = userCredential.user.uid;
        console.log("uId",uId)
        const docRef = db.collection('users').doc(uId)
        docRef.get().then((doc) => {
          if(doc.exists){
            const user = doc.data()
            const role = user.role
           sessionStorage.setItem('name',user.firstName)
            setUserRole(role)
                    navigation("/dashboard");
                    console.log("first",role)

          }else {
            console.log("no role found for user");
          }
        })
      })
      .catch((error) => {
        console.log(error);
      });

  };


// useEffect(() => {
// if(userId){
      
//     const docRef = db.collection("users").doc(userId);
//     console.log("userId",userId)


//     docRef
//       .get()
//       .then((doc) => {
//         if (doc.exists) {
//           const userRole = doc.data();
//           const Role = userRole.role
//           setUserRole(Role);

//           sessionStorage.setItem("user", userRole.role);
//         const w =  sessionStorage.setItem('name',userRole.firstName);
//           console.log("object",w);
          


//           console.log("Document data:", doc.data());
//           console.log("userRole",userRole)

//           console.log("Document data:", userRole.role);
//         } else {
//           console.log("No such document!");
//         }
//       })
//       .catch((error) => {
//         console.log("Error getting document:", error);
//       });

//       // const userRole = sessionStorage.getItem('userRole')
//       // if(userRole){

//         navigation("/dashboard");
//       // }else{
//       //   console.log("no role found")
//       // }
//    }
// },[userId])


  return (
    <div>
     
        <div className="sigin">
          <div className="sigin-container">
            <form onSubmit={handleSubmit}>
              <h2 style={{ marginBottom: "50px" }}>SignIn</h2>
              <label style={{ margin: "10px" }}>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <br />
              <label style={{ margin: "10px" }}>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <br />
              <button style={{ margin: "10px" }} type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      
    </div>
  );
}

export default SignIn;
