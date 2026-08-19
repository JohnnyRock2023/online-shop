import React, {useState} from 'react';
import Class from "./BodySignUp.module.css";
import CustomButton from "../../Components/CustomButton/CustomButton";
import {Link, useNavigate} from "react-router-dom";
import LoginOther from "../BodyLogin/LoginOther/LoginOther";
import Input from "../../Components/Input/Input";
import Authorization from "../../../API/Authorization";
import InputHint from "../../Components/InputHint/InputHint";

const BodySignIn = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();

    const signup = async () => {
        if (password !== passwordConfirm) {
            setPasswordConfirmMessage("Passwords do not match");
        }
        try {
            await Authorization.signup(name, email, password);
            navigate('/items')
        }
        catch (error) {
            switch (error.response.data.type) {
                case "Email":
                    setEmailMessage(error.response.data.message);
                    break;
                case "Account":
                    setSignUpError(error.response.data.message);
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <div className={Class.bodySignUp}>
            <div className={Class.signUpForm}>
                <h1 className={Class.signUpForm__header}>Sign Up</h1>
                <div className={Class.signUpInputs}>
                    <Input type='text' placeholder="Username"  value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} hint={emailMessage} />
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