import React from 'react'

function Pagination({page,total,limit,setPage}) {
    const totalPages = Math.ceil(total/limit)
    const onClick = (newPage) =>{
        setPage(newPage + 1)
    }
  return (
    <div className='mt-0 mb-0 ms-2 me-2 d-flex justify-content-center align-items-center z-1'>
        {
            totalPages > 0 && [...Array(totalPages)].map((val,index)=>(
                <button key={index} className={
                    page === index +1 ?`page_btn active`:`page_btn`
                }
                onClick={()=>onClick(index)}
                >{index+1}</button>
            ))
        }
    </div>
  )
}

export default Pagination