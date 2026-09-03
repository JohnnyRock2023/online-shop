import {useContext, useEffect, useState} from 'react';
import Class from './Account.module.css'
import UserContext from "../../../../Context/UserContext";
import {handleRequest} from "../../../../utils/handleRequest";
import UserService from "../../../../API/UserService";
import Message from "../../../Modals/Message/Message";
import ChooseImage from "../../BodyAdmin/components/ChooseImage/ChooseImage";
import LabelInput from "../../BodyAdmin/components/LabelInput/LabelInput";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import defaultProfile from '..//..//..//..//DefaultImages/default-profile.jpg'


const Account = () => {
    const [image, setImage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [messageVisible, setMessageVisible] = useState(false);
    const {user, setUser} = useContext(UserContext)
    const token = localStorage.getItem("token");

    useEffect(()=>{
        if (user) {
            setImage(user.image);
            setUsername(user.name);
            setPassword(user.password);
            setEmail(user.email);
        }
    }, [user])

    const updateUser = async () => {
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("name", username);
        formData.append("password", password);
        formData.append("email", email);

        if (image) {
            formData.append("image", image);
        }

        const {data, error} = await handleRequest(async () => await UserService.updateUser(formData))
        if (!error) {
            setMessage("The user data has been updated successfully!");
        }
        else {
            setMessage("Something went wrong!");
        }
        setMessageVisible(true)
    }

    return (
        <div className={Class.account}>
            <Message message={message} visible={messageVisible} setVisible={setMessageVisible} />
                <div className={Class.userData}>
                    <ChooseImage setImage={setImage} defaultImage={defaultProfile} className={Class.chooseImage}></ChooseImage>
                    <LabelInput label="Username" value={username} onChange={e => setUsername(e.target.value)}></LabelInput>
                    <LabelInput label="Password" value={password} onChange={e => setPassword(e.target.value)}></LabelInput>
                    <LabelInput label="Email" value={email} onChange={e => setEmail(e.target.value)}></LabelInput>
                </div>
                <div className={Class.buttons}>
                    <CustomButton className={Class.saveBtn} onClick={updateUser}>Save</CustomButton>
                </div>
        </div>
    );
};

export default Account;