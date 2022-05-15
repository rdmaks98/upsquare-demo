import React, { useState, useEffect } from 'react'
import { Card, Grid, TextField, CardMedia, Typography, Button, Input, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// make inline style here
const timeLineTop = {
    position: "static",
    marginTop: "130px",
}

const profileInput = {
    display:"none",
}

const Profile = () => {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        profilePhoto: "",
    });
    const [cookies, setCookie] = useCookies();
    const config = {
        headers: {
            authorization: cookies.access_token,
        }
    };

    useEffect(() => {
        // get logged in user
        async function fetchData() {
            const response = await fetch('http://localhost:2020/api/getuser', config);
            if (!response.ok) {
                const message = `An error has occured:`;
                toast.error(message, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                return;
            }
            const record = await response.json();
            if (!record) {
                window.alert(`Record id not found`);
                window.location.href = "../";
                return;
            }
            setForm(record);
        }
        fetchData();
        return;
    }, []);

    // onchange take input value in this function
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    
    // onchange take input file in this function
    const upload = (e) => {
        setForm({ ...form, profilePhoto: e.target.files[0] });
    }

    // update user
    const onSubmit = async () => {
        
        // When a post request is sent to the create url, we'll add a new record to the database.
        const formData = new FormData();
        formData.append('firstname', form.firstname);
        formData.append('lastname', form.lastname);
        formData.append('profilePhoto', form.profilePhoto);
        await axios.put("http://localhost:2020/api/update-profile/", formData, config, {
            method:"PUT",
            headers: {
                'Accept':'application.json',
                'Content-type': 'multipart/form-data'
            }
        })
        .then(res => {
            toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER
            });
            alert(res.data.message);
        })
        window.location.href="../";
    }
    return (
        <div>
            <Card style={timeLineTop}>
                <Grid container style={{ padding: "20px" }}>
                {/* form */}
                    <Grid item xs={8} >
                        <Typography gutterBottom variant="h4" component="div">
                            Profile
                        </Typography>
                        <ToastContainer />
                        <Box
                            component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '78ch' }, }} enctype="multipart/form-data" noValidate autoComplete="off">
                            <div>
                                <TextField required id="outlined-required" label="Firstname" type="text" placeholder="Enter your Firstname here.." name="firstname" value={form.firstname} onChange={handleChange} />
                            </div>
                            <div>
                                <TextField required id="outlined-required" label="Lastname" name="lastname" value={form.lastname} onChange={handleChange} type="text" placeholder="enter your lastname here.." />
                            </div>
                            <div>
                                <label htmlFor="icon-button-file">
                                    <IconButton style={{ float: "left", marginLeft: "48px" }} color="success" component="span">Upload file 
                                    <Input style={profileInput} name="profilePhoto" accept="image/*" id="icon-button-file" onChange={upload} type="file" />
                                        <PhotoCamera />
                                    </IconButton>
                                    
                                </label>
                            </div>
                            <div>
                                <Button sx={{ m: 2 }} variant="contained" size="large" color="success" type="button" onClick={onSubmit} >Update</Button>
                            </div>
                        </Box>
                    </Grid>
                    {/* picture */}
                    <Grid item xs={4} >
                        <CardMedia component="img" height="360" image="/images/contact2.png" alt="contact field" />
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default Profile
