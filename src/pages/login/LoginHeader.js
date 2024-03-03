import React from 'react'

export default function HomeHeader() {
	
	

	return (
		<section className={`flex flex-row justify-between py-6 px-12 bg-blue-800  text-white  text-3xl font-light items-center`}>
			<h1 className='w-3/12'>
				<img src="http://rrsportal/MyCompany/Documents/blue%20and%20orange%20logo%20RGB.png" width={200} alt="RRS Logo" srcset="" />
			</h1>
			<h1 className='flex  items-center justify-center font-light text-5xl no-underline  text-white w-3/12'>RRS PR Numbers</h1>
			<div id="account-container" className='w-3/12'>

			</div>
			
		</section>
	)
}


