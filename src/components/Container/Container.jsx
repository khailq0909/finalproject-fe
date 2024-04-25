import React from 'react';
import './style.css';
import { useState, useContext, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import useFetch from '../../hooks/useFetch';
import SearchItem from '../SearchItem/SearchItem';
import { SearchContext } from "../../context/SearchContext";
import { enUS } from 'date-fns/locale'; // import locale file
import axios from 'axios';
import slide1 from '../../assets/images/slide1.jpg'
import Select from '../../form/Select/Select';
import Pagination from '../Pagination/Pagination';
import {
  faCalendarDays,
  faPerson,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { roomTypes, roomFacilities } from '../../config/room-options-config';
import SortBy from '../SortBy/SortBy';

function Container() {


  const location = useLocation();
  const [date, setDate] = useState(location.state?.dates);
  const [dates, setDates] = useState();
  const [city, setCity] = useState(location.state?.city);
  const [citys, setCitys] = useState();
  const [options, setOptions] = useState(location.state?.options);
  const [inputValue, setInputValue] = useState(location.state?.city);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const [openSugestion, setOpenSugestion] = useState(false);
  const [option, setOption] = useState({
    adultCount: options.adultCount,
    childCount: options.childCount,
    room: 1,
  });
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [openOptions, setOpenOptions] = useState(false);
  const [rommType, setRommType] = useState();
  const [type, setType] = useState('');
  const [roomFac, setRoomFac] = useState([]);
  const [page, setPage] = useState(1);
  const [sort,setSort]=useState({sort:"rating",order:"desc"})
  const [reset, setReset] = useState(false);
  const [province, setProvince] = useState();
  let state = []
  const { data, loading, reFetch } = useFetch(`/rooms?&city=${city || ""}&min=${min || 0}&max=${max || 999}&adultCount=${options?.adultCount}&childCount=${options?.childCount}&startDate=${date[0]?.startDate}&endDate=${date[0]?.endDate}&fac=${roomFac}&type=${type}&sort=${sort.sort},${sort.order}`)
  const handleSetMin = (e) => {
    setInputValue1(e.target.value)
    setTimeout(() => {
      setMin(e.target.value)
    }, 2000)
  }
  const handleSetMax = (e) => {
    setInputValue2(e.target.value)
    setTimeout(() => {
      setMax(e.target.value)
    }, 2000)
  }
  useEffect(()=>{
    axios.get(`/rooms/getProvince`).then(data => setProvince(data.data))
  },[])
  useEffect(() => {
    const getRoomType = () => {
      for (var i = 0; i < roomTypes.length; i++) {
        if (roomTypes.indexOf(roomTypes[i]) === +rommType) {
          setType(roomTypes[i])
        }
      }
    }
    getRoomType()
  }, [rommType])
  const handelChooseCity = (e) => {
    setCitys(e.target.value)
    setInputValue(e.target.value)
    setOpenSugestion(false)
  }

  const handleResetFilter = () => {
    setMin(undefined);
    setMax(undefined);
    setInputValue1("min");
    setInputValue2("max");
    setRoomFac([])
    setType('')
    setReset(!reset)
  }

  const handleOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? option[name] + 1 : option[name] - 1,
      };
    });
  };
  const handleChangeFac = (input) => {
    if (input.target.checked) {
      state = [...roomFac, input.target.value];
      setRoomFac(state)
    } else {
      state = roomFac.filter(item => item !== input.target.value)
      setRoomFac(state)
    }
  }
  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    setCity(citys ? citys : location.state.cityOrName);
    setOptions(option ? option : location.state.options)
    dispatch({ type: "NEW_SEARCH", payload: { city: citys, dates: dates, options: options } });
    setDate(dates ? dates : location.state.dates)
    reFetch();
  }

  return (
    <div className="" id="container">
      <img src={slide1} alt="hero_image" className='hero_image w-100 h-500 mb-3' loading='eager' />
      <div className="bg-white border border-1 border-black p-2 rounded-1 mb-3 d-flex justify-content-between w-100 container h-100">
        <div className="input-group d-lfex justify-content-center align-items-center border-1 border border-dark-subtle p-2 me-2 rounded-1">
          <FontAwesomeIcon icon={faLocationDot} className="headerIcon me-2" />
          <input
            type="text"
            value={inputValue}
            className="headerSearchInput w-75"
            readOnly
            role="button"
            onClick={() => setOpenSugestion(!openSugestion)}
          />
          {
            openSugestion &&
            <div className="position-absolute top-100 z-1 start-0 bg-light ps-2 pe-2 pt-2 pb-3 rounded-3 suggestion">
              <span className="text-black fw-bolder">Choose your city</span>
              <ul className="p-0 m-0 mt-2">
                {province && province.map((city, i) => {
                  return (
                    <li className="border border-end-0 border-top-0 border-start-0 pb-1" key={i}>
                      <input type="radio" value={city} onClick={handelChooseCity} checked={inputValue === city} />
                      <label className="ms-2 text-black">{city}</label>
                    </li>
                  )
                })}
              </ul>
            </div>
          }
        </div>
        <div className="input-group d-lfex justify-content-center align-items-center border-1 border border-dark-subtle p-2 rounded-1 me-2">
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon me-2" role="button" />
          <span
            onClick={() => setOpenDate(!openDate)}
            className="text-black"
            role="button"
          >
            {`${format(dates ? dates[0]?.startDate : date[0]?.startDate, "dd/MM/yyyy")} to ${format(dates ? dates[0]?.endDate : date[0]?.endDate, "dd/MM/yyyy")}`}
          </span>
          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDates([item?.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates ? dates : date}
              className="date"
              minDate={new Date()}
              locale={enUS}
            />
          )}
        </div>
        <div className="input-group d-lfex justify-content-center align-items-center border-1 border border-dark-subtle p-2 me-2 rounded-1">
          <FontAwesomeIcon icon={faPerson} className="headerIcon me-4" role="button" />
          <span
            onClick={() => setOpenOptions(!openOptions)}
            role="button"
            className="text-black"
          >{`${option ? option?.adultCount : options?.adultCount} adult · ${option ? option?.childCount : options?.childCount} children`}</span>
          {openOptions && (
            <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button
                    disabled={option?.adultCount <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("adultCount", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {option ? option?.adultCount : options?.adultCount}
                  </span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("adultCount", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button
                    disabled={option?.childCount <= 0}
                    className="optionCounterButton"
                    onClick={() => handleOption("childCount", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {option ? option?.childCount : options?.childCount}
                  </span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("childCount", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <button className="btn btn-primary p-2 ps-4 pe-4" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="filter col col-4 pe-2">
            <div className="reset-fitler">
              <div onClick={handleResetFilter} className="btn btn-outline-danger w-100 p-2 mb-3">
                Reset Filter
              </div>
            </div>
            <div className="filter_price w-100 border border-black">
              <p className='text-black fw-bold'>Price <span>Range</span></p>
              <div className="range-price d-flex justify-content-between w-100">
                <input type='number' value={inputValue1} placeholder='min' className='pt-2 pb-2' onChange={handleSetMin} />
                <span className='text-black p-2'>to</span>
                <input type='number' value={inputValue2} placeholder='max' className='pt-2 pb-2 pe-2' onChange={handleSetMax} />
              </div>
            </div>

            <div className="filter_roomtype w-100 mt-3">
              <Select reset={reset} type="roomtype" options={roomTypes} setValue={setRommType} label="Room Type" />
            </div>
            <div className="filter_facility w-100 border-1 p-2 border border-black rounded-3 mt-3">
              <span className='text-black fw-bold'>Facilities</span>
              {
                roomFacilities?.map((fac, i) => {
                  return (
                    <div className=''>
                      <input key={i} type='checkbox' value={fac} onChange={handleChangeFac} />
                      <label className='ms-1 text-black mb-1 mt-1'>{fac}</label>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="content col col-8">
            <SortBy sort={sort} setSort={(sort)=>setSort(sort)}/>
            {loading ? ("loading") : data?.rooms?.length > 0 ? data?.rooms?.map((room) => {
              return (
                <SearchItem room={room} key={room._id} />
              )
            }) :
              <div>
                <h1>Hotel Not Available
                  Sorry, no hotel matches your preference. Please change your search.</h1>
              </div>
            }
              {/* <Pagination page={page} limit={data?.limit?data?.limit:0} total={data?.total?data?.total:0} setPage={(page)=> setPage(page)}/> */}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Container