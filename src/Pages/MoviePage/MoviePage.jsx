import React, { useEffect, useState } from 'react'
import Searchbar from '../../Components/Searchbar/Searchbar'
import { useParams } from 'react-router-dom'
import { movieData } from '../../apiFunctions'
import { FaGithub } from "react-icons/fa6";
import htmlParser from 'html-react-parser';
function MoviePage() {
    const [data,setData]=useState(null)
    const {showId}=useParams()
    const fillData=async()=>{
        const res = await movieData(showId)
        console.log(res)
        if(res){
            setData(res)
        }
    }
    useEffect(()=>{
        fillData()
    },[showId])
  return (
    <div className='min-vh-100'>
        <header className='mb-3'>
            <nav className="navbar navbar-expand-md navbar-light bg-light border px-3 d-flex justify-content-between text-center">
                <h1 className="navbar-brand ">Movie List</h1>
                <Searchbar/>
            </nav>
        </header>
        <div style={{minHeight:"85vh"}}
            className='px-3 d-flex'
        >
            <div
                
            >
                {
                    data?.imageUrlMedium &&
                    <img src={data.imageUrlMedium} alt="" />
                }
            </div>
            <div>
                <h1>{data?.name}</h1>
                <span>{data?.rating}</span>
                <div>
                    {data?.summary
                        &&
                        htmlParser(data.summary)
                    }
                </div>
                <div>
                    <p>
                        <span>Language</span>
                        <span>{data?.language}</span>
                    </p>
                    <p>
                        <span>Genres</span>
                        {
                            (data && data.genres) &&
                            data?.genres.map(i=>(
                                <span key={i}>{i}</span>
                            ))
                        }
                    </p>
                </div>
            </div>
        </div>
        <div>
            {/* cast */}
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
    </div>
  )
}

export default MoviePage