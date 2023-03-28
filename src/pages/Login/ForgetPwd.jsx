import { useState } from 'react';
import { auth } from '../../Firebase/firebase';
import { TextField, Button, Typography } from '@mui/material';

const ForgetPwd = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetPassword = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    auth.sendPasswordResetEmail(email)
      .then(() => {
        setSuccessMessage('Password reset link has been sent to your email address');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  return (
    <div className="sigin">
    <div className="sigin-container" style={{padding:'20px'}}>
    

        <form onSubmit={handleResetPassword}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          {successMessage && <Typography color="success">{successMessage}</Typography>}
          <Button variant="contained" type="submit" color="primary" size="large">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPwd;
