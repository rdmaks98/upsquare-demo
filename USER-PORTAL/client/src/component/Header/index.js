/** @format */

import React, { useState } from 'react';
import { AppBar, Avatar, Box, Button, CardMedia, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import PasswordTwoToneIcon from '@mui/icons-material/PasswordTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  inline style
const a = { color: "white", textDecoration: "none", }

const Header = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [cookies, setCookie] = useCookies();
	const [User, setUser] = useState("");
	const open = Boolean(anchorEl);
	const navigate = useNavigate();

	// account popup open close
	const handleClose = () => {
		setAnchorEl(null);
	};

	// find user logged in or not ?.
	const config = {
		headers: {
			authorization: cookies.access_token,
		}
	};

	const handleClick = async (event) => {
		setAnchorEl(event.currentTarget);
		try {
			if (config) {
				const result = await axios.get("http://localhost:2020/api/me", config)
				setUser(result.data)
			}
		}
		catch (err) {
			alert(err);
		}
	};

	// logout
	const logout = async () => {
		setAnchorEl(null);
		fetch('logout', {
			method: 'post',
		}).then(res => {
			toast.success("logout succesfully", {
				position: toast.POSITION.BOTTOM_CENTER
			});
			window.location.href = "../login";

		}).catch(err => {
			console.log(err);
		});
	}
	

	// condition for user login or not show menu
	var button,userName;
	var userLogged = config.headers.authorization === undefined;
	if (userLogged) {
		button = <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
			<MenuItem onClick={handleClose}><AssignmentIndTwoToneIcon color="success" /> <Link style={{ textDecoration: "none", color: "#175C19" }} to="/register"> Register</Link></MenuItem>
			<MenuItem onClick={handleClose}><VpnKeyTwoToneIcon color="success" />
				<Link style={{ textDecoration: "none", color: "#175C19" }} to="/login"> Login</Link>
			</MenuItem>
		</Menu>
	} else {
		button = <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
			<MenuItem onClick={handleClose}><AccountCircleTwoToneIcon color="success" />
				<Link style={{ textDecoration: "none", color: "#175C19" }} to="/profile"> Profile</Link>
			</MenuItem>
			<MenuItem onClick={handleClose}><PasswordTwoToneIcon color="success" />
				<Link style={{ textDecoration: "none", color: "#175C19" }} to="/Password">Change Password</Link>
			</MenuItem>
			<MenuItem onClick={logout}>
				<LockTwoToneIcon color="success" />Logout
			</MenuItem>
		</Menu>
		userName = <Typography component="span">
			<span sx={{ fontWeight: 'light', fontFamily: 'Monospace', textAlign: 'right', fontColor: 'pink' }}>Hiii....{User.firstname}</span>
		</Typography>
	}

	return (
		<div>
			<AppBar style={{ backgroundColor: "#424242" }}>
				<Container maxWidth='xxl'>
					<Toolbar>
						<Typography variant='h4' noWrap component='div' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
							<CardMedia component="img" height="60" image="./images/logo.png" alt="images logo" />
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton size="large" aria-label="account of current user"
							aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
								<MenuIcon />
							</IconButton>
						</Box>
						<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<CardMedia component="img" height="60" image="./images/logo.png" alt="images logo" />
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							<Button sx={{ my: 2, display: 'block' }}>
								<Link style={a} to="/">Home</Link>
							</Button>
							<Button sx={{ my: 2, display: 'block' }}>
								<Link style={a} to="/user">User</Link>
							</Button>
							<Button sx={{ my: 2, color: 'white', display: 'block' }}>
								<a style={a} href="#contact">Contact</a>
							</Button>
							
						</Box>
						<Box sx={{ flexGrow: 0 }}>
							{userName}
							<Tooltip title="Open Profile">
								<IconButton aria-controls={open ? 'basic-menu' : undefined}
									aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} sx={{ p: 0, m: 2 }}>
									<Avatar src={`http://localhost:2020/uploads/${User.profilePhoto}`} sx={{ width: 48, height: 48 }} />
								</IconButton>
							</Tooltip>
						</Box>
						{button}
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
};

export default Header;