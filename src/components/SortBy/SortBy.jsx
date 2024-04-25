import React from 'react'
import {
    faArrowsUpDown
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function SortBy({sort,setSort}) {
    const onSelectChange=(input)=>{
        setSort({sort:input.target.value, order:sort.order})
    }
    const onArrowChange = ()=>{
        if(sort.order === "asc"){
            setSort({sort:sort.sort, order:"desc"})
        }else{
            setSort({sort:sort.sort, order:"asc"})
        }
    }
  return (
    <div className='d-flex justify-content-end align-content-center mb-2'>
        <select className='me-1 rounded-2' defaultValue={sort.sort} onChange={onSelectChange}>
            <option value="rating">Rating</option>
            <option value="numComments">Feedback</option>
            <option value="pricePerNight">Price</option>

        </select>
        <div className='btn btn-danger' onClick={onArrowChange}><FontAwesomeIcon icon={faArrowsUpDown}/></div>
    </div>
  )
}

export default SortBy