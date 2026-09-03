import {useEffect, useState} from 'react';
import Class from './Users.module.css'
import CustomButton from "../../../../../Components/CustomButton/CustomButton";
import UserService from "../../../../../../API/UserService";
import LabelInput from "../../LabelInput/LabelInput";
import Message from "../../../../../Modals/Message/Message";
import LabelSelect from "../../LabelSelect/LabelSelect";
import ChooseImage from "../../ChooseImage/ChooseImage";
import Search from "../../../../../Components/Search/Search";
import {handleRequest} from "../../../../../../utils/handleRequest";
import defaultProfile from '..//..//..//..//..//..//DefaultImages/default-profile.jpg'

const Users = () => {

    const options = ['user', 'admin', 'super']
    const [user, setUser] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");
    const [messageVisible, setMessageVisible] = useState(false);

    const [role, setRole] = useState("user");
    const [image, setImage] = useState("");


    useEffect(()=>{
        if (user) {
            setImage(user.image ? user.image : "");
            setUsername(user.name);
            setPassword(user.password);
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user])

    const addUser = async () => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("role", role);

        if (image) {
            formData.append("image", image);
        }

        const success = await UserService.addUser(formData);
        if (success) {
            setMessage("The new user has been added successfully!");
        }
        else {
            setMessage("Something went wrong!");
        }
        setMessageVisible(true)
    }

    const updateUser = async () => {
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("name", username);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("role", role);

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

    const deleteUser = async () => {
        const {data, error} = await UserService.deleteUser(user.id);
        if (!error) {
            setMessage("The user has been deleted successfully!");
            clearFields();
        }
        else {
            setMessage("Something went wrong!");
        }
        setMessageVisible(true)
    }

    const clearFields = () => {
        setUser("")
        setUsername("")
        setPassword("")
        setEmail("")
        setRole('user')
        setImage('')
    }

    return (
        <div className={Class.users}>
            <Message message={message} visible={messageVisible} setVisible={setMessageVisible} />
            <Search fetch={UserService.searchUsers} setItem={setUser} className={Class.search}/>
            <div className={Class.content}>
                <div className={Class.userData}>
                    <ChooseImage setImage={setImage} defaultImage={defaultProfile} className={Class.chooseImage}></ChooseImage>
                    <LabelInput label="Username" value={username} onChange={e => setUsername(e.target.value)}></LabelInput>
                    <LabelInput label="Password" value={password} onChange={e => setPassword(e.target.value)}></LabelInput>
                    <LabelInput label="Email" value={email} onChange={e => setEmail(e.target.value)}></LabelInput>
                    <LabelSelect label="Role" value={role} onChange={e => {setRole(e.target.value);}}>
                        {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
                    </LabelSelect>
                </div>
            </div>

            {user &&
                <div className={Class.buttons}>
                    <CustomButton className={Class.saveBtn} onClick={updateUser}>Save</CustomButton>
                    <CustomButton className={Class.delBtn} onClick={deleteUser}>Delete</CustomButton>
                </div>
            }

            {!user &&
                <div className={Class.buttons}>
                    <CustomButton className={Class.saveBtn} onClick={addUser}>Add user</CustomButton>
                    <CustomButton className={Class.delBtn} onClick={clearFields}>Clear</CustomButton>
                </div>
            }

            {user &&
                <CustomButton className={Class.saveBtn} onClick={clearFields}>Create a new user</CustomButton>
            }
        </div>
    );
};

export default Users;