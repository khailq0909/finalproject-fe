import React from 'react'

function Location() {
  return (
    <div id="location" className='p-1 mt-5 mb-5'>
    <div className="rounded-4 mt-3 mb-3 p-3 bg-light w-100">
        <div className="location_header">
            <h3 className='text-black'>Location Info</h3>
        </div>
        <div className="row pe-1">
            <div className="col-4">
                <img className='w-100 h-100' src="https://www.phucanh.vn/media/news/3009_cac-tinh-nang-va-ban-cap-nhat-moi-sap-co-tren-google-maps-4.jpg" alt="" />


            </div>
            <div className="col-8">
                <div className="location_right">
                    <div className="row">
                        <div className="col-6 border-end">
                            <h4 className='text-black'>Nearby Places</h4>
                            <div className="near mb-2">
                                <span>Hai Ba Trung Shrine</span>
                            </div>

                            <div className="near mb-2">
                                <span>Vietnam Soviet Friendship Hospital</span>
                            </div>

                            <div className="near mb-2">
                                <span>Hanoi University of Pharmacy</span>
                            </div>

                            <div className="near mb-2">
                                <span>Hanoi Railway Station</span>
                            </div>

                            <div className="near mb-2">
                                <span>Ha Noi Hospital</span>
                            </div>

                            <div className="near mb-2">
                                <span>Ha Noi Hospital</span>
                            </div>
                        </div>
                        <div className="col-6">
                            <h4 className='text-black'>Popular in Area</h4>
                            <div className="near mb-2">
                                <span>St. Joseph's Cathedral</span>
                            </div>

                            <div className="near mb-2">
                                <span>Ha Noi Hospital</span>
                            </div>

                            <div className="near mb-2">
                                <span>Cinema</span>
                            </div>

                            <div className="near mb-2">
                                <span>Hanoi Railway Station</span>
                            </div>

                            <div className="near mb-2">
                                <span>Ha Noi Street</span>
                            </div>

                            <div className="near mb-2">
                                <span>Theater</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Location