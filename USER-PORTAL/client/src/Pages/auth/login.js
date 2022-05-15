import React, { useState } from 'react'
import { Card, Grid, TextField, CardMedia, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import axios from "axios";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// inline style
const timeLineTop = {
    position: "static",
    marginTop: "110px",
}

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    
    // onchange take input value
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,//spread operator 
            [name]: value
        })
    }

    // user login
    const login = async () => {
        await axios.post("http://localhost:2020/api/login", user)
            .then(res => {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                // alert(res.data.message);  
            })
    } 

    return (
        <div>
            <Card style={timeLineTop}>
                <Grid container style={{ padding: "10px" }}>
                    {/* form */}
                    <Grid item xs={6} >
                        <Typography gutterBottom variant="h4" component="div">
                            Login
                        </Typography>
                        <Box
                            component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '68ch' }, }} action="#" method="POST" noValidate autoComplete="off">
                            <div>
                                <TextField required id="outlined-required" label="Email" type="email" value={user.email} onChange={handleChange} placeholder="person@gmail.com" name="email" />
                            </div>
                            <div>
                                <TextField required id="outlined-required" label="Password" type="password" placeholder="enter your password here.." value={user.password} onChange={handleChange} name="password" />
                            </div>
                            <Typography component="div">
                                <Button sx={{ m: 2 }} variant="contained" size="large" color="success" type="submit" onClick={login}  >Sign In</Button>
                                <Link sx={{ fontWeight: 'light', fontFamily: 'Monospace', textAlign: 'right', fontColor:'green' }} to="/register">You have no Account ?.</Link>&nbsp;&nbsp;
                                <Link sx={{ fontWeight: 'light', fontFamily: 'Monospace', textAlign: 'right', fontColor: 'green' }} to="/forgot">forgot password...</Link>
                              
                               
                            </Typography>
                        </Box>
                        <ToastContainer />
                    </Grid>
                    {/* picture */}
                    <Grid item xs={6} >
                        <CardMedia component="img" height="420" image="/images/signin.png" alt="contact field" />
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default Login
