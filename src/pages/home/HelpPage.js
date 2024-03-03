import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function HelpPage() {
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

			<h1 className='flex  items-center justify-start font-light text-5xl no-underline  text-white w-5/12'>RRS PR Numbers Help</h1>

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
				<div className="flex flex-col flex-wrap w-3/4 space-y-6 py-2">
					<h1 className='text-6xl'>Introduction</h1>
					<p className='text-xl'>
						The purpose of this application is to provide users with a Purchase Requistion (PR) number and allow the user to download the excel file which contains the PR number which was just generated.
					</p>
					
				</div>
			</section>

			<div className='flex justify-center items-center'>
				<hr className='w-3/4'/>
			</div>

			{/* How to Use Section */}
			<section id="intro" className='flex justify-center'>
				<div className="flex flex-col flex-wrap w-3/4 space-y-6 py-2">
					<h1 className='text-6xl'>How to Use</h1>
					<h1 className='text-4xl'>First:</h1>
					<img src="/helpPics/1-form.png" alt="" srcset="" />
					<p className='text-xl'>
						This is the form where information will be added which will be used when Generating a PR number.
					</p>
					<p className='text-xl'>
						The <strong>Download Blank PR</strong> button will download a blank PR which does not contain a PR number.
					</p>
				</div>
			</section>

			<div className='flex justify-center items-center'>
				<hr className='w-3/4'/>
			</div>

			<section id="intro" className='flex justify-center'>
				<div className="flex flex-col flex-wrap w-3/4 space-y-6 py-2">
					
					<h1 className='text-4xl'>Second:</h1>
					<img src="/helpPics/2-form.png" alt="" srcset="" />
					<p className='text-xl'>
						The information which will be required to generate a PR number includes the <strong>name of the supplier</strong> where the itesm/services will be purchased from, the <strong>projecy code</strong> for which the items/services are being used for. 
						The <strong>note</strong> section is optintional and is information which can be used to describe what the purchase requistion is for.
					</p>
					<p className='text-xl'>
						Once you have entered all the required information, proceed to press the button, which will generate a PR number.
					</p>
				</div>
			</section>

			<div className='flex justify-center items-center'>
				<hr className='w-3/4'/>
			</div>
			
			<section id="intro" className='flex justify-center'>
				<div className="flex flex-col flex-wrap w-3/4 space-y-6 py-2 pb-24">
					
					<h1 className='text-4xl'>Third:</h1>
					<img src="/helpPics/3-form.png" alt="" srcset="" />
					<p className='text-xl'>
						Once the PR number has been generated, a download button will appear which will download a excel PR form with which will contain the PR number you generated.
					</p>
					<p className='text-xl'>
						You will only be allowed to download an excel file with your latest PR number. If you generate a new PR number you will receive a link to download an excel
						for with your latest PR number. If you click on the download button, it will remove the link.
					</p>
				</div>
			</section>
		</body>
    </main>
  )
}