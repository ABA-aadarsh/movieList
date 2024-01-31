import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card'
import { movieList } from '../../apiFunctions'
import { FaGithub } from "react-icons/fa6";
function Home() {
    const [list,setList]=useState([])
    const fillList= async ()=>{
        const res=await movieList()
        console.log(res)
        if(res ){
            setList([...res])
        }
    }
    useEffect(()=>{
        fillList()
    },[])
  return (
    <div className='my-0 min-vh-100'>
        <header className='px-4 py-5 mb-5 text-center'>
            <img className="d-block mx-auto mb-4" src="/vite.svg" alt="" width="72" height="57" />
            <h1 className="display-5 fw-bold text-body-emphasis text-align">Movie List</h1>
            <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Your go to website for movie query</p>
            </div>
        </header>
        <div
            className="d-flex flex-wrap justify-content-center gap-3"
        >
            {
                list.map(item=>(
                    <Card
                        key={item.id}
                        data={item}
                    />
                ))
            }
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

export default Home