import React, {useEffect, useState} from 'react';
import Class from './ProfileHeader.module.css'
import {useNavigate} from "react-router-dom";
import Uploads from "../../../../API/Uploads";

const ProfileHeader = () => {
    const [image, setImage] = useState('default-profile.jpg')

    useEffect(() => {
        const img = localStorage.getItem("profileImage");
        if (img) {
            setImage(img)
        }
    }, [])

    const navigate = useNavigate();

    return (
        <img className={Class.profileHeader} src={Uploads.getImageLink(image)} alt={image} onClick={()=>navigate('/profile')}></img>
    );
};

export default ProfileHeader;