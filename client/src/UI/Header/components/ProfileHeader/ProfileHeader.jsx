import React, {useContext, useEffect, useState} from 'react';
import Class from './ProfileHeader.module.css'
import {useNavigate} from "react-router-dom";
import Uploads from "../../../../API/Uploads";
import UserContext from "../../../../Context/UserContext";

const ProfileHeader = () => {
    const {user, setUser} = useContext(UserContext);
    const [profileImg, setProfileImg] = useState('default-profile.jpg')

    useEffect(() => {
        if (user?.image) {
            setProfileImg(user.image)
        }
    }, [user])

    const navigate = useNavigate();

    return (
        <img className={Class.profileHeader} src={Uploads.getImageLink(profileImg)} alt={profileImg} onClick={()=> user? navigate('/profile') : navigate('/auth/login')}></img>
    );
};

export default ProfileHeader;