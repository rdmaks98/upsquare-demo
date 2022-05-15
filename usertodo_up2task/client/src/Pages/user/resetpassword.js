import React,{ useState } from "react";
import { Button, Card, CardMedia, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// inline style
const timeLineTop = {
    position: "static",
    marginTop: "130px",
}

const Resetpassword = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        password: "",
        repeat_password: ""
    })

    // onchange take input value in this function
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,//spread operator 
            [name]: value
        })
    }
    // take token from params
    const token = params.token.toString();
    
    const ResetPass = async () => {

        // When a post request is sent to the create url, we'll add a new record to the database.
        await axios.post(`http://localhost:2020/api/reset-password/${token}`,user)
            .then(res => {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                alert(res.data.message);
                navigate("../../login");
            })
    }

    return(
        <div>
            <Card style={timeLineTop}>
                <Grid container style={{ padding: "10px" }}>
                    {/* form */}
                    <Grid item xs={8} >
                        <Typography gutterBottom variant="h4" component="div">
                            Reset Password
                        </Typography>
                        <Box
                            component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '78ch' }, }} onSubmit={ResetPass} noValidate autoComplete="off">
                            <div>
                                <TextField required id="outlined-required" label="Newpassword" type="password" name="password" placeholder="Enter new password here" value={user.password} onChange={handleChange} />
                            </div>
                            <div>
                                <TextField required id="outlined-required" label="Confirmpassword" type="password" name="repeat_password" value={user.repeat_password} onChange={handleChange} placeholder="Enter new Confirmpassword here" />
                            </div>
                            <div>
                                <Button sx={{ m: 2 }} variant="contained" size="large" color="success" type="submit" >Reset Password</Button>
                            </div>
                            <ToastContainer />
                        </Box>
                    </Grid>
                    {/* picture */}
                    <Grid item xs={4} >
                        <CardMedia component="img" height="360" image="/images/Password.png" alt="contact field" />
                    </Grid>
                </Grid>
            </Card>
        </div>
    )   
}

export default Resetpassword;