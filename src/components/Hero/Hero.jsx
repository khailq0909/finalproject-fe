import React from 'react'
import slide1 from '../../assets/images/slide1.webp'
import Search from '../Search/Search'
import './style.css'
function Hero() {
    return (
    <div className='hero position-relative h-50'>
        <Search/>
        <img src={slide1} alt="hero_image" className='hero_image h-100' loading='eager' />
        <p className='hero_title'>Find best place for your trip</p>
        <button className='btn btn-lignt border-primary hero_btn'>book now</button>
        
    </div>
    )
}

export default Hero