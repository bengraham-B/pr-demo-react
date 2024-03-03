import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
// import { spawn } from 'child_process'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//^ Importing bootsrap classes which are used for the drop down
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

//^ Importing Components
import HomeHeader from './HomeHeader';
import FormComponent from './FormComponent';

export default function HomePage() {
	const redux_prArray = useSelector((state) => state.redux.reduxPrArray)
	const [prState, setPrState] = useState([])

	const [prArrayState, setPrArrayState] = useState([])
	const [supplierState, setSupplierState] = useState([])
	const [codeState, setCodeState] = useState([])

	const [error, setError] = useState()

	let supplierFilterArray = []
	let codeFilterArray = []


	
	useEffect(() => {
		const getPurchaseReqs = async () => {
			try {
				
				if(localStorage.getItem("PR_AUTH")){
	
					const object = JSON.parse(localStorage.getItem("PR_AUTH"))
					const employeeName = object.userName
					
					try {
						//& When th user logs in this fetches all the PRS
						const response = await fetch(`${process.env.REACT_APP_HOST}/api/pr`, {
							method: "POST",
							body: JSON.stringify({
								userName: employeeName
							}),
							headers: {
								"Content-Type": "application/json",
								"authorization": `Bear ${object.token}`
							}
						})
						
						if(response.ok){
							setError("")

							const data = await response.json()
							setPrArrayState(data.prs)
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
								
								//& if the supplier's is not in the filter array it will add it.
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
						}

						if(!response.ok) {
							setPrState([]);
							setSupplierState([]);
							setCodeState([]);
						}

						
					} catch (error) {
						setPrState([])
						setSupplierState([])
						setCodeState([])
						setError("Cannot connect to server")
						if(error){
							console.log(error)
						}
						if(!error.message){
							console.log("Cannot connect to server")
						}
					}
				}
	
				else {
					window.location.assign("/login")
				}
			} catch (error) {
				setPrState([]);
				setSupplierState([]);
				setCodeState([]);
				setError(error)
				if (error.message) {
					console.log(error.message);
				} else {
					console.log("Cannot connect to the server");
				}
				
			}
        }

        getPurchaseReqs()
	}, [redux_prArray])

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
	  
		//^ Update the state with the filtered PRs
		setPrState(filteredPrs);
	  };

	  const [beginDate, setBeginDate] = useState()
	  const [endDate, setEndDate] = useState()
	  const [dateError, setDateError] = useState()

	  const getPrBetweenDates = async () => {
		setDateError("")

		if(!beginDate || !endDate){
			setDateError("Please ensure all date fields are filled")
		}

		const object = JSON.parse(localStorage.getItem("PR_AUTH"))
		
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
				setPrState(data.prsBetweenDates)
			}
			else {
				setDateError(response.error)
			}
		} catch (error) {
			setDateError(error.message)
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
    	<section className=''>	
			<HomeHeader/>

			{/* Sections contains form conponent to center it */}
			<div className='flex justify-center w-full'>
				<FormComponent/>
			</div>

            <div id="history-&-filter-container" className="flex justify-around my-6 mt-20">
                <div id="filter Container" className='flex justify-center items-center w-4/12'>
					{/* This is the style link ofr the bootstrap dropdown */}
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"/>

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

                <div>
                    <h1 className="text-7xl w-4/12 font-light">History</h1>
                </div>

				{/* //& This is the Date Picker */}
				<div className="w-4/12 flex justify-center">
					<div id="date-picker" className="flex flex-col border-1  w-7/12 p-4 rounded-md border-black">
						<div className="flex flex-row justify-between">
							{/*  Begin Date */}
							<p className='text-lg'>Begin Date</p>
							<DatePicker selected={beginDate} onChange={date => setBeginDate(date)} dateFormat="dd/MM/yyyy"  className='border-1 border-black pl-1 text-lg rounded-md  w-9/12'/>
						</div>
						
						<div className="flex flex-row justify-between">
							{/*  End Date */}
							<p  className='text-lg'>End Date</p>
							<DatePicker selected={endDate} onChange={date => setEndDate(date)} dateFormat="dd/MM/yyyy" className='border-1 border-black pl-1 text-lg rounded-md w-9/12'/>
						</div>

						<button className="bg-blue-600 text-white flex rounded justify-center text-lg" type="button" onClick={getPrBetweenDates}>Search</button>
					</div>
				</div>


			

            </div>

			<div className="flex justify-center mt-12">
			<section className='flex flex-col bg-purple-60 m-4 mb-16 w-11/12  justify-center items-center'>
             <table className="table-fixed relative border-spacing-y-8 overflow-x-auto w-full text-center border-seperate p-8">
                <thead>
                    <tr >
                        <th className='text-5xl font-light text center'>PR Number</th>
                        <th className='text-5xl font-light'>Supplier</th>
                        <th className='text-5xl font-light'>Code</th>
                        <th className='text-5xl font-light'>Note</th>
                        <th className='text-5xl font-light'>Date</th>
                    </tr>
                </thead>
                <tbody className='m-12 className="border-t-2'>
                    <tr className="border-t-2 border-blue-600 pt-2"></tr>

                    {prState && prState?.map((item) => (
                        <tr className="text-xl pt-2" key={item.id} >
                            <td className='p-2'>{item.pr_number}</td>
                            <td>{item.supplier}</td>
                            <td>{item.project_code}</td>
                            <td>{item.note}</td>
                            <td>{formatDate(item.date_)}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
					{
						error && error ?
						<div className=" px-4 py-1 m-4">
							{error ? <div className="text-red-600 bg-red-300 border-2 border-red-600 px-4 py-1 m-4 text-xl rounded"> {error}  </div>: null }
						</div>
						:
						null
					}
        </section>
			</div>
            
        </section>
  )
}