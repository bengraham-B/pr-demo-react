import React, {useEffect, useState} from 'react'

export default function Header() {
	const [userName, setUserName] = useState()

	useEffect(() => {
		if(localStorage.getItem("PR_AUTH")){
			const object = JSON.parse(localStorage.getItem("PR_AUTH"))
			setUserName(object.userName)
		}
	}, [])

	const handleHome = () => {
		window.location.assign("/")
	}
	
    const handleLogout = () => {
		localStorage.removeItem("PR_AUTH")
		window.location.assign("/")
	}
	
	return (
		<section className={`flex flex-row justify-between py-6 px-12  bg-orange-500  text-white  text-3xl font-light items-center`}>

			<h1 className='flex  items-center justify-start font-light text-5xl no-underline  text-white w-4/12'>RRS PR Numbers</h1>
			
			<div id="account-container" className='w-3/12'>

				<div className='flex items-center justify-around'>

					<h1 className='font-light text-2xl'>{userName}</h1>
					<button onClick={handleHome}  className='flex justify-center items-center border border-white px-5 p-1  hover:bg-white hover:text-blue-600 text-center text-2xl'>
						<p className='flex text-center justify-center items-center'>Home</p> 
					</button>

					<button onClick={handleLogout} className='flex justify-center items-center border border-white px-5 p-1  hover:bg-white hover:text-blue-600 text-center text-2xl'>
						<p className='flex text-center justify-center items-center'>Logout</p> 
					</button>
					
				</div>
				
			</div>
			
		</section>
	)
}


