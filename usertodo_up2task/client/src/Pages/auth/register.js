import React, { useState } from 'react'
import { Card, Grid, TextField, CardMedia, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// inline style for card
const timeLineTop = {
    position: "static",
    marginTop: "110px",
}

const Register = () => {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    // onchange take input value in this function
    const updateForm = (value) => {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    const onSubmit = async (e) => {

        // When a post request is sent to the create url, we'll add a new record to the database.
        e.preventDefault();
        const newPerson = { ...form };
        await axios.post("http://localhost:2020/api/register", newPerson)
            .then(res => {
                toast.success("Register successfully !", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                alert(res.data.message);
                navigate("../login");
            });

        // after submit empty form
        setForm({ firstname: "", lastname: "", email: "", password: "" });
    }

    return (
        <div style={{ padding: "20px" }}>
            <Card style={timeLineTop}>
                <Grid container>
                    {/* picture */}
                    <Grid item xs={4} >
                        <CardMedia component="img" height="420" image="/images/register.png" alt="contact field" />
                    </Grid>
                    {/* form */}
                    <Grid item xs={8} >
                        <Typography gutterBottom variant="h4" component="div" style={{ margin: "10px" }}>
                            Register
                        </Typography>
                        <Box
                            component="form" onSubmit={onSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '78ch' }, }} autoComplete>
                            <div>
                                <TextField id="outlined-required" label="Firstname" type="text" placeholder="Enter your firstname here" name="firstname" value={form.firstname} onChange={(e) => updateForm({ firstname: e.target.value })} required />
                            </div>
                            <div>
                                <TextField id="outlined-required" label="Lastname" name="lastname" type="text" placeholder="Enter your lastname here" value={form.lastname} onChange={(e) => updateForm({ lastname: e.target.value })} required />

                            </div>
                            <div>
                                <TextField id="outlined-required" label="Email" name="email" type="email" placeholder="person@gmail.com" value={form.email} onChange={(e) => updateForm({ email: e.target.value })} required />
                            </div>
                            <div>
                                <TextField id="outlined-required" label="Password" name="password" type="password" placeholder="Enter your password here" value={form.password} onChange={(e) => updateForm({ password: e.target.value })} />
                            </div>
                            <div>
                                <TextField id="outlined-required" label="Confirmpassword" type="password" placeholder="Enter your confirmpassword here" onChange="" required />
                            </div>
                            <div>
                                <Button sx={{ m: 2 }} variant="contained" size="large" type="submit" color="success">Sign Up</Button>
                                <ToastContainer />
                            </div>
                        </Box>
                    </Grid>

                </Grid>
            </Card>
        </div>
    )
}

export default Register