import React, {useEffect, useState} from 'react'
// import { spawn } from 'child_process'

export default function HomeHeader() {
	const [userName, setUserName] = useState("")
    const [adminStatus, setAdminStatus] = useState("")
    const [objectLS, setObjectLS] = useState("")

	useEffect(() => {
		if(localStorage.getItem("PR_AUTH")){
			const object = JSON.parse(localStorage.getItem("PR_AUTH"))
			setUserName(object.userName)
            setAdminStatus(object.admin)
            setObjectLS(object.token)
		}
	}, [])

	const handleLogout = () => {
		localStorage.removeItem("PR_AUTH")
		window.location.assign("/")
	}
	
	const handleAdmin = async () => {
		try {
			
			//& This function sends a request to server to verify a user's admin status
			const response = await fetch(`${process.env.REACT_APP_HOST}/api/admin/dirc`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bear ${objectLS}`
				}
			})
	
			const data = await response.json()
			if (data.token){
				window.location.assign("/admin")
			}
			else {
				window.alert("You are not an admin user")
				handleLogout() //^ If the user is not an admin they get logged out
			}
		} catch (error) {
			console.log("Header.js", error.message)
			window.alert("Cannot Connect to server, will not be able to access the admin page")
		}
	}

	return (
		<section className={`flex flex-row justify-between py-6 px-12 bg-blue-800  text-white  text-3xl font-light items-center`}>
			
			<h1 className='flex  items-center justify-center font-light text-5xl no-underline  text-white w-4/12'>RRS PR Numbers</h1>
			
			<div id="account-container" className='w-4/12'>

        
                <div className='flex items-center justify-around'>
                    <h1 className='font-light text-2xl'>{userName}</h1>
                    {adminStatus ? 
                        <button onClick={handleAdmin} className='flex justify-center items-center border border-white px-5 p-1  hover:bg-white hover:text-blue-600 text-center text-2xl'>
                            <p className='flex text-center justify-center items-center'>Admin</p> 
                        </button>
                    : null}
                    <button onClick={handleLogout} className='flex justify-center items-center border border-white px-5 p-1  hover:bg-white hover:text-blue-600 text-center text-2xl'>
                        <p className='flex text-center justify-center items-center'>Logout</p> 
                    </button>
                </div>
				
			</div>
		</section>
	)
}


