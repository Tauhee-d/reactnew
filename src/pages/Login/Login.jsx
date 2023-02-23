import { useState } from 'react';
import { db } from "../../Firebase/firebase";
import { auth } from "../../Firebase/firebase";
import {  useNavigate } from "react-router-dom";


function SignIn() {

    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [userId,setUserId] = useState('')


   const handleSubmit = (event) => {
      event.preventDefault();
      sessionStorage.clear()

      auth.signInWithEmailAndPassword(email, password)
         .then((userCredential) => {
            
            const uId = userCredential.user.uid
            setUserId(uId)
            console.log("two",userId);
         })
         .catch((error) => {
            console.log(error );
         });
         const docRef = db.collection("users").doc(userId)

docRef.get().then((doc) => {
  if (doc.exists) {
    const userRole = doc.data()
    sessionStorage.setItem('user',userRole.role);

    console.log("Document data:", doc.data());
    console.log("Document data:", userRole.role);
  } else {
    console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});

navigation("/dashboard")

   };

   return (
    <div>
        {isLoading ? (
            <p style={{marginTop:'25%'}} >Loading..</p>
            ):(
                <form onSubmit={handleSubmit}>
                <label>
                   Email:
                   <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <br />
                <label>
                   Password:
                   <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <br />
                <button type="submit">Sign In</button>
             </form>
            )

        }

     
    </div>
   );
}

export default SignIn;