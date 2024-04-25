import React from 'react'
import useFetch from '../../hooks/useFetch';

function GuestLove() {
    const { data } = useFetch('/rooms/city/countByCity?city=Hà Nội,Đà Nẵng,Hồ Chí Minh');
  return (
    <div>
              <h3 className='text-black fw-bold mb-4'>Place Guest Love</h3>
        <div className="row">
          <div className="col col-4 pe-2">
            <div class="card mh text-white rounded-2">
              <img src="https://photo-cms-baophapluat.epicdn.me/w840/Uploaded/2024/athlraqhpghat/2023_06_25/ho-hoan-kiem-7185.jpg" class="card-img h-100 rounded-2"alt="..."/>
                <div class="card-img-overlay">
                  <h5 class="card-title fw-bolder fs-3">TP. Hà Nội</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p class="card-text fw-bolder fs-4 mt-5">Quantity: {data[0]} rooms</p>
                </div>
            </div>
          </div>
          <div className="col col-4 pe-1">
          <div class="card mh text-white rounded-2">
              <img src="https://ik.imagekit.io/tvlk/blog/2022/06/dia-diem-tham-quan-da-nang-1.jpg?tr=dpr-2,w-675" class="card-img h-100 rounded-2"alt="..."/>
                <div class="card-img-overlay">
                  <h5 class="card-title fw-bolder fs-3">TP. Đà Nẵng</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p class="card-text fw-bolder fs-4 mt-5">Quantity: {data[1]} rooms</p>
                </div>
            </div>
          </div>
          <div className="col col-4 ps-1">
          <div class="card mh text-white rounded-2">
              <img src="https://www.tripsavvy.com/thmb/-nPVciXf7-kl-XrW096N_9c-_IA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ho-chi-minh-city-at-night-22c7df816ce4493eb0e86cf54fe03309.jpg" class="card-img h-100 rounded-2"alt="..."/>
                <div class="card-img-overlay">
                  <h5 class="card-title fw-bolder fs-3">TP. Hồ Chí Minh</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p class="card-text fw-bolder fs-4 mt-5">Quantity: {data[2]} rooms</p>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default GuestLove