import React, { useState } from "react";
import { Button, Card, CardMedia, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// inline style
const timeLineTop = {
    position: "static",
    marginTop: "130px",
}

const Forgot = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    // onchange take input value in this function
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,//spread operator 
            [name]: value
        })
    }

    // This function will handle the submission.
    const onSubmit = async (e) => {
        e.preventDefault();
        // When a post request is sent to the create url, we'll add a new record to the database.
        await axios.post("http://localhost:2020/api/forgot-password", user)
            .then(res => {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                alert(res.data.message);
            });
        navigate("../resetpassword");
    }

    return (
        <div>
            <Card style={timeLineTop}>
                <Grid container style={{ padding: "20px" }}>
                    {/* picture */}
                    <ToastContainer />
                    <Grid item xs={4} >
                        <CardMedia component="img" height="360" image="/images/forgot.png" alt="contact field" />
                    </Grid>

                    {/* form */}
                    <Grid style={{ marginTop: "40px" }} item xs={8} >
                        <Typography gutterBottom variant="h4" component="div">
                            Forgot Password
                        </Typography>
                        <Box
                            component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '78ch' }, }} onSubmit={onSubmit} noValidate autoComplete="off">
                            <div>
                                <TextField required id="outlined-required" label="email" type="email" placeholder="Enter your email here" name="email" value={user.email} onChange={handleChange} />
                            </div>
                            <div>
                                <Button sx={{ m: 2 }} variant="contained" size="large" color="success" type="submit" >Forgot Password</Button>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default Forgot;