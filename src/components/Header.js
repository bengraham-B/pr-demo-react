import React, {useEffect, useState} from 'react'

export default function Header({userName, amdinStatus}) {
	const [objectLS, setObjectLS] = useState()
	const [windowLocation, setWindowLocation] = useState()

	//^ This checks and makes suer that the neccessary information is in localstorage, which will be used to authenticate the users.
	useEffect(() => {
		if(localStorage.getItem("PR_AUTH")){
			const object = JSON.parse(localStorage.getItem("PR_AUTH"))
			setObjectLS(object.token)
			setWindowLocation(window.location)
		}
	}, [])

	//^ This function will log the user out by removing their infomation from local storage  and redirects them to the login page.
	const handleLogout = () => {
		localStorage.removeItem("PR_AUTH")
		window.location.assign("/")
	}
	
	//^ This function will make an api request to verify the user's admin status, and if true procceed to the admin page and if not, log them out.
	const handleAdmin = async () => {
		try {
			
			const response = await fetch("http://localhost:8001/api/admin/dirc", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bear ${objectLS}`
				}
			})
	
			const data = await response.json()
			console.log(data)
			if (data.token){
				window.location.assign("/admin")
				console.log("GOOSE")
			}
			else {
				console.log("Not admin user")
				handleLogout() //^ If the user is not an admin they get logged out
			}
		} catch (error) {
			console.log("Header.js", error.message)
		}
	}

	return (
		<section className={`flex flex-row justify-between py-6 px-12 ${amdinStatus ? 'bg-orange-500':'bg-blue-800'}  text-white  text-3xl font-light items-center`}>
			<h1 className='w-3/12'>
				{/* <img src="http://rrsportal/MyCompany/Documents/blue%20and%20orange%20logo%20RGB.png" alt="" srcset="" /> */}
			</h1>
			<h1 className='flex  items-center justify-center font-light text-5xl no-underline  text-white w-6/12'>RRS PR Numbers</h1>
			<div id="account-container" className='w-3/12'>

				{userName ? 
					<div className='flex items-center justify-around bg-red-400'>
						<h1 className='font-light text-2xl'>{userName}</h1>
						<button onClick={handleLogout} className='flex justify-center items-center border border-white px-5 p-1  hover:bg-white hover:text-blue-600 text-center text-2xl'>
							<p className='flex text-center justify-center items-center'>Logout</p> 
						</button>
						{amdinStatus ? 
							<button onClick={handleAdmin} className='flex justify-center items-center border border-white px-5 p-1  hover:bg-white hover:text-blue-600 text-center text-2xl'>
								<p className='flex text-center justify-center items-center'>Admin</p> 
							</button>
						: null}
					</div>
				
					:

					null
				}

			</div>
			
		</section>
	)
}


