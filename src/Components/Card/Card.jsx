import React from 'react'

function Card({data}) {
    const {rating,imageUrl,name}=data
  return (
    <div>
        {
            imageUrl &&
            <img src={imageUrl} alt="" />
        }
        <h1>{name}</h1>
        <span>{rating}</span>
        <button>View</button>
    </div>
  )
}

export default Card