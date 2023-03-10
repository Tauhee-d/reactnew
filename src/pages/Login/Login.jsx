import { useEffect, useState } from "react";
import { db } from "../../Firebase/firebase";
import { auth } from "../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function SignIn() {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // sessionStorage.clear()

    // const collectionRef = db.collection('users');

    // // Get all documents in the collection
    // collectionRef.get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, ' => ', doc.data());
    //   });
    // }).catch((error) => {
    //   console.error('Error getting documents: ', error);
    // });

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("first", userCredential);
        const uId = userCredential.user.uid;
        setUserId(uId);
        console.log("uId",uId)
      })
      .catch((error) => {
        console.log(error);
      });

  };


useEffect(() => {
if(userId){
      
    const docRef = db.collection("users").doc(userId);
    console.log("userId",userId)


    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userRole = doc.data();
          sessionStorage.setItem("user", userRole.role);
        const w =  sessionStorage.setItem('name',userRole.firstName);
          console.log("object",w);
          


          console.log("Document data:", doc.data());
          console.log("userRole",userRole)

          console.log("Document data:", userRole.role);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

      navigation("/dashboard");
   }
},[userId])


  return (
    <div>
      {isLoading ? (
        <p style={{ marginTop: "25%" }}>Loading..</p>
      ) : (
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
      )}
    </div>
  );
}

export default SignIn;
