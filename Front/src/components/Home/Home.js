import React, { useState } from 'react';
import axios from 'axios';
import './home.css';
import checkLoginStatus from '../Auth/auth';

function Home() {
    checkLoginStatus();
    return (
        <div className="home">
            <h1>Home</h1>
        </div>
    );
}

export default Home;