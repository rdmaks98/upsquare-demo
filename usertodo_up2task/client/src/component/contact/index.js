import { Card, Grid, TextField, CardMedia, Typography, Button, TextareaAutosize } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Contact = () => {
    return (
        <div style={{ marginTop: "20px" }} id="contact">
            <Card>
                <Grid container style={{ padding: "10px" }}>
                    <Grid item xs={8} >
                       <Typography gutterBottom variant="h4" component="div">
                           Contact Us
                        </Typography>
                        <Box
                            component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '78ch' }, }} noValidate autoComplete="off">
                            <div>
                                <TextField required id="outlined-required" label="Name" type="text" placeholder="Enter your name here" />
                            </div>
                            <div>
                                <TextField required id="outlined-required" label="Email" type="email" placeholder="person@gmail.com" />
                            </div>
                            <div>
                                <TextareaAutosize required id="outlined-required" label="comment" minRows={4} placeholder="enter your comment here...." style={{ width: 680 }} name="comment"/>
                            </div>
                            <div>
                                <Button sx={{m:2}} variant="contained" size="large" color="primary" >Contact us</Button>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={4} >
                        <CardMedia component="img" height="360" image="/images/contact2.png" alt="contact field" />
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default Contact
