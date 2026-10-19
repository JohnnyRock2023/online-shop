import React, {useContext, useState} from 'react';
import Class from "./SignUp.module.css";
import CustomButton from "../../GeneralComponents/CustomButton/CustomButton";
import {Link, useNavigate} from "react-router-dom";
import LoginOther from "../Login/LoginOther/LoginOther";
import Input from "../../GeneralComponents/FIELDS/Input/Input";
import Authorization from "../../../API/Authorization";
import InputHint from "../../GeneralComponents/FIELDS/InputHint/InputHint";
import UserContext from "../../../Context/UserContext";
import {useRequest} from "../../../utils/handleRequest";

const BodySignIn = () => {
    const {handleRequest} = useRequest();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();
    const context = useContext(UserContext)

    const signup = async () => {
        if (password !== passwordConfirm) {
            setPasswordConfirmMessage("Passwords do not match");
            return
        }
        const {data, error} = await handleRequest(async () => await Authorization.signup(name, email, password));
        switch (data) {
            case "Email":
                setEmailMessage(error);
                break;
            case "Account":
                setSignUpError(error);
                break;
            default:
                break;
        }
        if (!error) {
            context.fetchUser()
            navigate("/");
        }
    }

    return (
        <div className={Class.bodySignUp}>
            <div className={Class.signUpForm}>
                <h1 className={Class.signUpForm__header}>Sign Up</h1>
                <div className={Class.signUpInputs}>
                    <Input type='text' placeholder="Username"  value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type='email' placeholder='Email@example.com' value={email} onChange={(e) => setEmail(e.target.value)} hint={emailMessage} />
                    <Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input type='password' placeholder='Repeat password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} hint={passwordConfirmMessage} />
                    <InputHint message={signUpError} />
                    <CustomButton onClick={async () => await signup()} >Sign Up</CustomButton>
                    <Link className={Class.loginLink} to='/auth/login'>I already have an account</Link>
                    <h2 className={Class.signUpFrom__text}>OR</h2>
                    <LoginOther/>
                </div>
            </div>
        </div>
    );
};

export default BodySignIn;