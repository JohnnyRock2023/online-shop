import {useContext, useState} from 'react';
import Class from './Profile.module.css'
import CustomButton from "../../GeneralComponents/CustomButton/CustomButton";
import UserContext from "../../../Context/UserContext";
import {useNavigate} from "react-router-dom";
import Sidebar from "../../GeneralComponents/Sidebar/Sidebar";
import Account from "./Account/Account";

const Profile = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('Account');

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/auth/login");
    }

    return (
        <div className={Class.bodyProfile}>
            <Sidebar options={["Account", "Orders", "History"]} option={selectedOption} setOption={setSelectedOption}>
                <CustomButton onClick={logout} className={Class.LogoutBtn}>LOG OUT</CustomButton>
            </Sidebar>
            <div className={Class.contentProfile}>
                { selectedOption &&
                    {
                        'Account': <Account></Account>,
                        'Orders': <></>,
                        'History': <></>
                    }[selectedOption]
                }
            </div>
        </div>
    );
};

export default Profile;