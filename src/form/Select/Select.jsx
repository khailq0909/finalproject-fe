import React, { memo } from 'react'

function Select({ label,options, value, setValue,type, reset }) {


  return (
    <div className="d-flex flex-column mb-3 justify-content-between w-100">
      <label htmlFor="address-seleect" className='text-black fw-bolder mb-2'>{label}</label>
      <select value={reset ? '': value} onChange={(e) => setValue(e.target.value)} id="address-seleect" className='p-2 rounded-2 border-black'>
        <option value="">{`--Select ${label}--`}</option>
        {
          options?.map((item,index) => {
            return(
              <option
              key={type === "province" ?  item?.province_id : type === "district" ? item?.district_id : type==="ward" ? item?.ward_id : type === "roomtype" ? index : ''} 
              value={type === "province" ?  item?.province_id : type === "district" ? item?.district_id : type==="ward" ? item?.ward_id : type === "roomtype" ? index : ''}>
                {type === "province" ?  item?.province_name : type === "district" ? item?.district_name : type==="ward" ? item?.ward_name : type === "roomtype" ? item : ''}
              </option>
            )
          })
        }
      </select>
    </div>
  )
}

export default memo(Select)