import { Button, Card, CardMedia, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// inline style
const timeLineTop = {
    position: "static",
    marginTop: "130px",
}

const Password = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies();

    const [form, setForm] = useState({
        password: "",
        newPass: "",
        confPass: "",
    });

    // onchange take input value in this function
    const updateForm = (value) => {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    const onSubmit = async (e) => {
        const config = {
            headers: {
                authorization: cookies.access_token,
            }
        };
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };
        await axios.post("http://localhost:2020/api/change-password", newPerson, config)
            .then(res => {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                alert(res.data.message);
                return navigate("./")
            });
        setForm({password: "",newPass: "",confPass: "",})
    }

    return (
        <div>
            <Card style={timeLineTop}>
                <Grid container style={{ padding: "10px" }}>
                    {/* form */}
                    <Grid item xs={8} >
                        <Typography gutterBottom variant="h4" component="div">
                            Change Password
                        </Typography>
                        <Box
                            component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '78ch' }, }} onSubmit={onSubmit} noValidate autoComplete="off">
                            <div>
                                <TextField required id="outlined-required" label="Oldpassword" type="password" placeholder="Enter your oldpassword here" name="password" value={form.password} onChange={(e) => updateForm({ password: e.target.value })} />
                            </div>
                            <div>
                                <TextField required id="outlined-required" label="Newpassword" type="password" name="newPass" value={form.newPass} onChange={(e) => updateForm({ newPass: e.target.value })} placeholder="Enter new password here" />
                            </div>
                            <div>
                                <TextField required id="outlined-required" label="Confirmpassword" name="confPass" value={form.confPass} onChangeCapture={(e) => updateForm({ confPass: e.target.value })} type="password" placeholder="Enter new Confirmpassword here" />
                            </div>
                            <div>
                                <Button sx={{ m: 2 }} variant="contained" size="large" color="success" type="submit" >Change Password</Button>
                            </div>
                        </Box>
                        <ToastContainer />
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

export default Password