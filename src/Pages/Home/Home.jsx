import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card'
import { movieList } from '../../apiFunctions'
import Footer from '../../Components/Footer/Footer'
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
            <div className="d-block mx-auto mb-4 bg-primary" 
                style={{
                    width:"72px",height:"72px", borderRadius:"50%"
                }}
            ></div>
            <h1 className="display-5 fw-bold text-body-emphasis text-align">Ticket Booker</h1>
            <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Your go to website for movie tickets and query.</p>
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
        <Footer/>
    </div>
  )
}

export default Home