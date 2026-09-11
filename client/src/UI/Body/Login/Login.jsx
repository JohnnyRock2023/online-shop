import {useState} from 'react';
import Class from './Login.module.css'
import {Link, useNavigate} from "react-router-dom";
import LoginOther from "./LoginOther/LoginOther";
import CustomButton from "../../GeneralComponents/CustomButton/CustomButton";
import Input from "../../GeneralComponents/FIELDS/Input/Input";

const Login = () => {
    const [email, setEmail] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const navigate = useNavigate();


    const login = async () => {
        try {
            await Login.login(email, password)
            navigate('/')
        }
        catch (error) {
            switch (error.response.data.type) {
                case "Email":
                    setEmailMessage(error.response.data.message);
                    break;
                case "Password":
                    setPasswordMessage(error.response.data.message);
                    break;
                default:
                    break;
            }
        }
    }


    return (
        <div className={Class.bodyLogin}>
            <div className={Class.loginForm}>
                <h1 className={Class.loginForm__header}>Log In</h1>
                <div className={Class.loginInputs}>
                    <Input type='text' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Email' hint={emailMessage}/>
                    <Input type='text' value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Password' hint={passwordMessage}/>
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