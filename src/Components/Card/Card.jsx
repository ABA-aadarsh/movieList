import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from "./Card.module.css"
function Card({data}) {
    const {id,rating,imageUrl,name}=data
    const navigate=useNavigate()
  return (
    <div className={"card flex-shrink-0 rounded overflow-hidden "+style.cardContainer} >
        <div style={{width:"210px", height:"295px", background:"grey"}}>
            {
                imageUrl &&
                <img src={imageUrl} className="card-img-top" alt="..." />
            }
        </div>
        <div className="card-body" style={{width:"210px"}}>
            <h5 className="card-title wrap">{name}</h5>
            <p className="card-text">{rating || "No Rating"}</p>
            <button className="btn btn-primary"
                onClick={()=>{
                    navigate("/show/"+id)
                }}
            >Visit to Book</button>
        </div>
    </div>
  )
}

export default Card

