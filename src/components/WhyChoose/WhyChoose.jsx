import React from 'react';
import whychoose1 from '../../assets/images/whychoose1.webp'
import whychoose2 from '../../assets/images/whychose2.webp'
import whychoose3 from '../../assets/images/whychoose3.webp'


function WhyChoose() {
    return (
        <div className='mt-5 mb-5'>
            <h3 className='text-black fw-bold mb-4'>Why book with us?</h3>
            <div className="row">
                <div className="col col-4 pe-2">
                    <div className="card mb-3" >
                        <div className="row g-0 d-flex align-items-center justify-content-center">
                            <div className="col-md-4">
                                <img src={whychoose1} className="img-fluid rounded-start w-50 ms-5" alt="..."/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold fs-5">One place for all your needs</h5>
                                    <p className="card-text fs-6">From flights, stays, to sights, just count on our complete products and Travel Guides.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-4 pe-1">
                <div className="card mb-3" >
                        <div className="row g-0 d-flex align-items-center justify-content-center">
                            <div className="col-md-4">
                                <img src={whychoose2} className="img-fluid rounded-start w-50 ms-5" alt="..."/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold fs-5">One place for all your needs</h5>
                                    <p className="card-text fs-6">From flights, stays, to sights, just count on our complete products and Travel Guides.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-4 ps-1">
                <div className="card mb-3" >
                        <div className="row g-0 d-flex align-items-center justify-content-center">
                            <div className="col-md-4">
                                <img src={whychoose3} className="img-fluid rounded-start w-50 ms-5" alt="..."/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold fs-5">One place for all your needs</h5>
                                    <p className="card-text fs-6">From flights, stays, to sights, just count on our complete products and Travel Guides.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyChoose