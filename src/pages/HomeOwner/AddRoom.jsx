import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as Toast from "../../common/Toast/Toast";
import * as Loading from "../../common/Loader/Loader";
import Address from '../../components/Address/Address';
import Select from '../../form/Select/Select';
import { roomFacilities, roomTypes } from "../../config/room-options-config";


function AddRoom() {
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef(null);
    const [credentials, setCredentials] = useState({
        name:'',
        adultCount: 1,
        childCount: 0,
        pricePerNight:0,
        description: ''
    });
    const [facilities, setFacilities] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [errors, setErrors] = useState({});
    const [rommType, setRommType] = useState();
    const [type, setType] = useState('');
    const [payload, setPayload] = useState({
        address: '',
        city: '',
        imageUrls: '',
        fileName: '',
    });
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
    useEffect(() => {
        console.log("Payload updated:", payload);
    }, [payload]);
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setErrors({...errors, [e.target.id]: "" });
    };
    const handleChangeFacilities = (e) => {
        // let facilities = []
        const fac = e.target.value;
        // facilities.push(fac)
        setFacilities([...facilities, fac])
        setErrors({...errors, [e.target.id]: "" });

    }
    const onFilesChange = async (e) => {
        setIsLoading(true);
        let images = [];
        let filePaths = [];
        const files = e.target.files;
        for (let i of files) {
            const formData = new FormData();
            formData.append('file', i);
            formData.append("upload_preset", "ml_default");
            try {
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/denvpjdpw/image/upload",
                    formData
                );
                if (uploadRes.status === 200) {
                    images.push(uploadRes.data?.secure_url);
                    filePaths.push(uploadRes.data?.public_id);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
        setIsLoading(false);
        setImagePreview(prev => [...prev, ...images,]);
        // setPayload(prev => ({...prev, imageUrls: [...payload.imageUrls, ...images], fileName : [...payload.fileName,...filePaths] }));
        setPayload(prev => {
            const newImageUrls = Array.isArray(prev.imageUrls) ? prev.imageUrls : [];
            const newFileNames = Array.isArray(prev.fileName) ? prev.fileName : [];
            return {
                ...prev,
                imageUrls: [...newImageUrls, ...images], fileName: [...newFileNames, ...filePaths]
            };
        });
    }
    function handleDeleteImage(image) {
        setImagePreview(prev => prev?.filter(item => item !== image));
        setPayload(prev => ({ ...prev, imageUrls: prev?.imageUrls.filter(item => item !== image) }))
    }
    const handleNewRoom = async (e) => {
        e.preventDefault();
        const validationError = {};
        const regexSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        if (!credentials.name.trim()) {
            validationError.name = "Room Name is required, please enter"
        } else if (regexSpecial.test(credentials.name)) {
            validationError.name = "Room name is not valid dont use special characters in your room name !!!"
        }
        if (credentials.adultCount < 1) {
            validationError.adultCount = "Adult count is required, please enter"
        }else if (credentials.adultCount < 1 || credentials.adultCount >= 10) {
            validationError.adultCount = "Adult count must be more than 1 and maximum 10 persons"
        } 
        if (credentials.childCount == null) {
            validationError.childCount = "Child count is required, please enter"
        }else if (credentials.childCount == null || credentials.childCount >= 10) {
            validationError.childCount = "Child count must be more than 1 and maximum 10 persons"
        }
        if (credentials.pricePerNight < 1) {
            validationError.pricePerNight = "Price is required, please enter"
        }
        if (!credentials.description.trim()) {
            validationError.description = "Description is required, please enter"
        }
        if (!type.trim()) {
            validationError.type = "Type is required, please select"
        }
        if(!payload.address.trim()){
            validationError.address = "Address is required, please select your address room"
        }
        if(imagePreview.length<1){
            validationError.imageUrls = "Image is required, please select your image"
        }
        if(facilities.length<1){
            validationError.facilities = "Facilities is required, please select your facilities"
        }
        setErrors(validationError);
        if (Object.keys(validationError).length === 0) {
            try {
                const newRoom = {
                    type: type,
                    facilities: facilities,
                    ...credentials,
                    ...payload,
                };
                await axios.post("/rooms", newRoom);
                Toast.toastSuccess("Add room successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 4000)
            } catch (err) {
                Toast.toastError("Something went wrong");
                console.log(err);
            }
        }
    }
    return (
        <div className="container">
            <div className="add_header d-flex justify-content-center mt-4 mb-3">
                <h2>Create new room for sale</h2>
            </div>
            <div className="line"></div>
            <div className="row mt-5 ">
                <div className="col-7 me-auto">
                    <div className="container">
                        <div className="mb-3">
                            <label for="name" className="form-label text-black fw-bolder">
                                Room Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter Room Name"
                                onChange={handleChange}
                            />
                            {errors && <span className="text-danger">{errors.name}</span>}

                        </div>
                        <div className="mb-3">
                            <Select type="roomtype" options={roomTypes} setValue={setRommType} label="Room Type" />
                            {errors && <span className="text-danger">{errors.type}</span>}
                        </div>
                        <Address setPayload={setPayload} payload={payload} />
                    {errors && <span className="text-danger">{errors.address}</span>}


                        <div class="input-group  d-flex flex-nowrap justify-content-between">
                            <div className="mb-3 me-2 w-50">
                                <label for="adultCount" className="form-label text-black fw-bolder">
                                    Adult Count
                                </label>
                                <input
                                    name="adultCount"
                                    type="number"
                                    className="form-control"
                                    id="adultCount"
                                    min={0}
                                    max={10}
                                    placeholder="Enter Adults Count"
                                    onChange={handleChange}
                                />
                            {errors && <span className="text-danger">{errors.adultCount}</span>}

                            </div>
                            <div className="mb-3 ms-2 w-50">
                                <label for="childCount" className="form-label text-black fw-bolder">
                                    Child Count
                                </label>
                                <input
                                    name="childCount"
                                    min={0}
                                    max={10}
                                    type="number"
                                    className="form-control"
                                    id="childCount"
                                    placeholder="Enter Child Counts"
                                    onChange={handleChange}
                                />
                            {errors && <span className="text-danger">{errors.childCount}</span>}

                            </div>
                        </div>
                        <div className="mb-3">
                            <label for="pricePerNight" className="form-label text-black fw-bolder">
                                Price Per Night
                            </label>
                            <input
                                name="pricePerNight"
                                type="number"
                                inputmode="decimal"
                                className="form-control"
                                id="pricePerNight"
                                min={0}
                                max={9999}
                                placeholder="Enter Price Per Night"
                                onChange={handleChange}
                            />
                            {errors && <span className="text-danger">{errors.pricePerNight}</span>}

                        </div>
                        <div className="mb-3">
                            <label for="facilities" className="form-label text-black fw-bolder">
                                Facilities
                            </label>
                            <div>
                                <div className="row">
                                    {roomFacilities.map((facility) => (
                                        <label className="d-flex fs-5 text-gray-700 col-4">
                                            <input
                                                type="checkbox"
                                                value={facility}
                                                id="facilities"
                                                onChange={handleChangeFacilities}
                                            />
                                            <span className='ms-2'>
                                                {facility}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {errors && <span className="text-danger">{errors.facilities}</span>}

                        </div>
                        <div className="mb-3">
                            <label for="description" className="form-label text-black fw-bolder">
                                Description
                            </label>
                            <textarea
                                name="description"
                                type="text"
                                className="form-control pt-1"
                                id="description"
                                placeholder="Enter description"
                                rows="15"
                                onChange={handleChange}
                            />
                            {errors && <span className="text-danger">{errors.description}</span>}

                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary mt-2 mb-5 w-100"
                            data-bs-dismiss="modal"
                            onClick={handleNewRoom}
                        >
                            Create Room
                        </button>
                    </div>
                </div>
                <div className="col-5  position-relative">
                    <div className="cards position-fixed">
                        <div className="top">
                            <p>Drag & drop images uploading</p>
                        </div>
                        <div className="drag-area" onClick={() => fileInputRef.current.click()}>
                            {
                                isLoading ? Loading.LoadingUpload(50, 50, "#000") :
                                    <span >Drop & drag here</span>
                            }
                            <input id="imageUrls" type="file" name='imageUrls' className='file'
                                accept='image/*' multiple onChange={onFilesChange} ref={fileInputRef} />
                        </div>
                        <div className="containers">
                            {
                                imagePreview?.map((item, index) => {
                                    return (
                                        <div className="div" key={index}>
                                            <div className="image" >
                                                <span className="delete" onClick={() => handleDeleteImage(item)}>&times;</span>
                                                <img src={item} alt={""} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    {errors && <span className="text-danger">{errors.imageUrls}</span>}

                    </div>
                    <div className="image_preview">

                    </div>
                </div>
            </div>


        </div>

    )
}

export default AddRoom