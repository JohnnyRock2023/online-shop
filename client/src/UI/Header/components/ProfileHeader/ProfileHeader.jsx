import React, {useEffect} from 'react';
import Class from './ProfileHeader.module.css'
import UserService from "../../../../API/UserService";
import {useNavigate} from "react-router-dom";

const ProfileHeader = ({id}) => {

    const [image, setImage] = React.useState('default-profile.jpg');
    const navigate = useNavigate();

    useEffect( () => {
        const getImage = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const data = await UserService.getUserData(token)
                setImage(data.image)
            }
        }
        getImage();
        }, [])

    return (
        <img className={Class.profileHeader} src={`http://localhost:5000/uploads/${image}`} alt={image} onClick={()=>navigate('/profile')}></img>
    );
};

export default ProfileHeader;