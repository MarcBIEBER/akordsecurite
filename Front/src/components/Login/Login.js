import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8080/user/api/v1/login', {
            email: username,
            password: password
        }).then((response) => {
            document.cookie = "accessTokens=" + response.data.accessTokens;
            window.location.href = "/";
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;