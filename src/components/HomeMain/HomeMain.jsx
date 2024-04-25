
import './style.css'
import WhyChoose from '../WhyChoose/WhyChoose';
import GuestLove from '../GuestLove/GuestLove';
import RoomType from '../RoomType/RoomType';

function HomeMain() {
  

  return (
    <div className='popularCity w-100 mt-5 rounded-top-5 position-absolute '>
      <div className="container mt-5">
      <WhyChoose/>
      <GuestLove/>
      <RoomType/>
      </div>
    </div>
  )
}

export default HomeMain