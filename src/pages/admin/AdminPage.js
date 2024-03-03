import React, {useEffect, useState} from 'react'
import SearchBox from './SearchBox'

import AdminHeader from './AdminHeader'

export default function AdminPage() {

	
	return (
		<div>
			<AdminHeader/>
			<div className="flex flex-col">
				<div id="admin-title-container" className="flex justify-center items-center text-3xl my-4 font-light">
					<h1 className="font-light text-6xl">Admin Page</h1>
				</div>

				<div >
					<SearchBox/>
				</div>
			</div>
		</div>
	)
}
