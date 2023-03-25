import { useEffect, useState, useContext } from "react";
import Grid from '@mui/system/Unstable_Grid/Grid';
import TextField from '@mui/material/TextField';
import { IconButton, Typography,Box, Button } from '@mui/material'
import { db } from "../../Firebase/firebase";
import { auth } from "../../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import UserRoleContext from "../../components/ContextApi/UserRoleContext";
function SignIn() {
  const navigation = useNavigate();
  const { userRole, setUserRole } = useContext(UserRoleContext);

  // const [dummy,setDummy] = useContext(UserRoleContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [userId, setUserId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.clear();
    setIsLoading(true);


    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("first", userCredential);
        const uId = userCredential.user.uid;
        console.log("uId", uId);
        const docRef = db.collection("users").doc(uId);
        console.log("f",docRef)
        docRef.get().then((doc) => {
          if (doc.exists) {
            const user = doc.data();
            const firstName = user.firstName;
            const lastName = user.lastName;
            const id = user.id;
            const hospitalID = user.hospitalID;
            const role = user.role;
            sessionStorage.setItem("name", user.firstName);
            sessionStorage.setItem("userID", user.id);
            setUserRole(role);
            // setDummy({firstName:firstName,lastName:lastName,id:id,hospitalID:hospitalID,role:role});

            navigation("/dashboard");
            // console.log("first", dummy);
            // console.log("first1", dummy.role);
          } else {
            console.log("no role found for user");
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="sigin">
        <div className="sigin-container" style={{padding:'20px'}}>

          <form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: "50px" }}>SignIn</h2>
            {/* <label style={{ margin: "10px" }}>
              Email:
            </label>
            
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            <br />
            <label style={{ margin: "10px" }}>
              Password:
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <br /> */}
            <Grid container spacing={2}>
          <Grid item xs={10} style={{marginLeft:'8%'}}>
        <TextField id="outlined-basic" label="email" variant="outlined" size='small' sx={{minWidth:'100%'}} value={email} onChange={(e) => setEmail(e.target.value)} />
        </Grid>
          <Grid item xs={10} style={{marginLeft:'8%'}}>
        <TextField id="outlined-basic" label="password" variant="outlined" size='small' sx={{minWidth:'100%'}} value={password} onChange={(e) => setPassword(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
            <Typography>
                <button >Submit</button>

                {isLoading && <p>Loading...</p>}

            </Typography>
        </Grid>
      </Grid>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
