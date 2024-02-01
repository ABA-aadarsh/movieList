import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from "./Card.module.css"
function Card({data}) {
    const {id,rating,imageUrl,name}=data
    const navigate=useNavigate()
  return (
    <div className={"card flex-shrink-0 rounded overflow-hidden "+style.cardContainer} >
        <div style={{width:"210px", height:"295px", background:"grey", position:"relative"}}
            className={style.imageContainer}
        >
            {
                imageUrl &&
                <img src={imageUrl} className="card-img-top" alt=''
                    style={{
                        position:"relative",
                        zIndex:2
                    }}
                />
            }
            <p className="card-text px-1 "
                style={{
                    position:"absolute",
                    bottom:"0px",
                    right:"0px",
                    background:"yellow",
                    borderRadius:"2px 0px 0px 0px",
                    letterSpacing:"1px"
                }}
            >{rating || "No Rating"}</p>
        </div>
        <div className="card-body d-flex flex-column justify-between" style={{width:"210px"}}>
            <h5 className="card-title wrap flex-grow-1">{name}</h5>
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

