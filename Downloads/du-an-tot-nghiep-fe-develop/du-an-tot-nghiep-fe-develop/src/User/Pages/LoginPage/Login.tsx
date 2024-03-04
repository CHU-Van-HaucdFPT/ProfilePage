import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { login } from './UserAction'
import { Link } from 'react-router-dom'
import '../../../assets/css/Login.css';

function makeRandomKey(length: any) {
    let result = '';
    const characters = '0123456789';
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * length));
        counter += 1;
    }
    return result;
}
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const KEY = String(makeRandomKey(4));
    const textLengthNotZero = (input: string) => {
        return (input ?? '').trim().length >= 1;
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!textLengthNotZero(username)) {
            notification.error({ message: 'Username không được để trống!' });
        } else if (!textLengthNotZero(password)) {
            notification.error({ message: 'Password không được để trống!' });
        } else {
            localStorage.setItem('JWT_KEY', KEY)
            login(username, password, KEY)
            // console.log(login);
            
        }
    };
    return (
        <div className="login-page">
            <h2> ĐĂNG NHẬP </h2>
            <form onSubmit={handleSubmit} className="form-login">
                <input
                    id="username"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={(event) =>
                        setUsername(event.target.value)
                    }
                    required></input>
                <input
                    id="firstName"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    name='password'
                    placeholder="Password"
                    type="password"
                    required
                ></input>

                <button className='btn btn-danger' type="submit">Đăng Nhập</button>
                <h2></h2> : <></>
                <Link to="/signup">Tạo tài khoản?</Link>
            </form>
        </div >
    );
}
export default Login;