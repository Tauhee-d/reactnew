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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.clear();
    setIsLoading(true);
    setErrorMessage(""); // reset error message

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uId = userCredential.user.uid;
        const docRef = db.collection("users").doc(uId);

        docRef.get().then((doc) => {
          if (doc.exists) {
            const user = doc.data();
            const role = user.role;
            sessionStorage.setItem("name", user.firstName);
            sessionStorage.setItem("userID", user.id);
            setUserRole(role);

            navigation("/dashboard");
          } else {
            setErrorMessage("No role found for user");
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="sigin">
        <div className="sigin-container" style={{padding:'20px'}}>

          <form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: "50px" }}>SignIn</h2>

            <Grid container spacing={2}>
              <Grid item xs={10} style={{marginLeft:'8%'}}>
                <TextField id="outlined-basic" label="email" variant="outlined" size='small' sx={{minWidth:'100%'}} value={email} onChange={(e) => setEmail(e.target.value)} />
              </Grid>
              <Grid item xs={10} style={{marginLeft:'8%'}}>
                <TextField id="outlined-basic" label="password" variant="outlined" size='small' sx={{minWidth:'100%'}} value={password} onChange={(e) => setPassword(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                <Button variant="contained" type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </Grid>
            </Grid>

          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
