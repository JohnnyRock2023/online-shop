import {useContext, useState} from 'react';
import Class from './Login.module.css'
import {Link, useNavigate} from "react-router-dom";
import LoginOther from "./LoginOther/LoginOther";
import CustomButton from "../../GeneralComponents/CustomButton/CustomButton";
import Input from "../../GeneralComponents/FIELDS/Input/Input";
import Authorization from "../../../API/Authorization";
import UserContext from "../../../Context/UserContext";
import {useRequest} from "../../../utils/handleRequest";

const Login = () => {
    const [email, setEmail] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const {handleRequest} = useRequest();

    const login = async () => {
        const {data, error} = await handleRequest(async () => await Authorization.login(email, password))
        switch (data) {
            case "Email":
                setEmailMessage(error);
                break;
            case "Password":
                setPasswordMessage(error);
                break;
        }
        if (!error) {
            console.log(context)
            context.fetchUser()
            navigate("/");
        }
    }

    return (
        <div className={Class.bodyLogin}>
            <div className={Class.loginForm}>
                <h1 className={Class.loginForm__header}>Log In</h1>
                <div className={Class.loginInputs}>
                    <Input type='email' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Email@example.com' hint={emailMessage}/>
                    <Input type='password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Password' hint={passwordMessage}/>
                    <CustomButton onClick={async ()=> await login()}>Log In</CustomButton>
                    <Link className={Class.signUpLink} to='/auth/signup'>I don't have an account yet</Link>
                    <h2 className={Class.loginForm__text}>OR</h2>
                    <LoginOther/>
                </div>
            </div>
        </div>
    );
};

export default Login;