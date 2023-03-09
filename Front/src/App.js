import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Routes,
	Redirect,
	Navigate
} from "react-router-dom";

import Home from './components/Home/home';
import Login from './components/Login/login';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home/>} />
			<Route path="/login" element={<Login/>} />
		</Routes>
	);
}

export default App;
