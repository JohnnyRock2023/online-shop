import React, {useEffect} from 'react';
import Class from './Users.module.css'
import SearchUsers from "./SearchUsers/SearchUsers";
import CustomButton from "../../../../../Components/CustomButton/CustomButton";
import UserService from "../../../../../../API/UserService";
import LabelInput from "../../LabelInput/LabelInput";
import Message from "../../../../../Modals/Message/Message";
import LabelSelect from "../../LabelSelect/LabelSelect";
import ChooseImage from "../../ChooseImage/ChooseImage";

const Users = () => {

    const options = ['user', 'admin', 'super']
    const [user, setUser] = React.useState("");
    const token = localStorage.getItem('token');

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");

    const [message, setMessage] = React.useState("");
    const [messageVisible, setMessageVisible] = React.useState(false);

    const [role, setRole] = React.useState("user");
    const [image, setImage] = React.useState("default-profile.jpg");


    useEffect(()=>{
        if (user) {
            setImage(user.image);
            setUsername(user.name);
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

        const success = await UserService.addUser(token, formData);
        if (success) {
            setMessage("The new user has been added successfully!");
        }
        else {
            setMessage("Something went wrong!");
        }
        setMessageVisible(true)
    }

    const updateUser = async () => {

        const success = await UserService.updateUser(token, [role, user.id])
        if (success) {
            setMessage("The user data has been updated successfully!");
        }
        else {
            setMessage("Something went wrong!");
        }
        setMessageVisible(true)
    }

    const deleteUser = async () => {
        const success = await UserService.deleteUser(token, user.id);
        if (success) {
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
        setImage('default-profile.jpg')
    }

    return (
        <div className={Class.roles}>
            <Message message={message} visible={messageVisible} setVisible={setMessageVisible} />
            <SearchUsers user={user} setUser={setUser} />
            <div className={Class.content}>
                <div className={Class.userData}>
                    <ChooseImage setImage={setImage} defaultImage={image} className={Class.chooseImage}></ChooseImage>
                    <LabelInput label="Username" value={username} onChange={e => setUsername(e.target.value)}></LabelInput>
                    <LabelInput label="Email" value={email} onChange={e => setEmail(e.target.value)}></LabelInput>
                    <LabelSelect label="Role" value={role} onChange={e => {setRole(e.target.value)}}>
                        {options.map((option, index) => <option key={index} value={option}>{option}</option>)})
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