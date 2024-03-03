import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'



export default function SearchBox() {
    const [searchText, setSearchText] = useState()
    const [searchResult, setSearchResult] = useState()

    const redux_prArray = useSelector((state) => state.redux.reduxPrArray)
	const [prState, setPrState] = useState([])

    const [error, setError] = useState(false)
	
	const [prArrayState, setPrArrayState] = useState([])
	const [supplierState, setSupplierState] = useState([])
	const [codeState, setCodeState] = useState([])

    
	let supplierFilterArray = []
	let codeFilterArray = []
    
	const logFilterObject = (value) => {
		const selectedValue = value.target.innerHTML;
	  
		// Filter PRs based on the selected value
		const filteredPrs = prArrayState.filter((item) => {
		  return (
			item.supplier === selectedValue ||
			item.project_code === selectedValue ||
			
			false
		  );
		});
	  
		// Update the state with the filtered PRs
		setSearchResult(filteredPrs);
	  };
    


	//& This is the function which handles the admin's searches
    const handleSearch = async () => {
		setError("")
		try {
			const object = JSON.parse(localStorage.getItem("PR_AUTH"))
			const url = `${process.env.REACT_APP_HOST}/api/admin/search`
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify({
					search: searchText
				}),
				headers: {
					"Content-Type": "application/json",
					"authorization": `Bear ${object.token}`
				}
			})
	
			const data = await response.json()
			if(data.searchResult){
				
				if(data.searchResult.length === 0){
					setError("0 Search Results")
					return console.log("0 Search Results")
				}
				setSearchResult(data.searchResult)
				console.log(data.searchResult.length)
			}
	
			else {
				setError(data.error)
			}
			
		} catch (error) {
			setError(error.message)
		}

    }

    
	useEffect(() => {
		const getPurchaseReqs = async () => {
            const object = JSON.parse(localStorage.getItem("PR_AUTH"))
            const employeeName = object.userName
            console.log(employeeName)

            try {
                const response = await fetch(`${process.env.REACT_APP_HOST}/api/admin/`, {
                    method: "POST",
                    body: JSON.stringify({
                        userName: employeeName
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bear ${object.token}`
                    }
                })
                const data = await response.json()
                setPrArrayState(data.prs)
                setSearchResult(data.prs)

				const suppliersFromDB = data.prs

				//^ Saving the names of supplier to the filter object
				for (let i = 0; i < suppliersFromDB.length; i++) {
					let isSupplierFound = false;
					for (let j = 0; j < supplierFilterArray.length; j++) {
						if (suppliersFromDB[i].supplier === supplierFilterArray[j]) {
							isSupplierFound = true;
							break;
						}
					}
				
					if (!isSupplierFound) {
						supplierFilterArray.push(suppliersFromDB[i].supplier);
					}
				}

				//^ Saving the different project codes to filters
				for(let i = 0; i < suppliersFromDB.length; i++){
					let isCodeFound = false

					for(let j= 0; j < codeFilterArray.length; j++){
						if(suppliersFromDB[i].project_code === codeFilterArray[j]){
							isCodeFound = true
							break
						}
					}

					if(!isCodeFound){
						codeFilterArray.push(suppliersFromDB[i].project_code)
					}
				}

				setPrState(data.prs)
				setSupplierState(supplierFilterArray)
				setCodeState(codeFilterArray)
                
            } catch (error) {
                console.log(error)
            }
        }

        getPurchaseReqs()
	}, [redux_prArray])

	useEffect(() => {
		const getPurchaseReqs = async () => {
            const object = JSON.parse(localStorage.getItem("PR_AUTH"))
            const employeeName = object.userName
            console.log(employeeName)

            try {
                const response = await fetch(`${process.env.REACT_APP_HOST}/api/admin/`, {
                    method: "POST",
                    body: JSON.stringify({
                        userName: employeeName
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bear ${object.token}`
                    }
                })
                const data = await response.json()
                setPrArrayState(data.prs)
                setSearchResult(data.prs)

				const suppliersFromDB = data.prs

				//^ Saving the names of supplier to the filter object
				for (let i = 0; i < suppliersFromDB.length; i++) {
					let isSupplierFound = false;
					for (let j = 0; j < supplierFilterArray.length; j++) {
						if (suppliersFromDB[i].supplier === supplierFilterArray[j]) {
							isSupplierFound = true;
							break;
						}
					}
				
					if (!isSupplierFound) {
						supplierFilterArray.push(suppliersFromDB[i].supplier);
					}
				}

				//^ Saving the different project codes to filters
				for(let i = 0; i < suppliersFromDB.length; i++){
					let isCodeFound = false

					for(let j= 0; j < codeFilterArray.length; j++){
						if(suppliersFromDB[i].project_code === codeFilterArray[j]){
							isCodeFound = true
							break
						}
					}

					if(!isCodeFound){
						codeFilterArray.push(suppliersFromDB[i].project_code)
					}
				}

				setPrState(data.prs)
				setSupplierState(supplierFilterArray)
				setCodeState(codeFilterArray)
                
            } catch (error) {
                console.log(error)
            }
        }

        getPurchaseReqs()

	}, [])

	useEffect(() => {
		const getAdminPRsOnLogin = async() => {
			setError("")
		try {
			const object = JSON.parse(localStorage.getItem("PR_AUTH"))
			const url = `${process.env.REACT_APP_HOST}/api/admin/search`
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify({
					search: searchText
				}),
				headers: {
					"Content-Type": "application/json",
					"authorization": `Bear ${object.token}`
				}
			})
	
			const data = await response.json()
			const suppliersFromDB = data.prs
			if(data.searchResult){
				
				if(data.searchResult.length === 0){
					setError("0 Search Results")
					return console.log("0 Search Results")
				}

				//^ If the search result is successfull, it will set the PR's to state.
				setSearchResult(data.searchResult)
			}
	
			else {
				setError(data.error)
			}
			
			} catch (error) {
				setError(error.message)
			}
				
		}

		getAdminPRsOnLogin()
	}, [])

    
	  const [beginDate, setBeginDate] = useState()
	  const [endDate, setEndDate] = useState()
	  const [dateError, setDateError] = useState()

	  const getPrBetweenDates = async () => {
		setDateError()

		if(!beginDate || !endDate){
			setDateError("Please ensure all date fields are filled")
		}

		const object = JSON.parse(localStorage.getItem("PR_AUTH"))
		
		//^ This handles the api requests to get PR's between two specified dates
		try {
			const response = await fetch(`${process.env.REACT_APP_HOST}/api/pr/pr-between-dates`, {
				method: "POST",
				body:JSON.stringify({
					beginDate: beginDate,
					endDate: endDate
				}),
				headers: ({
					"Content-Type": "application/json",
					"authorization": `Bear ${object.token}`

				})
			})

			if(response.ok){
				const data = await response.json()
				setSearchResult(data.prsBetweenDates)
				console.log(data.prsBetweenDates)
			}
			else {
				setDateError(response.error)
				setError("No PR's between those dates")
			}
		} catch (error) {
			setDateError(error.message)
			setError("Could not connect to server")
		}

	  }
      

	  const formatDate = (dateProp) => {
		const inputDate = new Date(dateProp);

		const year = inputDate.getFullYear();
		const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
		const day = String(inputDate.getDate()).padStart(2, '0');

		const formattedDate = `${year}-${month}-${day}`;
		return formattedDate
		
	}
	
    return (
        <div className="flex flex-col">

			<section id="mid-section" className='flex items-center'>

				{/* The Left side */}
				<div id="left" className="flex justify-center w-1/3 items-center">
					
					<DropdownButton id="dropdown-basic-button" title="Supplier" className="px-1">
						{ supplierState && supplierState.map((item) => (
							<Dropdown.Item href="#/action-1" onClick={(e) => logFilterObject(e)}>{item}</Dropdown.Item>
						))}
					</DropdownButton>
					
					<DropdownButton id="dropdown-basic-button" title="Project Code" className="px-1">
						{ codeState && codeState.map((item) => (
							<Dropdown.Item href="#/action-1" onClick={(e) => logFilterObject(e)}>{item}</Dropdown.Item>
						))}
					</DropdownButton>
                

				</div>

				{/* The Middle side */}
				<div id="middle" className="flex justify-center w-1/3 items-center">
					{/* Search Bar */}
					<section id="Search Bar" className='w-full'>
						<div className="flex items-center justify-center w-full">
							<div onChange={(e) => setSearchText(e.target.value)} className='flex flex-row justify-center w-full'>
								<input type="text" className="border border-1 border-black rounded w-6/12 p-1 mr-4"/>
								<button onClick={handleSearch} className='border px-2 border-1 border-black bg-orange-500 text-white rounded text-xl'>Search</button>
							</div>
						</div>
					</section>
				</div>

				{/* The right side */}
				<div id="right" className="flex justify-center w-1/3 items-center">

					<div className="flex flex-row mb-16 w-full justify-center">

						<div className="flex justify-center w-full items-center">
							<div id="date-picker" className="flex flex-col border-1 border-black p-4 w-7/12 rounded">
								<div className="flex flex-row justify-between">
									{/*  Begin Date */}
									<p className='text-lg'>Begin Date</p>
									<DatePicker selected={beginDate} onChange={date => setBeginDate(date)} dateFormat="dd/MM/yyyy"  className='border-1 border-black pl-1 text-lg rounded'/>
								</div>
								
								<div className="flex flex-row justify-between">
									{/*  End Date */}
									<p  className='text-lg'>End Date</p>
									<DatePicker selected={endDate} onChange={date => setEndDate(date)} dateFormat="dd/MM/yyyy" className='border-1 border-black pl-1 text-lg rounded'/>
								</div>

								<button className="bg-blue-600 text-white flex rounded justify-center text-lg" type="button" onClick={getPrBetweenDates}>Search</button>
							</div>
						</div>

							
					</div>
				</div>

			</section>




            <section className='flex flex-col bg-purple-60 mb-16  justify-center items-center'>
            {/* This is the style link ofr the bootstrap dropdown */}
			<link rel="stylesheet" href="http://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"/>

            <div className="flex flex-col w-full justify-center items-center">

				<section className="pb-6">
					{ error ? <h1 className="text-red-600">{error}</h1> : <h1 className='font-light'></h1>}
				</section>
			
			
            <table className="table-fixed relative border-spacing-y-8 overflow-x-auto w-full text-center border-seperate p-">
                <thead>
                    <tr >
                        <th className='text-5xl font-light text center'>PR Number</th>
                        <th className='text-5xl font-light'>Employee</th>
                        <th className='text-5xl font-light'>Supplier</th>
                        <th className='text-5xl font-light'>Code</th>
                        <th className='text-5xl font-light'>Date</th>
                    </tr>
                </thead>
                <tbody className='m-12 className="border-t-2'>
                    <tr className="border-t-2 border-orange-600 pt-2"></tr>

                    {searchResult && searchResult?.map((item) => (
                        <tr className="text-xl pt-2" key={item.id} >
                            <td className='p-2'>{item.pr_number}</td>
                            <td>{item.employee_name}</td>
                            <td>{item.supplier}</td>
                            <td>{item.project_code}</td>
                            <td>{formatDate(item.date_)}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            </div>

        </section>

        </div>
    )
}
