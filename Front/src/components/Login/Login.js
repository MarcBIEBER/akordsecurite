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
        <div className="login-page">
            <div className="avatar">
                <img src="https://lh3.googleusercontent.com/FwKlxFr19NHYbgv1rK_GcC9BfPYwS7EyYIyIEEcBXJtUQU9mVUnIFMV2Tsg5DRP4ldBqKOQ=s85" alt="logo" />
            </div>
            <div className="login">
                <h2>Me connecter</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
                <p className="forgot-password"><a href="#">Mot de passe oublié ?</a></p>
            </div>
        </div>
    );
}

export default Login;