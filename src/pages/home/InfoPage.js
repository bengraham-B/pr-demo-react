import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function InfoPage() {
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
	
  return (
    <main>
		<header>
		<section className={`flex flex-row justify-between py-6 px-12 bg-blue-800  text-white  text-3xl font-light items-center`}>

			<h1 className='flex  items-center justify-start font-light text-5xl no-underline  text-white w-5/12'>PR Numbers Info</h1>

			<div id="account-container" className='w-3/12'>

        
                <div className='flex items-center justify-center'>
        			<Link to="/" className='bg-white text-blue-600 px-4 py-2 rounded no-underline'>Home</Link>

                </div>
				
			</div>
		</section>
		</header>

		<body className=' space-y-12'>
			{/* Intoduction section */}
			<section id="intro" className='flex justify-center'>
				<div className="flex flex-col flex-wrap w-3/4 space-y-12 py-2 my-3">
					<h1 className='text-6xl'>Information Regarding this web application</h1>
					<p className='text-xl'>
						This is a Purchase Requistion number generator which is developed with React on the frontend and on the backend an express server is being used.
					</p>
					<p>
						<p className='text-2xl font-medium'>
							This is a demo of the actual web application.
						</p>

						<p className='px-3 text-xl'>
							- This web application makes use of Microsoft Active Directory to authenticate users, which is why no signup option is provided.
						</p>
						<p className='px-3 text-xl'> 
							- The fontend and backend is both deployed on <a href='https://vercel.com' className='text-purple-900'>Vercel</a>, 
							and the PostgresSQL database is deployed on <a href='https://neon.tech' className='text-green-900'>NeonDB</a>.
						</p>
					</p>
					
				</div>
			</section>

			<section id="intro" className='flex justify-center'>
				<div className="flex flex-col flex-wrap w-3/4 space-y-6 py-2 my-3">
					<h1 className='text-4xl'>Links to the Github Repos</h1>

					<p className='text-xl text-blue-600 hover:text-purple-600'>
						<a href='https://github.com/bengraham-B/pr-demo-express'>Frontend - React App</a>
					</p>
					<p className='text-xl text-blue-600  hover:text-purple-600'>
						<a href='https://github.com/bengraham-B/pr-demo-express'>Backend - Express Server</a>
					</p>
					
				</div>
			</section>
			
			<section id="intro" className='flex justify-center'>
				<div className="flex flex-col flex-wrap w-3/4 space-y-6 py-2 my-3">
					<h1 className='text-4xl'>Read Me in Github</h1>

					<p className='text-xl'>
						For all information regarding the Purchase Number generator web application please refer to the 
						read me file in the github repo, which provides indepth information, regarding the front and backend,
						how both secruity and encryption is handled as well as how it is deployed with docker.
					</p>
					
				</div>
			</section>

		</body>
    </main>
  )
}