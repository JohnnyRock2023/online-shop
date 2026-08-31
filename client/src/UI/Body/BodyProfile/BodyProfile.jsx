import React, {useContext} from 'react';
import Class from './BodyProfile.module.css'
import CustomButton from "../../Components/CustomButton/CustomButton";
import UserContext from "../../../Context/UserContext";
import {useNavigate} from "react-router-dom";

const BodyProfile = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/items");
    }

    return (
        <div className={Class.bodyProfile}>
            <CustomButton onClick={logout}>LOG OUT</CustomButton>
        </div>
    );
};

export default BodyProfile;