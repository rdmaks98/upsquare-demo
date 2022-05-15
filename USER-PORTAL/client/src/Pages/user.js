import React, { useEffect, useState } from 'react'
import { Button, Chip, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";


// inline style
const timeLineTop = {
    position: "static",
    padding: "10px",
    marginTop: "110px",
}
const searchmenu = {
    marginBottom: "20px",
}

const User = () => {

    const [cookies, setCookie] = useCookies();

    // fetch all user
    const config = {
        headers: {
            authorization: cookies.access_token,
        }
    };
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`http://localhost:2020/api/user`, config);
            const users = await response.json();
            alert(users.message);
            setUsers(users);
        }
        return getUsers();
        // navigate("../")
    }, []);

    // search user with firstname and lastname
    const handleSearch = async (e) => {
        const name = e.target.value;
        const response = await fetch(`http://localhost:2020/api/search-user?name=${name}`);
        if (!response.ok) {
            const message = `An error occured: ${response.statusText}`;
            toast.error(message, {
                position: toast.POSITION.BOTTOM_CENTER
            });
            return;
        }
        const users = await response.json();
        if(users == "")
        {
            toast.info("no user", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        setUsers(users);
    }

    // delete a particular user
    const Deleteuser = async (id) => {
        const response = await axios.delete(`http://localhost:2020/api/delete-user/${id}`)
        .then(res => {
            toast.warn(res.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            alert(res.data.message);
        });

        if (!response.ok) {
            const message = `An error occured: ${response.statusText}`;
            alert(message);
            return;
        }
        const users = await response.json();
        setUsers(users);
    }

    return (
        <div style={timeLineTop}>
            <Grid item xs={2} style={searchmenu}>
                <Chip color="primary" icon={<AccessibilityNewRoundedIcon />} label="USER LIST" variant="outlined" />
            </Grid>
            <TableContainer component={Paper}>
                <Grid item xs={12}>
                    <TextField label="Search User By Name" variant="standard" id="search" name="name" type="text" onChange={handleSearch} />
                </Grid>
                <ToastContainer />

                <Table sx={{ minWidth: 600 }} style={{ marginTop: "20px" }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#bdbdbd" }}>
                            <TableCell >No.</TableCell>
                            <TableCell>Firstname</TableCell>
                            <TableCell>Lastname</TableCell>
                            <TableCell>EmailId</TableCell>
                            <TableCell>Profile</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, i) => (
                            <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{i + 1}</TableCell>
                                <TableCell>{user.firstname}</TableCell>
                                <TableCell>{user.lastname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell><img height="90px" width="150px" src={`http://localhost:2020/uploads/${user.profilePhoto}`} alt="img"></img></TableCell>
                                <TableCell>
                                    <Button onClick={() => Deleteuser(user._id)} startIcon={<DeleteIcon />} variant="outlined" color="error">
                                    Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default User