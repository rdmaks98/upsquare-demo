/** @format */

import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import User from "./Pages/user";
// import Index from "./Pages/";
// import Footer from "./component/footer";
// import Header from './component/Header';
// import Register from "./Pages/auth/register"
// import Login from "./Pages/auth/login"
// import Password from "./Pages/user/Password";
// import Profile from "./Pages/user/profile"
// import Forgot from "./Pages/user/forgot";
// import ResetPassword from "./Pages/user/resetpassword";
import IndexRoute from "./routes";

function App() {
	return (
		<div className='App'>
			<IndexRoute/>
		</div>
	);
}

export default App;
