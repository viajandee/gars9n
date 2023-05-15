// import React, { useState } from 'react';
// import { auth } from '../firebase';
// import { TextField, Button, Paper, Typography, ThemeProvider } from "@mui/material";
// import { useNavigate, Link } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//   },
//   paper: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px',
//     maxWidth: 400,
//     width: '100%',
//     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
//     borderRadius: 10,
//   },
//   form: {
//     width: '100%',
//     marginTop: '10px',
//   },
//   input: {
//     marginTop: '10px',
//   },
//   button: {
//     marginTop: '20px',
//   },
//   link: {
//     marginTop: '10px',
//     color: 'Background',
//     textDecoration: 'none',
//     '&:hover': {
//       textDecoration: 'underline',
//     },
//   },
// }));

// function LoginForm() {
//   const classes = useStyles();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       await auth.signInWithEmailAndPassword(email, password);
//       navigate('/');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <Paper className={classes.paper} elevation={0}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Welcome back!
//         </Typography>
//         <Typography variant="body1" align="center" gutterBottom>
//           Sign in to your account
//         </Typography>
//         <form className={classes.form} onSubmit={handleFormSubmit}>
//           <TextField
//             className={classes.input}
//             fullWidth
//             variant="outlined"
//             label="Email Address"
//             type="email"
//             value={email}
//             onChange={handleEmailChange}
//             style={{ marginTop: '10px' }}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             className={classes.input}
//             fullWidth
//             variant="outlined"
//             label="Password"
//             type="password"
//             value={password}
//             onChange={handlePasswordChange}
//             style={{ marginTop: '10px' }}
//             InputLabelProps={{ shrink: true }}
//           />
//           <Button
//             className={classes.button}
//             fullWidth
//             variant="contained"
//             size="large"
//             color="primary"
//             type="submit"
//             style={{ marginTop: '10px' }}
//           >
//             Sign In
//           </Button>
//           <Link to="/forgot-password" className={classes.link}>
//             Forgot Password?
//           </Link>
//         </form>
//       </Paper>
//     </div>
//   );
// }

// export default LoginForm;