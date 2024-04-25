import React from 'react'
import useFetch from '../../hooks/useFetch'
import './style.css'

function RoomType() {
    const { data } = useFetch(`/rooms/countByType`)
    console.log(data)
    const images = [
        "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
    ];
    return (
        <div className='mt-5 mb-5'>
            <h3 className='text-black fw-bolde mb-3'>Property Type</h3>
            <div className="property d-flex justify-content-between">
            {
                data&&images.map((img,i)=>{
                    return (
                        <div className="card bg-dark text-white fix-img">
                        <img src={img} className="card-img w-100 h-100" alt="..."/>
                            <div className="card-img-overlay">
                                <h5 className="card-title text-black fw-bold fs-4">{data[i]?.type}</h5>
                                <p className="card-text text-black fw-bold fs-6 ">Quantity: {data[i]?.count}</p>
                            </div>
                    </div>
                    )
                })
            }
            </div>      
        </div>
    )
}

export default RoomType