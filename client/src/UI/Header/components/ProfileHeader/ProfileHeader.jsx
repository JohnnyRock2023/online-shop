import React, {useContext, useEffect, useState} from 'react';
import Class from './ProfileHeader.module.css'
import {useNavigate} from "react-router-dom";
import Uploads from "../../../../API/Uploads";
import UserContext from "../../../../Context/UserContext";

import defaultProfile from '..//..//..//../DefaultImages/default-profile.jpg'

const ProfileHeader = () => {
    const {user, setUser} = useContext(UserContext);
    const [profileImg, setProfileImg] = useState('')

    useEffect(() => {
        if (user?.image) {
            setProfileImg(user.image)
        }
    }, [user])

    const navigate = useNavigate();

    return (
        <img className={Class.profileHeader} src={profileImg ? Uploads.getImageLink(profileImg): defaultProfile} alt={profileImg} onClick={()=> user? navigate('/profile') : navigate('/auth/login')}></img>
    );
};

export default ProfileHeader;