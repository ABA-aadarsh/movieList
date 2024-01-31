import React, { useEffect, useState } from 'react'
import Searchbar from '../../Components/Searchbar/Searchbar'
import Card from '../../Components/Card/Card'
import { movieList } from '../../apiFunctions'

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
    <div>
        <header>
            <h1>Movie List</h1>
            <Searchbar/>
        </header>
        <div
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
        <footer>
            <p>Made by Aadarsh</p>
        </footer>
    </div>
  )
}

export default Home