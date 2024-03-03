import React, { useState } from 'react';
import LoginHeader from './LoginHeader'
import encryptAuthFunc from './encryptFunc';

export default function HomePage() {
	
	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")

	const envHost = process.env.REACT_APP_IP_LINUX
	console.log(process.env.REACT_APP_IP_LINUX)

	const testAPI = async () => {
		const response = await fetch(`http://localhost:8001/test`, {


			headers: {
				"Content-Type": "application/json"
			}
		})
		const data = await response.json()
		alert(data.code)
	}

	

	const handleLogin = async () => {

		try {

			const encryptedAuthInfo = encryptAuthFunc({username: userName, password: password}) //^ This is the function resonsible for encypting the uer login details
			setError("")

			//^ Only makes the request if the user has filled in the username and password.
			if(userName && password){
				console.log(encryptedAuthInfo)
				
				//^ This is the try catch block to handle loggin the user in
				try {
					// const response = await fetch(`http://${process.env.REACT_APP_IP_LINUX}:8001/api/auth/ad`, {
					const response = await fetch(`${process.env.REACT_APP_HOST}/api/test-auth/auth`, {
						method: "POST",
						body: JSON.stringify({
							encryptedData: encryptedAuthInfo
						}),
						headers: {
							"Content-Type": "application/json"
						}
					})
		
					const data = await response.json()
		
					if(!response.ok){
						console.log(response.message)
						setError(data.message) //^ If the response from the server has an error it will display it to the screen.
					}
		
					if(response.status === 200){
						localStorage.setItem("PR_AUTH", JSON.stringify({userName: data.userName, admin: data.admin, token: data.token}))
						window.location.assign("/")
					}
					
				} catch (err) {
					setError("Inncorect Details")
				}
			}

			else {
				setError("Please Fill in all fields")
			}
			
		} catch (error) {
			setError("Cannot connect to server")
			
		}

	} //^ End of handleLogin Func
	return (
        <div className="flex flex-col justify-center">

			<LoginHeader/>

		<div id="login-header" className="m-6 ">
			<h1 className=' font-light text-center text-4xl bg-bue-800'>LOGIN</h1>

		</div>

		<div id="form-container" className='flex items-center justify-center m-12'>

			<div className='flex flex-col border-2 border-blue-600 p-6 rounded  w-4/12'>

				<div id="email-input" className='flex flex-col my-4'>
					<h2 className='text-3xl font-light m-4'>Username</h2>
					<input type="text" className={`border ${error ? 'border-red-600' : 'border-blue-600'}  pl-1 p-1 rounded  text-xl`} onChange={(e) => setUserName(e.target.value)}/>
				</div>

				<div id="password-input" className='flex flex-col my-4'>
					<h2 className='text-3xl font-light m-4'>Password</h2>
					<input type="password" className={`border ${error ? 'border-red-600' : 'border-blue-600'}  pl-1 p-1 rounded  text-xl`} onChange={(e) => setPassword(e.target.value)}/>
				</div>

				<div id="button-container" className='my-4 flex flex-col items-center justify-center'>
					<button className="bg-blue-600 text-white py-2 px-4 rounded text-xl" onClick={handleLogin}>Login</button>
				</div>
				
				{/* <div id="button-container" className='my-4 flex flex-col items-center justify-center'>
					<button className="bg-blue-600 text-white py-2 px-4 rounded text-xl" onClick={testAPI}>Test API</button>
				</div> */}
				
			</div>

		</div>
		<div id="error-container">
			{error && error  ?
				<div className='flex text-center justify-center items-center'>
                    <div  className='flex text-center justify-center items-center text-red-600 bg-red-300 border border-red-600  px-8 py-4 text-2xl rounded'>
					    <h4 className='text-center'>{error}</h4>
                    </div>
				</div>

                :

                null
			}
		</div>


		
		</div>
    )
}