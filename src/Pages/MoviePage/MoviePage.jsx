import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchCastData, movieData } from '../../apiFunctions'
import {IoMdClose} from "react-icons/io"
import htmlParser from 'html-react-parser';
import style from "./MoviePage.module.css"
import Footer from '../../Components/Footer/Footer';
function MoviePage() {
    const [data,setData]=useState(null)
    const dialogRef=useRef(null)
    const {showId}=useParams()
    const [formData,setFormData]=useState(null)
    const fillData=async()=>{
        const res = await movieData(showId)
        if(res){
            setData(res)
        }
    }
    const fillCastData=async ()=>{
        const res = await fetchCastData(showId)
        if(res){

            setCastData([...res])
        }
    }
    const [castData,setCastData]=useState(null)
    const formSubmissionHandler=(e)=>{
        e.preventDefault()
        console.log(formData)
        // form validation code here
        localStorage.setItem("bookTicketData",JSON.stringify(formData))
    }
    useEffect(()=>{
        fillData()
        fillCastData()
    },[showId])
  return (
    <div>
        <header className='mb-3'>
            <nav className="navbar navbar-expand-md navbar-light bg-light border px-3 ">
                <Link to={"/"} className=' text-decoration-none d-flex gap-1 align-items-center'>
                    <div className="d-block bg-primary" 
                        style={{
                            width:"30px",height:"30px", borderRadius:"50%"
                        }}
                    ></div>
                    <h1 className="navbar-brand m-0">Ticket Booker</h1>
                </Link>
            </nav>
        </header>
        <div style={{minHeight:"70vh"}}
            className={' d-flex px-3 gap-3 '+style.container}
        >
            <div
                style={{
                    height: '500px',
                    width : "400px",
                    backgroundColor:"grey",
                    flexShrink:"0",
                    position:"relative"
                }}
                className={'overflow-hidden '+style.imageContainer}

            >
                {
                    data?.imageUrlOriginal &&
                    <img src={data.imageUrlOriginal} alt="" 
                        className='h-100 w-100 object-fit-cover'
                        style={{
                            position:"relative",
                            zIndex:2
                        }}
                    />
                }
            </div>
            <div>
                <div className={'d-flex align-items-end gap-1 '+style.movieTitle}>
                    <h1 className={'text-capitalize mb-0 '}>{data?.name}</h1>
                    <span className='pb-1'>{data?.rating || "No Rating"}</span>
                </div>
                <div>
                    <h4 className='h5 mt-4 mb-3 italic fw-bold'>Plot | Summary</h4>
                    <div
                        style={{lineHeight:"1.8rem"}}
                    >
                        {data?.summary
                            &&
                            htmlParser(data.summary)
                        }
                    </div>
                </div>
                <div>
                    <p >
                        <span className='fw-bold'>Language : </span>
                        <span>{data?.language}</span>
                    </p>
                    <p >
                        <span className='fw-bold'>Genres : </span>
                        {
                            (data && data.genres) &&
                            data?.genres.join(", ")
                        }
                    </p>
                </div>
                <button className='btn btn-primary'
                    disabled={data?false:true}
                    onClick={()=>{
                        setFormData(
                            {
                                movieName : data.name,
                                language: data.language,
                                name: "",
                                age: "",
                                location: "",
                                paymentMethod: "Paytm",
                                paymentID:""
                            }
                        )
                        dialogRef.current.showModal()
                    }}
                >Book Now</button>
            </div>
        </div>
        <div className='px-3 mt-2'>
            <hr />
            <h3 className='fw-bold h2'>Cast</h3>
            <div 
                className='col-12 d-flex gap-3 flex-wrap justify-content-sm-start justify-content-center'
            >
                {
                    castData ?
                    castData.map((i,index)=>(
                        <div key={index} className="card flex-shrink-0 rounded overflow-hidden ">
                            <div style={{width:"150px",height:"210px", background:"grey"}} >
                                {
                                    i.imageUrl &&
                                    <img src={i.imageUrl} className="card-img-top" alt="..." />
                                }
                            </div>
                            <div className="card-body" style={{width:"150px"}}>
                                <p className='card-title wrap text-primary'>{i.name}</p>
                                <p className='card-text'>{i.role}</p>
                            </div>
                        </div>
                    )):
                    <><span>Cast Data Not Found</span></>
                }
            </div>
        </div>
        <div>
            {/* recommended for you */}
        </div>
        
        
        <Footer/>
        <dialog 
            ref={dialogRef}
            className={'border-0 bg-white text-black px-3 py-2 rounded '+style.dialogBox}
        >
            {
                formData &&
                <form 
                    onSubmit={formSubmissionHandler}
                >
                    <div className='d-flex gap-4 align-items-center my-3'>
                        <h1 className='h2 ls-1 flex-grow-1 ps-2 text-primary'>Book Tickets Now</h1>
                        <button style={{fontSize:"18px"}} className='bg-transparent text-black border-0 d-flex align-items-center justify-center'
                            onClick={()=>{
                                dialogRef.current.close()
                            }}
                        ><IoMdClose/></button>
                    </div>
                    <h6 className='text-secondary'
                        style={{letterSpacing:"1px"}}
                    >Movie Info</h6>
                    <hr />
                    <div className='d-flex gap-3 flex-wrap mb-2'>
                        <div className='d-flex flex-column gap-1 mb-3'>
                            <span >Movie Name</span>
                            <input type="text" 
                                value={formData.movieName}
                                disabled={true}
                                className='px-2 disabled border-1'
                                style={{backgroundColor:"#d3cfcf",color:"#5e5757",borderRadius:"2px"}}
                            />
                        </div>
                        <div className='d-flex flex-column gap-1 mb-3'>
                            <span>Language</span>
                            <input type="text" 
                                value={formData.language}
                                disabled={true}
                                className='px-2 disabled border-1'
                                style={{backgroundColor:"#d3cfcf",color:"#5e5757",borderRadius:"2px"}}
                            />
                        </div>
                    </div>
                    <h6 className='text-secondary'
                    style={{letterSpacing:"1px"}}
                    >Customer Info</h6>
                    <hr />
                    <div>
                        <div className='d-flex gap-2 align-items-center flex-wrap my-3'>
                            <span style={{width:"65px"}}>Name</span>
                            <input type="text" 
                                value={formData.name}
                                onChange={(e)=>setFormData(prev=>{return {...prev,name:e.target.value}})}
                                className='flex-grow-1 bg-white border-1 text-black ps-2'
                                placeholder='Enter Your Name'
                            />
                        </div>
                        <div className='d-flex gap-2 align-items-center flex-wrap my-3'>
                            <span style={{width:"65px"}}>Age</span>
                            <input type="number" 
                                value={formData.age}
                                onChange={(e)=>setFormData(prev=>{return {...prev,age:e.target.value}})}
                                className='flex-grow-1 bg-white border-1 text-black ps-2'
                                placeholder='Enter Your Age'
                            />
                        </div>
                        <div className='d-flex gap-2 align-items-center flex-wrap my-3'>
                            <span style={{width:"65px"}}>Location</span>
                            <input type="text" 
                                value={formData.location}
                                onChange={(e)=>setFormData(prev=>{return {...prev,location:e.target.value}})}
                                className='flex-grow-1 bg-white border-1 text-black ps-2'
                                placeholder='Enter Your Name'
                            />
                        </div>
                        <div className='d-flex gap-3 align-items-center flex-wrap my-3'>
                            <span >Select Payment Method</span>
                            <select onChange={(e)=>{
                                setFormData(prev=>{return {...prev,paymentMethod: e.target.value,paymentID:""}})
                            }}
                                className='border-1 rounded px-2 py-1'
                                style={{
                                    backgroundColor:"white",
                                    color:"black"
                                }}
                                value={formData.paymentMethod}
                            >
                                {
                                    ["PayPal","Paytm","PhonePay"].map(i=>(
                                        <option value={i} key={i} >{i}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='d-flex gap-3 align-items-center flex-wrap my-3'>
                            <span >Payment ID</span>
                            <input type="text" 
                                value={formData.paymentID}
                                onChange={(e)=>setFormData(prev=>{return {...prev,paymentID:e.target.value}})}
                                className='flex-grow-1 bg-white border-1 text-black ps-2'
                                placeholder='Enter Your Payment ID number'
                                disabled={formData.paymentMethod==""}
                            />
                        </div>
                    </div>
                    <button className='btn-primary btn my-2' type='submit'
                    >Confirm to Book</button>
                </form>
            }
        </dialog>
    </div>
  )
}

export default MoviePage