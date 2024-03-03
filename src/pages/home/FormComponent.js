import React, { useState } from 'react';
import { testReducer } from '../../store/redux' //~ Importing reducers
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

//& Importing Libarires for the about popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function FormComponent() {
  const dispatch = useDispatch()
  const [supplier, setSupplier] = useState('');
  const [code, setCode] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('')

  const [linkExcel, setLinkExcel] = useState('')
  const [downloadText, setDownloadText] = useState('')
  const [versionNumber, setVersionNumber] = useState('0.6.0')

  const[basePrNumMessage, setBasePrNumMessage] = useState(false)

  console.log("LINK:", linkExcel)

  const [generatedPrNumber, setGeneratedPrNumber] = useState('')

    const createExcelFile = async(prNumber) => {
        try {
            const object = JSON.parse(localStorage.getItem("PR_AUTH"))

            const response = await fetch(`http://${process.env.REACT_APP_IP_LINUX}:5000/pr`, {
                method: "POST",
                body: JSON.stringify({
                    userName: object.userName,
                    PR_NUMBER: prNumber
                }),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bear ${object.token}`
                }
        
            })
            const data = await response.json()
            console.log("Second data", data)
            setLinkExcel(data.link)
            setDownloadText(`Download PR: ${prNumber}`)
        } catch (error) {
            setError("Could Not get Excel File")
        }

    }

    //^ when the user clicks the link to dowload the file it will send a request to the flask server to delete the excel file
    const deleteExcelFile = async () => {
        setLinkExcel("") //^ This removes the download PR Link when the user generates makes a new PR
        const object = JSON.parse(localStorage.getItem("PR_AUTH"))

        try {
            
            const response = await fetch(`http://${process.env.REACT_APP_IP_LINUX}:5000/deleteExcelFile/${generatedPrNumber}.xlsx`, {
                method: "POST",
                body: JSON.stringify({
                    PR_NUMBER: generatedPrNumber
                }),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bear ${object.token}`
                }
        
            })
            const data = await response.json()
            console.log("Remove data >>", data)
        } catch (error) {
            setError(error.message)
        }
       
    }


    const handleInput = async () => {
        try {
            
            if (localStorage.getItem("PR_AUTH")){
                if(supplier && code) {
                   
                    const object = JSON.parse(localStorage.getItem("PR_AUTH"))
                    const employeeName = object.userName
            
                    try {
                        const url = `${process.env.REACT_APP_HOST}/api/pr/generate-pr-number/`
                        const response = await fetch(url, {
                            method: "POST", 
                            body: JSON.stringify({
                                userName: employeeName.toString(),
                                token: object.token.toString(),
                                supplier: supplier.toString(),
                                projectCode: code.toString(),
                                note: note.toString()
                            }),
                            headers: {
                                "Content-Type": "application/json",
                                "authorization": `Bearer ${object.token}`
                            }
                        })


                        if(response.ok){
                            const data = await response.json()
                            dispatch(testReducer(response))
                            setGeneratedPrNumber(data.generatedNum)
                            setError(null)
                            setSupplier('')
                            setCode('')
                            setNote('')
                            createExcelFile(data.generatedNum) //^ Calls the function which will generate the PR number on the server
                            console.log(data)
                            if (data.message === "Base"){
                                setBasePrNumMessage("Created Base PR")
                            }

                            else {
                                setBasePrNumMessage(false)
                            }
                        }

                        else{
                            setError("Cannot Connect to Server")
                        }
                       
                        
                    } catch (error) {
                        setError("Cannot Connect to server")
                    }
                }
                
                else {
                    setError("Please fill in fields")
                }
            }
    
            else {
                window.location.assign("/login")
            }
        } catch (error) {
            setError(error)
        }
    }

  return (
    //~ Form component takes top part of HomePage.js
    <section  className=" flex flex-col bg-purple-60 m-4 mb-16 w-9/12  justify-center items-center">
        <link rel="stylesheet" href="style.css" />
        
        {/* //^ This is the about section */}
        <section id="version-container" className="flex justify-start items-center px-6 w-screen mt-2 mb-4">

            <div className="flex flex-row space-x-2 ">
                <Popup 
                    trigger={<button className='bg-blue-600 text-white px-4 py-2 rounded'>About</button>} 
                    position="right center"
                    style={{ backgroundColor: '#fff', border: '1px solid #ddd', padding: '10px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
                    className='custom-popup'>
                    <h4>About EPR</h4>
                    <p className=''>Version: {versionNumber}</p>
                    <p className=''>Currently in Development</p>
                    <p className=''>Working on Admin Page styles</p>
                </Popup>

            
               <Link to="/help" className='bg-blue-600 text-white px-4 py-2 rounded no-underline'>Help</Link>
               <Link to="/info" className='bg-blue-600 text-white px-4 py-2 rounded no-underline'>Info</Link>

            </div>
            
           
        </section>
        <table className="table-auto relative overflow-x-auto w-full text-center">
            <thead>
                <tr >
                    <th className='text-4xl font-light text center w-3/12'>Supplier</th>
                    <th className='text-4xl font-light w-2/12'>Code</th>
                    <th className='text-4xl font-light w-3/12'>Note</th>
                    <th className='text-4xl font-light'></th>
                    <th className='text-4xl font-light'>PR Number</th>
                </tr>
            </thead>
            <tbody className='m-12'>
                <tr>
                    <td><input className='w-full mt-2 border border-black p-1 text-xl' onChange={(e) => setSupplier(e.target.value)} value={supplier}/></td>
                    <td><input className='w-full mt-2 border border-black p-1 text-xl' onChange={(e) => setCode(e.target.value)} value={code}/></td>
                    <td><input className='w-full mt-2 border border-black p-1 text-xl' onChange={(e) => setNote(e.target.value)} value={note}/></td>
                    <td className='flex justify-center items-start'><button className='text-center rounded mt-2 bg-blue-600 text-white text-xl px-4  py-1 ' onClick={handleInput}>Generate</button></td>
                    <td><div className='w-full mt-2 bg-white border border-black h-8 rounded items-center text-xl' >{generatedPrNumber}</div></td>
                </tr>
            </tbody>
        </table>
       
    </section>
  );
}