import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({data}) {
    const {id,rating,imageUrl,name}=data
    const navigate=useNavigate()
  return (
    <div className="card flex-shrink-0 rounded overflow-hidden" >
        <div style={{width:"210px", height:"295px", background:"grey"}}>
            {
                imageUrl &&
                <img src={imageUrl} className="card-img-top" alt="..." />
            }
        </div>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{rating || "No Rating"}</p>
            <button className="btn btn-primary"
                onClick={()=>{
                    navigate("/show/"+id)
                }}
            >View</button>
        </div>
    </div>
  )
}

export default Card

