import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

//^ Importing Components
import Header from './components/Header'

//^ Importing Pages
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import AdminPage from './pages/admin/AdminPage'
import HelpPage from './pages/home/HelpPage';
import InfoPage from './pages/home/InfoPage';

export default function App() {
	const [user, setUser] = useState("")
	const [admin, setAdmin] = useState()

	useEffect(() => {
		if(localStorage.getItem("PR_AUTH")){
			const object = JSON.parse(localStorage.getItem("PR_AUTH"))
			setUser(object.userName)
			setAdmin(object.admin)
		}

		else{
			setUser("")
			setAdmin("")
		}

	}, [user])


	return (
		<div>

			<BrowserRouter>
				{/* <Header userName={user} amdinStatus={admin}/> */}

				<div id="pages">

					<Routes>
						<Route path="/" element={user ? <HomePage/> : <Navigate to="/login"/>}/>
						<Route path="/help" element={user ? <HelpPage/> : <Navigate to="/login"/>}/>
						<Route path="info" element={user ? <InfoPage/> : <Navigate to="/login"/>}/>
						<Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/"/>}/>
						<Route path="/admin" element={user ? ( admin ? <AdminPage/> : <Navigate to="/"/>) : null}/>
					</Routes>

				</div>
			
			</BrowserRouter>
			
		</div>
	
	);
}