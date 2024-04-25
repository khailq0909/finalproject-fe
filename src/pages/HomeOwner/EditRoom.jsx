import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import * as Loading from "../../common/Loader/Loader";
import * as Toast from "../../common/Toast/Toast";
import Select from '../../form/Select/Select';
import { roomFacilities, roomTypes } from "../../config/room-options-config";


function EditRoom({ dataEdit }) {
    const fileInputRef = useRef(null);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const [homeNumber, setHomeNumber] = useState(null);
    const [reset, setReset] = useState(false);
    const [facilities, setFacilities] = useState([])
    const [roomType, setRoomType] = useState([]);
    const [type, setType] = useState(null);
    const [imagePreview, setImagePreview] = useState([]);
    const [credentials, setCredentials] = useState({
    });
    const [payload, setPayload] = useState({
        address: '',
        city: '',
        imageUrls: '',
        fileName: ''
    });
    const handleChangeFacilities =(e)=>{
        const fac = e.target.value;
        if(e.target.checked){
        setFacilities([...facilities, fac])
        }else{
            setFacilities(facilities.filter(item => item !== fac))
        }
    }
    useEffect(()=>{
        let foundType = roomTypes.length > 0 && roomTypes?.find(item => item === dataEdit.type)
        setType(roomTypes.indexOf(foundType))
    },[dataEdit])
    
    useEffect(()=>{
        setFacilities(dataEdit?.facilities)
    },[dataEdit])

    useEffect(()=>{
        const getRoomType = ()=>{
            for(var i=0; i<roomTypes.length; i++){
                if (roomTypes.indexOf(roomTypes[i]) === +type){
                    setRoomType(roomTypes[i])
                }
            }
        }
        getRoomType()
    },[type])
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    useEffect(() => {
        if (dataEdit) {
            let images = dataEdit?.imageUrls
            images && setImagePreview(images)
            images && setPayload({ imageUrls: [...images] })
        }
    }, [dataEdit])
    // =======================================================Province get state================================================================
    useEffect(() => {
        let addressArr = dataEdit?.address?.split(",")
        let foundProvince = provinces.length > 0 && provinces?.find(item => item.province_name === addressArr[addressArr.length - 1]?.trim())
        setProvince(foundProvince ? foundProvince.province_id : '')
    }, [dataEdit]);

    useEffect(() => {
        let addressArr = dataEdit?.address?.split(",")
        let foundDistrict = districts.length > 0 && districts?.find(item => item.district_name === addressArr[addressArr.length - 2]?.trim())
        setDistrict(foundDistrict ? foundDistrict.district_id : '')
    }, [dataEdit, districts]);

    useEffect(() => {
        let addressArr = dataEdit?.address?.split(",")
        let foundWard = wards.length > 0 && wards?.find(item => item.ward_name === addressArr[addressArr.length - 3]?.trim())
        setWard(foundWard ? foundWard.ward_id : '')
    }, [dataEdit, wards])
    useEffect(() => {
        let addressArr = dataEdit?.address?.split(",")
        console.log(addressArr)
        if(addressArr){
            setHomeNumber(addressArr[0])
        }
    }, [dataEdit])

    useEffect(() => {
        // setProvince(null);
        const getPublicProvinces = async () => {
            const res = await axios.get("https://vapi.vnappmob.com/api/province/");
            if (res.status === 200) {
                setProvinces(res?.data.results);
            }
        }
        getPublicProvinces();
    }, [])

    useEffect(() => {
        setDistrict(null)
        const getPublicDistrict = async (provinceId) => {
            const res = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
            if (res.status === 200) {
                setDistricts(res?.data.results);
            }
        }
        province && getPublicDistrict(province);
        !province ? setReset(true) : setReset(false);
        !province && setDistricts([])
    }, [province])

    useEffect(() => {
        setWard(null)
        const getPublicWard = async (districtId) => {
            const res = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
            if (res.status === 200) {
                setWards(res?.data.results);
            }
        }
        district && getPublicWard(district);
        !district ? setReset(true) : setReset(false);
        !district && setWards([])
    }, [district])

    useEffect(() => {
        setPayload({
            ...payload,
            address: `${homeNumber ? `${homeNumber},` : ''} ${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name},` : ''} ${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ''} `,
            city: `${province ? `${provinces?.find(item => item.province_id === province)?.province_name}`.replace("Thành phố ","").replace("Tỉnh ","") : ''}`,
            

        })
    }, [province, district, ward,homeNumber])

    //===============================================enprovince get state =================================================================

    const onFilesChange = async (e) => {
        setIsLoading(true)
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
        setIsLoading(false)
        setImagePreview(prev => [...prev, ...images]);
        setPayload(prev => {
            const newImageUrls = Array.isArray(prev.imageUrls) ? prev.imageUrls : [];
            const newFileNames = Array.isArray(prev.fileName) ? prev.fileName : [];
            return {
                ...prev,
                imageUrls: [...newImageUrls, ...images], fileName: [...newFileNames, ...filePaths]
            };
        });
    }
    function deleteImage(image) {

        setImagePreview(prev => prev?.filter(item => item !== image));
        setPayload(prev => ({ ...prev, imageUrls: prev?.imageUrls.filter(item => item !== image) }))
    }
    const handleNewRoom = async (e) => {
        e.preventDefault();
        try {

            const newRoom = {
                type: roomType,
                facilities: facilities,
                ...credentials,
                ...payload,
            };
            await axios.put(`/rooms/${dataEdit?._id}`, newRoom);
            Toast.toastSuccess("Edit room successfully");
            setTimeout(() => {
                window.location.reload();
            }, 3000)
        } catch (err) {
            Toast.toastError("Something went wrong");
            console.log(err);
        }
    }

    return (
        <div className="modal fade"
            id="createAccount"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Edit Room
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label for="name" className="form-label">
                                Room Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder={dataEdit.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                        <Select  type="roomtype" options={roomTypes} setValue={setType} value={+type} label="Room Type" />
                        </div>
                        {/* <Address setPayload={setPayload} data={dataEdit} /> */}
                        <div className='select-address'>
                            <div className="select-area d-flex justify-content-between">
                                <Select type="province" value={province} setValue={setProvince} options={provinces} label={"City"} />
                                <Select reset={reset} type="district" value={district} setValue={setDistrict} options={districts} label={"District"} />
                                <Select reset={reset} type="ward" value={ward} setValue={setWard} options={wards} label={"Ward"} />
                                {/* <Address setPayload={setPayload} payload={payload}/> */}

                            </div>
                            <div className="detail_address w-100">
                                <span>Detail Address</span>
                                <input type="text" name="homeNumber" id="homNumber" placeholder={homeNumber} className='form-control mb-3' onChange={(e) => setHomeNumber(e.target.value)} />
                            </div>
                            <div className="d-flex">
                                <div className="mb-3 w-75 me-2">
                                    <label for="address" className="form-label">
                                        Address
                                    </label>
                                    <input
                                        name="address"
                                        type="text"
                                        className="form-control"
                                        value={`${homeNumber ? `${homeNumber},` : ''} ${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name},` : ''} ${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ''} `}
                                        placeholder="Enter address"

                                    />
                                </div>
                                <div className="mb-3 w-25">
                                    <label for="city" className="form-label">
                                        City
                                    </label>
                                    <input
                                        name="city"
                                        type="text"
                                        className="form-control"
                                        value={`${province ? `${provinces?.find(item => item.province_id === province)?.province_name}`.replace("Thành phố","").replace("Tỉnh",""): ''}`}
                                        placeholder="Enter city"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="input-group  d-flex flex-nowrap justify-content-between">
                            <div className="mb-3 me-2 w-50">
                                <label for="adultCount" className="form-label">
                                    Adult Count
                                </label>
                                <input
                                    name="adultCount"
                                    type="number"
                                    className="form-control"
                                    id="adultCount"
                                    min={0}
                                    max={10}
                                    placeholder={dataEdit.adultCount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 ms-2 w-50">
                                <label for="childCount" className="form-label">
                                    Child Count
                                </label>
                                <input
                                    name="childCount"
                                    min={0}
                                    max={10}
                                    type="number"
                                    className="form-control"
                                    id="childCount"
                                    placeholder={dataEdit.childCount}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label for="pricePerNight" className="form-label">
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
                                placeholder={dataEdit.pricePerNight}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label for="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                name="description"
                                type="text"
                                className="form-control pt-1"
                                id="description"
                                placeholder={dataEdit.description}
                                rows="15"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label for="facilities" className="form-label">
                                Facilities
                            </label>
                            <div className="row">
                                    {roomFacilities.map((facility) => (
                                        <label className="d-flex fs-5 text-gray-700 col-4">
                                            <input
                                                type="checkbox"
                                                value={facility}
                                                id="facilities"
                                                checked={facilities?.includes(facility)}
                                                onChange={handleChangeFacilities}
                                            />
                                            <span className='ms-2'>
                                                {facility}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                        </div>
                        <div className="cards mb-3 w-100">
                            <div className="top">
                                <p>Drag & drop images uploading</p>
                            </div>
                            <div className="drag-area" onClick={() => fileInputRef.current.click()}>
                                {
                                    isLoading ? Loading.LoadingUpload() :
                                        <span >Drop & drag here</span>
                                }
                                <input id="imageUrls" type="file" name='imageUrls' className='file'
                                    accept='image/*' multiple onChange={onFilesChange} ref={fileInputRef} />
                            </div>
                            <div className="containers">
                                {
                                    imagePreview.map((image, index) => {
                                        return (
                                            <div className="div">
                                                <div className="image" key={index}>
                                                    <span className="delete" onClick={() => deleteImage(image)}>&times;</span>
                                                    <img src={image} alt={""} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>

                        {/* <div className="image_preview">

                        </div> */}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={handleNewRoom}
                        >
                            Update Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditRoom