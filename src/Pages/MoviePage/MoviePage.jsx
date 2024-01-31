import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchCastData, movieData } from '../../apiFunctions'
import { FaGithub } from "react-icons/fa6";
import htmlParser from 'html-react-parser';
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

    useEffect(()=>{
        fillData()
        fillCastData()
    },[showId])
  return (
    <div className='min-vh-100 '>
        <header className='mb-3'>
            <nav className="navbar navbar-expand-md navbar-light bg-light border px-3 d-flex justify-content-between text-center">
                <Link to={"/"} className=' text-decoration-none'>
                    <h1 className="navbar-brand">Movie List</h1>
                </Link>
            </nav>
        </header>
        <div style={{minHeight:"70vh"}}
            className=' d-flex px-3 gap-3'
        >
            <div
                style={{
                    height: '500px',
                    width : "400px",
                    backgroundColor:"grey"
                }}
                className='overflow-hidden flex-shrink-0'
            >
                {
                    data?.imageUrlOriginal &&
                    <img src={data.imageUrlOriginal} alt="" 
                        className='h-100 w-100 object-fit-cover'
                    />
                }
            </div>
            <div>
                <div className='d-flex align-items-end gap-1'>
                    <h1 className='text-capitalize mb-0'>{data?.name}</h1>
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
                                creditCard: ""
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
                className='d-flex gap-3 flex-wrap'
            >
                {
                    castData &&
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
                    ))
                }
            </div>
        </div>
        <div>
            {/* recommended for you */}
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top px-3">
            <div className="col-md-4 d-flex align-items-center">
            <span className="mb-3 mb-md-0 text-muted">Assignment Project by Aadarsh</span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex mx-3">
                <li className="ms-3">
                    <a className="text-muted" href="#">
                        <FaGithub/>
                    </a>
                </li>
            </ul>
        </footer>

        <dialog 
            ref={dialogRef}
        >
            {
                formData &&
                <form >
                    <h1>Book Tickets Now</h1>
                    <h5>Movie Info</h5>
                    <hr />
                    <div>
                        <span>Movie Name</span>
                        <input type="text" 
                            value={formData.movieName}
                            disabled={true}
                        />
                    </div>
                    <div>
                        <span>Language</span>
                        <input type="text" 
                            value={formData.language}
                            disabled={true}
                        />
                    </div>
                    <h5>Customer Info</h5>
                    <hr />
                    <div>
                        <span>Name</span>
                        <input type="text" 
                            value={formData.name}
                            onChange={(e)=>setFormData(prev=>{return {...prev,name:e.target.value}})}
                            placeholder='Enter Your Name'
                        />
                    </div>
                    <div>
                        <span>Age</span>
                        <input type="text" 
                            value={formData.age}
                            onChange={(e)=>setFormData(prev=>{return {...prev,age:e.target.value}})}
                            placeholder='Enter Your Age'
                        />
                    </div>
                </form>
            }
        </dialog>
    </div>
  )
}

export default MoviePage