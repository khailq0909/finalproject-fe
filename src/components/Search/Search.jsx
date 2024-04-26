import {
    faBed,
    faCalendarDays,
    faPerson,
    faLocationDot,
    faHome
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from "react-date-range";
import { format, addDays } from "date-fns";
import { enUS } from 'date-fns/locale'; // import locale file
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch"
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import './style.css'

function Search() {
    const navigate = useNavigate();
    const [openDate, setOpenDate] = useState(false);
    const [openCity, setOpenCity] = useState(false);
    const [inputValue, setInputValue] = useState('search your place ...');
    const [city, setCity] = useState()
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adultCount: 1,
        childCount: 0,
        room: 1,
    });

    const { data } = useFetch('https://finalproject-api.onrender.com/api/rooms/getProvince')
    const handelChooseCity = (e) => {
        setCity(e.target.value)
        setInputValue(e.target.value)
        setOpenCity(false)
    }
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };

    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { city: city, dates: dates, options: options } });
        navigate("/search", { state: { city, dates, options } });
    };
    return (
        <div className='search container position-absolute rounded-1'>
            <div className="d-flex pt-2 pb-2 align-items-center  ">
                <div className="input-group d-lfex justify-content-center align-items-center border-1 border border-dark-subtle p-2 rounded-1 me-2 position-relative">
                    <FontAwesomeIcon icon={faLocationDot} className="headerIcon me-2" />
                    <input
                        type="text"
                        value={inputValue}
                        className="headerSearchInput w-75"
                        readOnly
                        role="button"
                        onClick={() =>setOpenCity(!openCity)}
                    />
                    {
                        openCity&&
                        <div className="position-absolute top-100 z-1 start-0 bg-light ps-2 pe-2 pt-2 pb-3 rounded-3 suggestion">
                        <span className="text-black fw-bolder">Choose your city</span>
                        <ul className="p-0 m-0 mt-2">
                            {data && data.map((city, i) => {
                                return (
                                    <li className="border border-end-0 border-top-0 border-start-0 pb-1" key={i}>
                                        <input type="radio" value={city} onClick={handelChooseCity} checked={inputValue === city}/>
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
                    >{`${format(dates[0]?.startDate, "dd/MM/yyy")} to 
                    ${format(dates[0]?.endDate, "dd/MM/yyy")}`
                        }</span>
                    {openDate && (
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item) => {
                                setDates([item?.selection])
                            }}
                            // onChange={(item)=>handleChangeDate}
                            moveRangeOnFirstSelection={true}
                            ranges={dates}
                            className="date"
                            minDate={new Date()}
                            locale={enUS}
                        // minDate={moment().add(1, 'day').toDate()}
                        />
                    )}
                </div>
                <div className="input-group d-lfex justify-content-center align-items-center border-1 border border-dark-subtle p-2 rounded-1 me-2">
                    <FontAwesomeIcon icon={faPerson} className="headerIcon me-4" role="button" />
                    <span
                        onClick={() => setOpenOptions(!openOptions)}
                        role="button"
                        className="text-black"
                    >{`${options.adultCount} adult · ${options.childCount} children`}</span>
                    {openOptions && (
                        <div className="options">
                            <div className="optionItem">
                                <span className="optionText">Adult</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={options.adultCount <= 1}
                                        className="optionCounterButton"
                                        onClick={() => handleOption("adultCount", "d")}
                                    >
                                        -
                                    </button>
                                    <span className="optionCounterNumber">
                                        {options.adultCount}
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
                                        disabled={options.childCount <= 0}
                                        className="optionCounterButton"
                                        onClick={() => handleOption("childCount", "d")}
                                    >
                                        -
                                    </button>
                                    <span className="optionCounterNumber">
                                        {options.childCount}
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
                <div className="">
                    <button className="btn btn-primary p-2 ps-4 pe-4" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Search